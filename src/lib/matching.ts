import { ACTIVITIES } from '../data/activities';
import { TALENT_BY_ID } from '../data/talents';
import type { Activity } from '../data/types';
import type { ScoringResult } from './scoring';

/**
 * PÁROVANIE TALENTOV A ČINNOSTÍ
 *
 * Miera súladu = vážený podiel talentov, o ktoré sa činnosť opiera a ktoré
 * používateľ má medzi svojimi najsilnejšími:
 *
 *   súlad = Σ (váha talentu v činnosti × sila talentu u používateľa) / Σ váh
 *
 *   sila = 1    talent je v TOP 5
 *        = 0,5  talent je na 6.–10. mieste (blízky talent)
 *        = 0    inak
 *
 * Výber činnosti používateľom (záujem) sa do súladu NEZAPOČÍTAVA – záujem
 * a talent sú dve rôzne veci a aplikácia ich zobrazuje oddelene.
 */

export const STRENGTH_TOP5 = 1;
export const STRENGTH_NEXT5 = 0.5;

export type FitLevel = 'silny' | 'ciastocny' | 'nizky';

export interface ActivityMatch {
  activity: Activity;
  /** 0–100 */
  fit: number;
  level: FitLevel;
  /** Talenty z TOP 5, ktoré sa pri činnosti uplatnia (zoradené podľa váhy). */
  matched: { talentId: string; weight: number; rank: number }[];
  /** Blízke talenty (6.–10. miesto), ktoré sa pri činnosti uplatnia. */
  near: { talentId: string; weight: number; rank: number }[];
  /** Kľúčové talenty činnosti (váha ≥ 2), ktoré používateľ medzi najsilnejšími nemá. */
  missing: string[];
  why: string;
}

export const LEVEL_LABEL: Record<FitLevel, string> = {
  silny: 'Silný súlad',
  ciastocny: 'Čiastočný súlad',
  nizky: 'Nízky súlad',
};

const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} a ${items[items.length - 1]}`;

export function matchActivity(activity: Activity, result: ScoringResult): ActivityMatch {
  const rankOf = new Map(result.ranking.map((r) => [r.talentId, r.rank]));
  const entries = Object.entries(activity.talents).sort((a, b) => b[1] - a[1]);

  let sum = 0;
  let total = 0;
  const matched: ActivityMatch['matched'] = [];
  const near: ActivityMatch['near'] = [];
  const missing: string[] = [];

  for (const [talentId, weight] of entries) {
    const rank = rankOf.get(talentId) ?? Infinity;
    total += weight;
    if (rank <= 5) {
      sum += weight * STRENGTH_TOP5;
      matched.push({ talentId, weight, rank });
    } else if (rank <= 10) {
      sum += weight * STRENGTH_NEXT5;
      near.push({ talentId, weight, rank });
      if (weight >= 2) missing.push(talentId);
    } else if (weight >= 2) {
      missing.push(talentId);
    }
  }

  const fit = total > 0 ? Math.round((sum / total) * 100) : 0;
  const level: FitLevel = fit >= 55 ? 'silny' : fit >= 30 ? 'ciastocny' : 'nizky';

  return { activity, fit, level, matched, near, missing, why: explain(level, matched, near, missing) };
}

function explain(
  level: FitLevel,
  matched: ActivityMatch['matched'],
  near: ActivityMatch['near'],
  missing: string[],
): string {
  const contributions = matched.map((m) => {
    const t = TALENT_BY_ID[m.talentId];
    return `${t.name} prináša ${t.contribution}`;
  });
  const nearNames = near.map((n) => TALENT_BY_ID[n.talentId].name);
  const missingNames = missing.map((id) => TALENT_BY_ID[id].name);
  const nearText = nearNames.length
    ? ` Pomáha aj ${nearNames.length > 1 ? 'tvoje blízke talenty' : 'tvoj blízky talent'} ${list(nearNames)} (6.–10. miesto).`
    : '';

  if (level === 'silny') {
    return `Táto činnosť stojí na tom, čo ti ide prirodzene. ${contributions.join('; ')}.${nearText} Ak ťa zároveň baví, je to kombinácia, v ktorej môžeš rásť rýchlo a s menšou námahou.`;
  }
  if (level === 'ciastocny') {
    const have = contributions.length
      ? `Časť toho, čo táto činnosť vyžaduje, máš prirodzene: ${contributions.join('; ')}.`
      : `Žiadny z tvojich piatich najsilnejších talentov tu nie je kľúčový, opieraš sa však o blízke talenty.`;
    const gap = missingNames.length
      ? ` Činnosť sa opiera aj o ${missingNames.length > 1 ? 'talenty' : 'talent'} ${list(missingNames)}, ${missingNames.length > 1 ? 'ktoré nepatria' : 'ktorý nepatrí'} do tvojej TOP 5 – túto časť sa dá doplniť tréningom alebo spoluprácou.`
      : '';
    return `${have}${nearText}${gap}`;
  }
  const key = missingNames.length ? ` (najmä ${list(missingNames)})` : '';
  const some = contributions.length ? ` Oprieť sa môžeš aspoň o to, že ${contributions.join('; ')}.` : '';
  return `Táto činnosť stojí hlavne na talentoch, ktoré nepatria medzi tvoje najvýraznejšie${key}.${some}${nearText} Tvoj záujem je však rovnako dôležitý údaj: ak ťa láka, dá sa naučiť – počítaj len s tým, že ťa môže stáť viac energie. Vyskúšaj si ju najprv v malom.`;
}

/** Vyhodnotí vybrané činnosti, zoradené od najvyššieho súladu (pri zhode podľa poradia v databáze). */
export function matchSelected(selectedIds: string[], result: ScoringResult): ActivityMatch[] {
  const selected = new Set(selectedIds);
  return ACTIVITIES.filter((a) => selected.has(a.id))
    .map((a) => matchActivity(a, result))
    .sort((a, b) => b.fit - a.fit);
}

/** Činnosti, ktoré si používateľ nevybral, no silno sedia na jeho talenty. */
export function suggestOther(selectedIds: string[], result: ScoringResult, limit = 3): ActivityMatch[] {
  const selected = new Set(selectedIds);
  return ACTIVITIES.filter((a) => !selected.has(a.id))
    .map((a) => matchActivity(a, result))
    .filter((m) => m.level === 'silny')
    .sort((a, b) => b.fit - a.fit)
    .slice(0, limit);
}
