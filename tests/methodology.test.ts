import { describe, expect, it } from 'vitest';
import { ACTIVITIES } from '../src/data/activities';
import { QUESTION_BANK, TEST_QUESTIONS } from '../src/data/questions';
import { TALENTS } from '../src/data/talents';
import { DOMAINS } from '../src/data/domains';
import { checkQuestions } from '../src/lib/questionQuality';
import { answerRandomly } from './personas';
import { scoreAnswers } from '../src/lib/scoring';

describe('databáza talentov', () => {
  it('má 28 talentov, 7 v každej zo 4 domén, s jedinečnými id a názvami', () => {
    expect(TALENTS).toHaveLength(28);
    for (const d of DOMAINS) expect(TALENTS.filter((t) => t.domain === d.id)).toHaveLength(7);
    expect(new Set(TALENTS.map((t) => t.id)).size).toBe(28);
    expect(new Set(TALENTS.map((t) => t.name)).size).toBe(28);
  });

  it('každý talent má kompletnú interpretáciu', () => {
    for (const t of TALENTS) {
      for (const text of [t.tagline, t.essence, t.contribution, t.description]) expect(text.length, t.id).toBeGreaterThan(15);
      expect(t.daily.length, t.id).toBeGreaterThanOrEqual(4);
      expect(t.work.length, t.id).toBeGreaterThanOrEqual(3);
      expect(t.activities.length, t.id).toBeGreaterThanOrEqual(5);
      for (const k of ['advantages', 'risks', 'develop', 'examples'] as const) expect(t[k].length, `${t.id}.${k}`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('banka otázok', () => {
  const report = checkQuestions(QUESTION_BANK, TEST_QUESTIONS);

  it('má požadovaný rozsah', () => {
    expect(QUESTION_BANK.length).toBeGreaterThanOrEqual(80);
    expect(TEST_QUESTIONS.length).toBeGreaterThanOrEqual(60);
    expect(TEST_QUESTIONS.length).toBeLessThanOrEqual(80);
    expect(TEST_QUESTIONS.every((q) => q.form === 'core')).toBe(true);
  });

  it('obsahuje všetky tri typy otázok', () => {
    for (const type of ['pair', 'situation', 'energy']) expect(TEST_QUESTIONS.some((q) => q.type === type)).toBe(true);
  });

  it('nemá štrukturálne chyby a je dokonale vyvážená', () => {
    expect(report.errors).toEqual([]);
    const first = report.coverage[0];
    for (const c of report.coverage) {
      expect([c.pair, c.situation, c.energy, c.maxPoints]).toEqual([first.pair, first.situation, first.energy, first.maxPoints]);
    }
  });

  it('nemá redakčné upozornenia (podobné, očividné, nevyvážené položky, prekrývanie)', () => {
    expect(report.warnings).toEqual([]);
  });

  it('kontrola kvality naozaj zachytí chybnú položku', () => {
    const bad = [
      ...QUESTION_BANK,
      { id: 'zle', type: 'pair' as const, form: 'reserve' as const, prompt: 'Skúška', options: [
        { id: 'zle-a', text: 'Rád všetko analyzujem.', talent: 'analytik' },
        { id: 'zle-b', text: 'Neexistujúci talent a veľmi, veľmi, veľmi dlhý text tejto jednej možnosti.', talent: 'nic' },
      ] },
    ];
    const r = checkQuestions(bad, TEST_QUESTIONS);
    expect(r.errors.some((e) => e.includes('neznámy talent'))).toBe(true);
    expect(r.warnings.some((w) => w.includes('Očividná položka'))).toBe(true);
    expect(r.warnings.some((w) => w.includes('Nevyvážená dĺžka'))).toBe(true);
  });

  it('nezvýhodňuje žiadny talent: pri náhodných odpovediach sa všetky dostávajú do TOP 5 podobne často', () => {
    const N = 2000;
    const hits = new Map(TALENTS.map((t) => [t.id, 0]));
    for (let s = 1; s <= N; s++) for (const r of scoreAnswers(answerRandomly(s)).top5) hits.set(r.talentId, hits.get(r.talentId)! + 1);
    const expected = (5 / 28) * N;
    for (const [id, n] of hits) {
      expect(n, id).toBeGreaterThan(expected * 0.8);
      expect(n, id).toBeLessThan(expected * 1.2);
    }
  }, 30_000);
});

describe('databáza činností', () => {
  it('má 30 činností v 5 kategóriách, každá s talentmi, pozíciami a krokmi', () => {
    expect(ACTIVITIES).toHaveLength(30);
    const ids = new Set(TALENTS.map((t) => t.id));
    for (const a of ACTIVITIES) {
      expect(Object.keys(a.talents).length, a.id).toBeGreaterThanOrEqual(4);
      for (const t of Object.keys(a.talents)) expect(ids.has(t), `${a.id}:${t}`).toBe(true);
      expect(a.roles.length, a.id).toBeGreaterThanOrEqual(3);
      expect(a.start.length, a.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('každý talent sa uplatní aspoň v dvoch činnostiach', () => {
    for (const t of TALENTS) expect(ACTIVITIES.filter((a) => t.id in a.talents).length, t.id).toBeGreaterThanOrEqual(2);
  });
});
