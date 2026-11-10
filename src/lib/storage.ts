import { ACTIVITY_BY_ID } from '../data/activities';
import { QUESTION_BY_ID } from '../data/questions';
import type { Answers } from '../data/types';

/**
 * LOKÁLNE UKLADANIE
 * Všetko zostáva v prehliadači používateľa (localStorage). Nič sa neodosiela na server.
 */

export type View = 'intro' | 'quiz' | 'results' | 'activities' | 'recommendations';

export interface AppState {
  version: 1;
  view: View;
  name: string;
  answers: Answers;
  /** Index aktuálnej otázky. */
  index: number;
  selectedActivities: string[];
  completedAt: string | null;
}

const KEY = 'talent-discovery:v1';

export const initialState = (): AppState => ({
  version: 1,
  view: 'intro',
  name: '',
  answers: {},
  index: 0,
  selectedActivities: [],
  completedAt: null,
});

const VIEWS: View[] = ['intro', 'quiz', 'results', 'activities', 'recommendations'];

/** Načíta a zvaliduje uložený stav. Poškodené alebo zastarané údaje sa zahodia. */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState();
    const data = JSON.parse(raw) as Partial<AppState>;
    if (data.version !== 1 || typeof data.answers !== 'object' || data.answers === null) return initialState();

    const answers: Answers = {};
    for (const [qid, oid] of Object.entries(data.answers)) {
      const q = QUESTION_BY_ID[qid];
      if (q && q.options.some((o) => o.id === oid)) answers[qid] = oid as string;
    }
    return {
      version: 1,
      view: VIEWS.includes(data.view as View) ? (data.view as View) : 'intro',
      name: typeof data.name === 'string' ? data.name.slice(0, 40) : '',
      answers,
      index: Number.isInteger(data.index) ? Math.max(0, data.index as number) : 0,
      selectedActivities: Array.isArray(data.selectedActivities)
        ? data.selectedActivities.filter((id) => typeof id === 'string' && id in ACTIVITY_BY_ID)
        : [],
      completedAt: typeof data.completedAt === 'string' ? data.completedAt : null,
    };
  } catch {
    return initialState();
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* súkromný režim alebo plné úložisko – aplikácia funguje ďalej, len bez ukladania */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nič */
  }
}
