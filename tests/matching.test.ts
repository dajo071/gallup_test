import { beforeEach, describe, expect, it } from 'vitest';
import { ACTIVITIES, ACTIVITY_BY_ID } from '../src/data/activities';
import { TEST_QUESTIONS } from '../src/data/questions';
import { matchActivity, matchSelected, suggestOther } from '../src/lib/matching';
import { scoreAnswers } from '../src/lib/scoring';
import { clearState, initialState, loadState, saveState } from '../src/lib/storage';
import { PERSONAS, answerAs } from './personas';

const resultOf = (id: string) => scoreAnswers(answerAs(PERSONAS.find((p) => p.id === id)!));

describe('párovanie talentov a činností', () => {
  it('analytický človek: analýza dát má silný súlad, motivovanie tímu nízky', () => {
    const res = resultOf('analyticky');
    const data = matchActivity(ACTIVITY_BY_ID['analyza-dat'], res);
    const motiv = matchActivity(ACTIVITY_BY_ID['motivovanie'], res);
    expect(data.level).toBe('silny');
    expect(data.matched.map((m) => m.talentId)).toContain('analytik');
    expect(motiv.level).toBe('nizky');
    expect(data.fit).toBeGreaterThan(motiv.fit);
  });

  it('každá persona má najlepšiu zhodu v „svojej“ kategórii', () => {
    const expected: Record<string, string[]> = {
      analyticky: ['analyticke'],
      komunikativny: ['komunikacne', 'vztahove'],
      organizacny: ['organizacne'],
      empaticky: ['vztahove'],
      kreativny: ['kreativne'],
    };
    for (const [id, cats] of Object.entries(expected)) {
      const res = resultOf(id);
      const best = matchSelected(ACTIVITIES.map((a) => a.id), res)[0];
      expect(cats, `${id} → ${best.activity.id}`).toContain(best.activity.category);
    }
  });

  it('súlad je 0–100, výpočet zodpovedá definícii a je deterministický', () => {
    const res = resultOf('organizacny');
    const rank = new Map(res.ranking.map((r) => [r.talentId, r.rank]));
    for (const a of ACTIVITIES) {
      const m = matchActivity(a, res);
      let sum = 0;
      let total = 0;
      for (const [t, w] of Object.entries(a.talents)) {
        total += w;
        const r = rank.get(t)!;
        sum += w * (r <= 5 ? 1 : r <= 10 ? 0.5 : 0);
      }
      expect(m.fit).toBe(Math.round((sum / total) * 100));
      expect(m.fit).toBeGreaterThanOrEqual(0);
      expect(m.fit).toBeLessThanOrEqual(100);
      expect(m.why.length).toBeGreaterThan(40);
      expect(m.why).not.toMatch(/undefined|NaN|\s{2,}|\.\./);
      expect(matchActivity(a, res)).toEqual(m);
    }
  });

  it('vyhodnotí len vybrané činnosti, zoradené podľa súladu', () => {
    const res = resultOf('kreativny');
    const sel = ['predaj', 'inovacie', 'kontrola-kvality', 'neexistuje'];
    const out = matchSelected(sel, res);
    expect(out.map((m) => m.activity.id).sort()).toEqual(['inovacie', 'kontrola-kvality', 'predaj']);
    expect(out[0].activity.id).toBe('inovacie');
    for (let i = 1; i < out.length; i++) expect(out[i - 1].fit).toBeGreaterThanOrEqual(out[i].fit);
  });

  it('záujem neovplyvňuje mieru súladu', () => {
    const res = resultOf('empaticky');
    const alone = matchSelected(['koucing'], res)[0].fit;
    const withOthers = matchSelected(['koucing', 'predaj', 'analyza-dat'], res).find((m) => m.activity.id === 'koucing')!.fit;
    expect(alone).toBe(withOthers);
  });

  it('navrhne nevybrané činnosti so silným súladom', () => {
    const res = resultOf('empaticky');
    const others = suggestOther(['predaj'], res);
    expect(others.length).toBeGreaterThan(0);
    expect(others.length).toBeLessThanOrEqual(3);
    for (const m of others) {
      expect(m.level).toBe('silny');
      expect(m.activity.id).not.toBe('predaj');
    }
  });
});

describe('ukladanie', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    (globalThis as { localStorage?: unknown }).localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    };
  });

  it('uloží a obnoví rozpracovaný test aj výsledky', () => {
    const answers = answerAs(PERSONAS[0]);
    saveState({ ...initialState(), view: 'recommendations', name: 'Jana', answers, index: 12, selectedActivities: ['predaj'], completedAt: '2026-01-01T00:00:00.000Z' });
    const s = loadState();
    expect(s.name).toBe('Jana');
    expect(Object.keys(s.answers)).toHaveLength(TEST_QUESTIONS.length);
    expect(s.view).toBe('recommendations');
    expect(s.selectedActivities).toEqual(['predaj']);
    expect(scoreAnswers(s.answers).ranking).toEqual(scoreAnswers(answers).ranking);
  });

  it('zahodí poškodené údaje a neplatné odpovede', () => {
    localStorage.setItem('talent-discovery:v1', '{nie je json');
    expect(loadState()).toEqual(initialState());
    localStorage.setItem('talent-discovery:v1', JSON.stringify({ version: 1, view: 'hack', answers: { w01: 'w01-a', w02: 'cudzia', xx: 'y' }, selectedActivities: ['predaj', 'zla', 5], index: -3 }));
    const s = loadState();
    expect(s.answers).toEqual({ w01: 'w01-a' });
    expect(s.view).toBe('intro');
    expect(s.selectedActivities).toEqual(['predaj']);
    expect(s.index).toBe(0);
  });

  it('vymazanie vráti počiatočný stav', () => {
    saveState({ ...initialState(), name: 'X' });
    clearState();
    expect(loadState()).toEqual(initialState());
  });
});
