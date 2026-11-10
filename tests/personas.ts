import { TEST_QUESTIONS } from '../src/data/questions';
import { TALENTS } from '../src/data/talents';
import type { Answers, Question } from '../src/data/types';

/**
 * MODELOVÍ POUŽÍVATELIA
 * Slúžia výlučne na overenie algoritmu – do aplikácie nevstupujú.
 * Každá persona má „vnútornú“ silu preferencie pre vybrané talenty. Ostatné
 * talenty dostanú malý pseudonáhodný šum (0–1, pevný seed), aby sa persona pri
 * otázkach mimo svojho profilu správala ako reálny človek so slabými preferenciami
 * a nie mechanicky (napr. vždy prvá možnosť). V každej otázke zvolí možnosť
 * s najvyššou preferenciou.
 */

export interface Persona {
  id: string;
  label: string;
  prefs: Record<string, number>;
  /** Talenty, ktoré musia skončiť v TOP 5. */
  expectedTop5: string[];
}

export const PERSONAS: Persona[] = [
  {
    id: 'analyticky',
    label: 'Výrazne analytický a strategický človek',
    prefs: { analytik: 10, strateg: 9, posudzovatel: 8, syntetik: 7, objavitel: 6, vizionar: 3, detailista: 2 },
    expectedTop5: ['analytik', 'strateg', 'posudzovatel', 'syntetik', 'objavitel'],
  },
  {
    id: 'komunikativny',
    label: 'Komunikatívny a spoločenský človek',
    prefs: { prepajac: 10, formulator: 9, povzbudzovac: 8, obhajca: 7, timovy: 6, kormidelnik: 3, starter: 2 },
    expectedTop5: ['prepajac', 'formulator', 'povzbudzovac', 'obhajca', 'timovy'],
  },
  {
    id: 'organizacny',
    label: 'Organizačný a výkonnostne orientovaný človek',
    prefs: { organizator: 10, tahun: 9, garant: 8, detailista: 7, vytrvalec: 6, sutazivec: 3, strateg: 2 },
    expectedTop5: ['organizator', 'tahun', 'garant', 'detailista', 'vytrvalec'],
  },
  {
    id: 'empaticky',
    label: 'Empatický človek orientovaný na spoluprácu',
    prefs: { vnimavec: 10, opora: 9, timovy: 8, zmierovatel: 7, sprievodca: 6, dovernik: 3, garant: 2 },
    expectedTop5: ['vnimavec', 'opora', 'timovy', 'zmierovatel', 'sprievodca'],
  },
  {
    id: 'kreativny',
    label: 'Kreatívny a inovatívny človek',
    prefs: { novator: 10, vizionar: 9, starter: 8, objavitel: 7, improvizator: 6, syntetik: 3, formulator: 2 },
    expectedTop5: ['novator', 'vizionar', 'starter', 'objavitel', 'improvizator'],
  },
  {
    id: 'lidersky',
    label: 'Rozhodný líder naprieč doménami',
    prefs: { kormidelnik: 10, rozhodny: 9, strateg: 8, tahun: 7, sprievodca: 6, obhajca: 3, organizator: 2 },
    expectedTop5: ['kormidelnik', 'rozhodny', 'strateg', 'tahun', 'sprievodca'],
  },
];

export function answerAs(persona: Persona, questions: Question[] = TEST_QUESTIONS, noiseSeed = 1): Answers {
  // šum pre talenty mimo profilu – pevný pre danú personu a seed, nezávislý od poradia otázok
  const noise = rng(persona.id.split('').reduce((s, ch) => s * 31 + ch.charCodeAt(0), 7) + noiseSeed * 7919);
  const weak = new Map(TALENTS.map((t) => [t.id, noise()]));
  const pref = (talent: string) => persona.prefs[talent] ?? weak.get(talent) ?? 0;
  const answers: Answers = {};
  for (const q of questions) {
    let best = q.options[0];
    for (const o of q.options) if (pref(o.talent) > pref(best.talent)) best = o;
    answers[q.id] = best.id;
  }
  return answers;
}

/** Malý deterministický generátor (mulberry32) – simulácia náhodných odpovedí pre QA. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function answerRandomly(seed: number, questions: Question[] = TEST_QUESTIONS): Answers {
  const r = rng(seed);
  const answers: Answers = {};
  for (const q of questions) answers[q.id] = q.options[Math.floor(r() * q.options.length)].id;
  return answers;
}
