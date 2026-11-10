import { DOMAINS } from '../data/domains';
import { TEST_QUESTIONS } from '../data/questions';
import { TALENTS } from '../data/talents';
import type { Answers, DomainId, Question, QuestionType } from '../data/types';

/**
 * HODNOTIACI ALGORITMUS
 *
 * Deterministický, nezávislý od UI aj od poradia otázok.
 *
 * KROK 1 – surové body (prehľadná evidencia)
 *   Každá možnosť patrí práve jednému talentu. Zvolená možnosť pripíše talentu
 *   body podľa typu otázky (WEIGHTS: voľba zo štyroch je silnejší signál než
 *   voľba z dvoch). Nezvolená možnosť NIČ neodoberá – výber jedného výroku
 *   neznamená, že druhý talent chýba. Podiel bodov z maxima (normalizácia podľa
 *   počtu zodpovedaných príležitostí) sa zobrazuje ako „zvolené v X z Y otázok“.
 *
 * KROK 2 – sila talentu so zohľadnením súperov (určuje poradie)
 *   Samotný súčet bodov má pri nútenej voľbe známu slabinu: talent, ktorý
 *   v otázkach náhodou stál len proti slabým talentom, by predbehol talent,
 *   ktorý opakovane „prehral“ s tými najsilnejšími. Preto sa poradie počíta
 *   modelom párového porovnávania (Bradley–Terry / Plackett–Luce):
 *     - každý talent má silu γ > 0,
 *     - pravdepodobnosť, že v otázke zvíťazí talent i, je γ_i / Σ γ možností,
 *     - sily sa odhadnú iteračne (MM algoritmus, pevný počet krokov, štart γ = 1),
 *     - každý talent má navyše jedno „virtuálne“ porovnanie s priemerným
 *       talentom (pol výhry, pol prehry) – slabá regularizácia, ktorá bráni
 *       extrémom pri malom počte otázok. Nie je to bonus: je pre všetkých rovnaká.
 *   Výsledné skóre = γ / (γ + 1), teda pravdepodobnosť, že talent „vyhrá“ nad
 *   priemerným talentom (0–1; 0,5 = priemer).
 *
 * KROK 3 – poradie
 *   skóre ↓; pri zhode (na 6 desatinných miest): surové body ↓, potom
 *   konzistentnosť (v koľkých typoch otázok sa talent presadil) ↓, napokon
 *   pevné poradie talentov v databáze (čisto technická poistka).
 *   Žiadna náhoda, žiadne umelé body.
 */

export const WEIGHTS: Record<QuestionType, number> = { pair: 1, situation: 2, energy: 2 };

/** Minimálny podiel zodpovedaných otázok, pri ktorom má výsledok zmysel zobraziť. */
export const MIN_COVERAGE = 0.8;

export interface TalentScore {
  talentId: string;
  domain: DomainId;
  points: number;
  maxPoints: number;
  /** Počet zodpovedaných otázok, v ktorých bol talent jednou z možností. */
  opportunities: number;
  /** Koľkokrát bol talent zvolený. */
  chosen: number;
  /** Sila talentu 0–1 so zohľadnením súperov (určuje poradie). 0,5 = priemer. */
  score: number;
  /** Sila v percentách (zaokrúhlené, len na zobrazenie). */
  percent: number;
  /** Podiel získaných surových bodov z maxima (0–1). */
  rawShare: number;
  /** V koľkých z 3 typov otázok bol talent aspoň raz zvolený (konzistentnosť). */
  formats: number;
  /** Počet vyhratých párových porovnaní. */
  pairWins: number;
  rank: number;
}

export interface DomainScore {
  domain: DomainId;
  points: number;
  maxPoints: number;
  /** Priemerná sila talentov domény 0–1. */
  score: number;
  percent: number;
  /** Podiel domény na všetkých získaných bodoch (súčet = 100). */
  share: number;
  /** Počet talentov domény v TOP 5. */
  topCount: number;
}

export const DIFF_STRONG = 0.9;
export const DIFF_MILD = 0.82;

export type Differentiation = 'vyrazny' | 'mierny' | 'vyrovnany';

export interface ScoringResult {
  ranking: TalentScore[];
  top5: TalentScore[];
  /** Talenty na 6.–10. mieste. */
  next5: TalentScore[];
  /** Talenty mimo TOP 5, ktoré majú rovnaké skóre ako piaty talent (rozhodlo doplnkové kritérium). */
  tiedWithFifth: TalentScore[];
  domains: DomainScore[];
  answered: number;
  total: number;
  complete: boolean;
  /** Je zodpovedaných dosť otázok na zmysluplný výsledok? */
  sufficient: boolean;
  differentiation: Differentiation;
}

/** Počet iterácií odhadu síl. Pevný, aby bol výpočet reprodukovateľný. */
export const BT_ITERATIONS = 400;
/** Váha virtuálneho porovnania s priemerným talentom (regularizácia). */
export const BT_PRIOR = 1;

/**
 * Odhad síl talentov (Bradley–Terry / Plackett–Luce, MM algoritmus).
 * `items` = zodpovedané otázky: množina talentov a víťaz.
 */
export function estimateStrengths(talentIds: string[], items: { set: string[]; winner: string }[]): Map<string, number> {
  const n = talentIds.length;
  const idx = new Map(talentIds.map((id, i) => [id, i]));
  const sets = items.map((it) => it.set.map((id) => idx.get(id)!));
  const wins = new Array<number>(n).fill(BT_PRIOR / 2);
  for (const it of items) wins[idx.get(it.winner)!] += 1;

  let gamma = new Array<number>(n).fill(1);
  for (let iter = 0; iter < BT_ITERATIONS; iter++) {
    const denom = gamma.map((g) => BT_PRIOR / (g + 1));
    for (const set of sets) {
      let sum = 0;
      for (const i of set) sum += gamma[i];
      for (const i of set) denom[i] += 1 / sum;
    }
    gamma = wins.map((w, i) => w / denom[i]);
  }
  return new Map(talentIds.map((id, i) => [id, gamma[i]]));
}

export function scoreAnswers(answers: Answers, questions: Question[] = TEST_QUESTIONS): ScoringResult {
  const canonical = new Map(TALENTS.map((t, i) => [t.id, i]));
  const acc = new Map(
    TALENTS.map((t) => [
      t.id,
      {
        points: 0,
        maxPoints: 0,
        opportunities: 0,
        chosen: 0,
        pairWins: 0,
        formats: new Set<QuestionType>(),
      },
    ]),
  );

  let answered = 0;
  const items: { set: string[]; winner: string }[] = [];
  // Otázky spracúvame v abecednom poradí id – výsledok tak nezávisí od poradia v teste.
  for (const q of [...questions].sort((a, b) => a.id.localeCompare(b.id))) {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    if (!chosen) continue; // nezodpovedaná alebo neplatná odpoveď sa nezapočítava
    answered++;
    const w = WEIGHTS[q.type];
    for (const o of q.options) {
      const a = acc.get(o.talent);
      if (!a) continue;
      a.opportunities++;
      a.maxPoints += w;
    }
    const a = acc.get(chosen.talent);
    if (a) {
      a.points += w;
      a.chosen++;
      a.formats.add(q.type);
      if (q.type === 'pair') a.pairWins++;
      items.push({ set: q.options.map((o) => o.talent), winner: chosen.talent });
    }
  }

  const gamma = estimateStrengths(
    TALENTS.map((t) => t.id),
    items,
  );
  const round6 = (x: number) => Math.round(x * 1e6) / 1e6;

  const ranking: TalentScore[] = TALENTS.map((t) => {
    const a = acc.get(t.id)!;
    const g = gamma.get(t.id)!;
    const score = round6(g / (g + 1));
    return {
      talentId: t.id,
      domain: t.domain,
      points: a.points,
      maxPoints: a.maxPoints,
      opportunities: a.opportunities,
      chosen: a.chosen,
      score,
      percent: Math.round(score * 100),
      rawShare: a.maxPoints > 0 ? a.points / a.maxPoints : 0,
      formats: a.formats.size,
      pairWins: a.pairWins,
      rank: 0,
    };
  });

  const sameScore = (x: TalentScore, y: TalentScore) => x.score === y.score;

  ranking.sort(
    (x, y) =>
      y.score - x.score ||
      y.rawShare - x.rawShare ||
      y.formats - x.formats ||
      canonical.get(x.talentId)! - canonical.get(y.talentId)!,
  );
  ranking.forEach((r, i) => (r.rank = i + 1));

  const top5 = ranking.slice(0, 5);
  const next5 = ranking.slice(5, 10);
  const fifth = top5[4];
  const tiedWithFifth = ranking.slice(5).filter((r) => sameScore(r, fifth));

  const totalPoints = ranking.reduce((s, r) => s + r.points, 0);
  const domains: DomainScore[] = DOMAINS.map((d) => {
    const members = ranking.filter((r) => r.domain === d.id);
    const points = members.reduce((s, r) => s + r.points, 0);
    const maxPoints = members.reduce((s, r) => s + r.maxPoints, 0);
    const score = members.reduce((s, r) => s + r.score, 0) / Math.max(members.length, 1);
    return {
      domain: d.id,
      points,
      maxPoints,
      score,
      percent: Math.round(score * 100),
      share: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0,
      topCount: top5.filter((r) => r.domain === d.id).length,
    };
  });

  // Ako výrazne TOP 5 vyčnieva. Hranice sú kalibrované simuláciou (`npm run qa`):
  // pri čisto náhodných odpovediach má priemer TOP 5 medián 0,75 a 95. percentil 0,82;
  // hodnotu 0,90 náhodné odpovede v simulácii nedosiahli ani raz.
  const topMean = top5.reduce((s, r) => s + r.score, 0) / 5;
  const differentiation: Differentiation =
    topMean >= DIFF_STRONG ? 'vyrazny' : topMean >= DIFF_MILD ? 'mierny' : 'vyrovnany';

  return {
    ranking,
    top5,
    next5,
    tiedWithFifth,
    domains,
    answered,
    total: questions.length,
    complete: answered === questions.length,
    sufficient: answered / questions.length >= MIN_COVERAGE,
    differentiation,
  };
}
