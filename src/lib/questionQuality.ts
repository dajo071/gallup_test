import { TALENTS } from '../data/talents';
import type { Question, QuestionType } from '../data/types';
import { WEIGHTS } from './scoring';

/**
 * KONTROLA KVALITY OTÁZOK
 *
 * Automatické kontroly, ktoré odhalia:
 *  - štrukturálne chyby (neexistujúci talent, duplicitné id, zlý počet možností),
 *  - nevyváženosť (talenty nemajú rovnaký počet príležitostí / rovnaké maximum bodov),
 *  - nadmerné prekrývanie (dva talenty sa stretávajú príliš často),
 *  - príliš podobné formulácie (podobnosť slov medzi výrokmi),
 *  - príliš očividné položky (výrok obsahuje koreň názvu meraného talentu),
 *  - nevyvážené položky (jedna možnosť je výrazne dlhšia než ostatné).
 *
 * `errors` musia byť nulové (stráži to test), `warnings` sú podnety na redakčnú úpravu.
 */

export interface QualityReport {
  errors: string[];
  warnings: string[];
  coverage: { talentId: string; pair: number; situation: number; energy: number; maxPoints: number }[];
  maxCooccurrence: number;
}

/** Korene slov, ktoré by priamo prezradili meraný talent. */
const GIVEAWAY: Record<string, string[]> = {
  analytik: ['analyt', 'analyz'],
  strateg: ['strat'],
  objavitel: ['objav'],
  novator: ['novat', 'inovat', 'inovac'],
  syntetik: ['synt'],
  vizionar: ['vizi'],
  posudzovatel: ['posudz', 'posud'],
  tahun: ['tahun'],
  organizator: ['organiz'],
  garant: ['garan'],
  detailista: ['detail'],
  starter: ['start'],
  vytrvalec: ['vytrva'],
  improvizator: ['improviz'],
  formulator: ['formul'],
  obhajca: ['obhaj'],
  kormidelnik: ['kormid'],
  sutazivec: ['sutaz'],
  rozhodny: ['rozhodny', 'rozhodnos'],
  povzbudzovac: ['povzbud'],
  vyjednavac: ['vyjedn'],
  vnimavec: ['vnima'],
  timovy: ['tim'],
  sprievodca: ['sprievod', 'sprevadz'],
  zmierovatel: ['zmier'],
  prepajac: ['prepaj', 'prepoj'],
  opora: ['opor'],
  dovernik: ['dover'],
};

const STOP = new Set(
  'a aj ako ale aby by co do ho ich je ju k kde ked keď kto ktory ktorá ktoré ktorú ma mi mu na nad nie o od po pre pri sa si som s so to tak ten tie tu uz v vo z za ze že čo či iné najma najmä najviac'.split(' '),
);

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ');

function tokens(s: string): Set<string> {
  return new Set(
    normalize(s)
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map((w) => w.slice(0, 6)), // hrubé „stemovanie“ – stačí na odhalenie parafráz
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

export const SIMILARITY_LIMIT = 0.6;
export const LENGTH_RATIO_LIMIT = 3;
export const COOCCURRENCE_LIMIT = 2;

export function checkQuestions(bank: Question[], test: Question[]): QualityReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const talentIds = new Set(TALENTS.map((t) => t.id));

  // --- štruktúra -----------------------------------------------------
  const seenQ = new Set<string>();
  const seenO = new Set<string>();
  for (const q of bank) {
    if (seenQ.has(q.id)) errors.push(`Duplicitné id otázky: ${q.id}`);
    seenQ.add(q.id);
    const expected = q.type === 'pair' ? 2 : 4;
    if (q.options.length !== expected) errors.push(`${q.id}: očakávam ${expected} možnosti, je ich ${q.options.length}`);
    const inQ = new Set<string>();
    for (const o of q.options) {
      if (seenO.has(o.id)) errors.push(`Duplicitné id možnosti: ${o.id}`);
      seenO.add(o.id);
      if (!talentIds.has(o.talent)) errors.push(`${o.id}: neznámy talent „${o.talent}“`);
      if (inQ.has(o.talent)) errors.push(`${q.id}: talent „${o.talent}“ je v otázke dvakrát`);
      inQ.add(o.talent);
      if (!o.text.trim()) errors.push(`${o.id}: prázdny text`);
    }
  }
  for (const q of test) if (!seenQ.has(q.id)) errors.push(`${q.id}: otázka z testu chýba v banke`);
  if (new Set(test.map((q) => q.id)).size !== test.length) errors.push('Test obsahuje tú istú otázku viackrát');

  // --- vyváženosť testu ---------------------------------------------
  const cov = new Map(TALENTS.map((t) => [t.id, { pair: 0, situation: 0, energy: 0, maxPoints: 0 }]));
  for (const q of test) {
    for (const o of q.options) {
      const c = cov.get(o.talent);
      if (!c) continue;
      c[q.type as QuestionType]++;
      c.maxPoints += WEIGHTS[q.type];
    }
  }
  const coverage = TALENTS.map((t) => ({ talentId: t.id, ...cov.get(t.id)! }));
  const first = coverage[0];
  for (const c of coverage) {
    if (c.pair !== first.pair || c.situation !== first.situation || c.energy !== first.energy) {
      errors.push(
        `Nevyvážené pokrytie: ${c.talentId} má ${c.pair}/${c.situation}/${c.energy} (pár/situácia/energia), ${first.talentId} má ${first.pair}/${first.situation}/${first.energy}`,
      );
    }
    if (c.pair + c.situation + c.energy < 4) errors.push(`${c.talentId}: menej než 4 nezávislé otázky`);
  }

  // --- prekrývanie talentov -----------------------------------------
  const co = new Map<string, number>();
  for (const q of test) {
    const ts = q.options.map((o) => o.talent).sort();
    for (let i = 0; i < ts.length; i++)
      for (let j = i + 1; j < ts.length; j++) co.set(`${ts[i]}×${ts[j]}`, (co.get(`${ts[i]}×${ts[j]}`) ?? 0) + 1);
  }
  let maxCooccurrence = 0;
  for (const [k, n] of co) {
    maxCooccurrence = Math.max(maxCooccurrence, n);
    if (n > COOCCURRENCE_LIMIT) warnings.push(`Prekrývanie: dvojica ${k} sa stretáva ${n}× (limit ${COOCCURRENCE_LIMIT})`);
  }

  // --- podobnosť formulácií -----------------------------------------
  const all = bank.flatMap((q) => q.options.map((o) => ({ ...o, tok: tokens(o.text) })));
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      const sim = jaccard(all[i].tok, all[j].tok);
      if (sim >= SIMILARITY_LIMIT) {
        warnings.push(`Podobné výroky (${sim.toFixed(2)}): ${all[i].id} „${all[i].text}“ ↔ ${all[j].id} „${all[j].text}“`);
      }
    }
  }
  const prompts = bank.map((q) => ({ id: q.id, tok: tokens(q.prompt) }));
  for (let i = 0; i < prompts.length; i++)
    for (let j = i + 1; j < prompts.length; j++)
      if (prompts[i].tok.size >= 3 && jaccard(prompts[i].tok, prompts[j].tok) >= SIMILARITY_LIMIT)
        warnings.push(`Podobné zadania: ${prompts[i].id} ↔ ${prompts[j].id}`);

  // --- očividnosť a dĺžka -------------------------------------------
  for (const q of bank) {
    for (const o of q.options) {
      const words = normalize(o.text).split(/\s+/);
      const stems = GIVEAWAY[o.talent] ?? [];
      const hit = stems.find((s) => words.some((w) => w.startsWith(s)));
      if (hit) warnings.push(`Očividná položka: ${o.id} obsahuje koreň „${hit}“ meraného talentu (${o.talent})`);
    }
    const lens = q.options.map((o) => o.text.length);
    const ratio = Math.max(...lens) / Math.min(...lens);
    if (ratio > LENGTH_RATIO_LIMIT) warnings.push(`Nevyvážená dĺžka možností: ${q.id} (pomer ${ratio.toFixed(1)})`);
  }

  return { errors, warnings, coverage, maxCooccurrence };
}
