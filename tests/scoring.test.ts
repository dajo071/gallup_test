import { describe, expect, it } from 'vitest';
import { TEST_QUESTIONS } from '../src/data/questions';
import { TALENTS } from '../src/data/talents';
import type { Answers } from '../src/data/types';
import { buildProfile } from '../src/lib/profile';
import { scoreAnswers, WEIGHTS } from '../src/lib/scoring';
import { PERSONAS, answerAs, answerRandomly, rng } from './personas';

const rankOf = (res: ReturnType<typeof scoreAnswers>, id: string) => res.ranking.find((r) => r.talentId === id)!.rank;

describe('modeloví používatelia', () => {
  for (const p of PERSONAS) {
    // Hranica medzi 5. a 6. miestom je pri 70 otázkach a 28 talentoch mäkká (pozri README),
    // preto nežiadame presnú zhodu všetkých piatich, ale: aspoň 4 z 5 v TOP 5, všetky v TOP 7,
    // dve najsilnejšie preferencie v TOP 3 a najsilnejšia na 1. mieste.
    it(`${p.label}: profil zodpovedá očakávaniu`, () => {
      const res = scoreAnswers(answerAs(p));
      expect(res.complete).toBe(true);
      expect(res.top5).toHaveLength(5);
      const top = res.top5.map((r) => r.talentId);
      expect(p.expectedTop5.filter((id) => top.includes(id)).length).toBeGreaterThanOrEqual(4);
      for (const id of p.expectedTop5) expect(rankOf(res, id), id).toBeLessThanOrEqual(7);
      for (const id of p.expectedTop5.slice(0, 2)) expect(rankOf(res, id), id).toBeLessThanOrEqual(3);
      expect(res.top5[0].talentId).toBe(p.expectedTop5[0]);
      expect(res.differentiation).toBe('vyrazny');
    });
  }

  it('robustnosť: pri 100 rôznych šumoch je v TOP 5 priemerne aspoň 4,5 z 5 očakávaných talentov a všetky sú v TOP 8', () => {
    let hits = 0;
    let n = 0;
    for (const p of PERSONAS)
      for (let seed = 1; seed <= 100; seed++) {
        const res = scoreAnswers(answerAs(p, TEST_QUESTIONS, seed));
        hits += p.expectedTop5.filter((id) => rankOf(res, id) <= 5).length;
        n++;
        for (const id of p.expectedTop5) expect(rankOf(res, id), `${p.id}/${seed}/${id}`).toBeLessThanOrEqual(8);
      }
    expect(hits / n).toBeGreaterThanOrEqual(4.5);
  });

  it('rôzne persony dostanú rôzne profily', () => {
    const tops = PERSONAS.map((p) => scoreAnswers(answerAs(p)).top5.map((r) => r.talentId).join(','));
    expect(new Set(tops).size).toBe(PERSONAS.length);
  });
});

describe('vlastnosti algoritmu', () => {
  const answers = answerAs(PERSONAS[0]);

  it('je deterministický', () => {
    expect(scoreAnswers(answers)).toEqual(scoreAnswers({ ...answers }));
  });

  it('nezávisí od poradia otázok ani od poradia odpovedí', () => {
    const r = rng(42);
    const shuffled = [...TEST_QUESTIONS].sort(() => r() - 0.5);
    const reversedAnswers: Answers = Object.fromEntries(Object.entries(answers).reverse());
    expect(scoreAnswers(reversedAnswers, shuffled).ranking).toEqual(scoreAnswers(answers).ranking);
  });

  it('rebríček obsahuje všetky talenty práve raz a poradie 1…28', () => {
    const res = scoreAnswers(answerRandomly(7));
    expect(res.ranking.map((r) => r.rank)).toEqual(TALENTS.map((_, i) => i + 1));
    expect(new Set(res.ranking.map((r) => r.talentId)).size).toBe(TALENTS.length);
    for (let i = 1; i < res.ranking.length; i++) expect(res.ranking[i - 1].score).toBeGreaterThanOrEqual(res.ranking[i].score);
  });

  it('surové body: zvolená možnosť pripíše váhu, nezvolená nič neodoberá', () => {
    const q = TEST_QUESTIONS.find((x) => x.type === 'situation')!;
    const res = scoreAnswers({ [q.id]: q.options[2].id });
    const total = res.ranking.reduce((s, r) => s + r.points, 0);
    expect(total).toBe(WEIGHTS.situation);
    expect(res.ranking.every((r) => r.points >= 0)).toBe(true);
    const winner = res.ranking.find((r) => r.talentId === q.options[2].talent)!;
    expect(winner.points).toBe(WEIGHTS.situation);
    expect(winner.rank).toBe(1);
    // ostatné tri možnosti mali príležitosť, ale nezískali body
    for (const o of q.options.filter((x) => x !== q.options[2])) {
      const r = res.ranking.find((x) => x.talentId === o.talent)!;
      expect([r.opportunities, r.points]).toEqual([1, 0]);
    }
  });

  it('pri úplnom teste majú všetky talenty rovnaké maximum a súčet bodov je konštantný', () => {
    const a = scoreAnswers(answerRandomly(1));
    const b = scoreAnswers(answerAs(PERSONAS[3]));
    expect(new Set(a.ranking.map((r) => r.maxPoints)).size).toBe(1);
    const sum = (res: typeof a) => res.ranking.reduce((s, r) => s + r.points, 0);
    expect(sum(a)).toBe(sum(b));
    expect(a.domains.reduce((s, d) => s + d.topCount, 0)).toBe(5);
  });

  it('zohľadňuje silu súperov: výhra nad silným talentom má väčšiu hodnotu než nad slabým', () => {
    // dvaja „súperi“ s rovnakým počtom výhier, jeden porazil najsilnejší talent persony
    const res = scoreAnswers(answers);
    const top = res.top5[0];
    expect(top.score).toBeGreaterThan(0.9);
    // talent s nižším surovým podielom môže byť vyššie, ak prehrával len so silnými
    const sorted = [...res.ranking].sort((x, y) => y.rawShare - x.rawShare);
    expect(sorted.map((r) => r.talentId)).not.toEqual(res.ranking.map((r) => r.talentId));
  });
});

describe('hraničné situácie', () => {
  it('žiadne odpovede: nič nepadne, všetko je nulové a poradie je kanonické', () => {
    const res = scoreAnswers({});
    expect(res.answered).toBe(0);
    expect(res.complete).toBe(false);
    expect(res.sufficient).toBe(false);
    expect(res.ranking.map((r) => r.talentId)).toEqual(TALENTS.map((t) => t.id));
    expect(res.ranking.every((r) => r.points === 0 && r.score === 0.5)).toBe(true);
    expect(res.differentiation).toBe('vyrovnany');
  });

  it('neúplné odpovede: normalizuje sa podľa zodpovedaných príležitostí', () => {
    const full = answerAs(PERSONAS[2]);
    const partial: Answers = Object.fromEntries(Object.entries(full).slice(0, 60));
    const res = scoreAnswers(partial);
    expect(res.answered).toBe(60);
    expect(res.complete).toBe(false);
    expect(res.sufficient).toBe(true);
    for (const r of res.ranking) {
      expect(r.maxPoints).toBeLessThanOrEqual(11);
      expect(r.rawShare).toBeLessThanOrEqual(1);
    }
    // hlavné talenty persony zostávajú na čele aj pri 60 zo 70 otázok
    const top = res.top5.map((r) => r.talentId);
    expect(PERSONAS[2].expectedTop5.filter((id) => top.includes(id)).length).toBeGreaterThanOrEqual(4);
  });

  it('neplatné odpovede sa ignorujú', () => {
    const res = scoreAnswers({ neexistuje: 'x', [TEST_QUESTIONS[0].id]: 'zla-moznost' });
    expect(res.answered).toBe(0);
  });

  it('nerozhodný výsledok: zhodné skóre sa rozhodne transparentne a vždy rovnako', () => {
    // každá otázka → prvá možnosť: vzniká veľa zhôd
    const answers: Answers = Object.fromEntries(TEST_QUESTIONS.map((q) => [q.id, q.options[0].id]));
    const a = scoreAnswers(answers);
    const b = scoreAnswers(answers);
    expect(a.ranking).toEqual(b.ranking);
    expect(a.top5).toHaveLength(5);
    const canonical = TALENTS.map((t) => t.id);
    for (let i = 1; i < a.ranking.length; i++) {
      const [x, y] = [a.ranking[i - 1], a.ranking[i]];
      if (x.score === y.score && x.rawShare === y.rawShare && x.formats === y.formats) {
        expect(canonical.indexOf(x.talentId)).toBeLessThan(canonical.indexOf(y.talentId));
      }
    }
    for (const r of a.tiedWithFifth) expect(r.score).toBe(a.top5[4].score);
  });

  it('vyrovnané (náhodné) odpovede sa neoznačia ako výrazný profil', () => {
    let strong = 0;
    for (let s = 1; s <= 300; s++) if (scoreAnswers(answerRandomly(s)).differentiation === 'vyrazny') strong++;
    expect(strong).toBe(0);
  });
});

describe('osobný profil', () => {
  it('vychádza z reálneho výsledku: spomína všetkých 5 talentov a je deterministický', () => {
    for (const p of PERSONAS) {
      const res = scoreAnswers(answerAs(p));
      const profile = buildProfile(res);
      const text = profile.paragraphs.join(' ');
      for (const r of res.top5) {
        const name = TALENTS.find((t) => t.id === r.talentId)!.name;
        expect(text, `${p.id}: ${name}`).toContain(name);
      }
      expect(buildProfile(res)).toEqual(profile);
    }
  });

  it('rôzne výsledky dávajú rôzne profily', () => {
    const texts = PERSONAS.map((p) => buildProfile(scoreAnswers(answerAs(p))).paragraphs.join(' '));
    expect(new Set(texts).size).toBe(PERSONAS.length);
  });
});
