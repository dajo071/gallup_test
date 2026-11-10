import { useCallback, useEffect, useState } from 'react';
import { TEST_QUESTIONS } from '../data/questions';
import { clearState, initialState, loadState, saveState, type AppState } from './storage';

/** Stav aplikácie s automatickým ukladaním do prehliadača. */
export function useAppState() {
  const [state, setState] = useState<AppState>(() => normalize(loadState()));

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const reset = useCallback(() => {
    clearState();
    setState(initialState());
  }, []);

  return { state, update, reset };
}

/** Zabezpečí, že uložený stav je vnútorne konzistentný (napr. po zmene banky otázok). */
function normalize(s: AppState): AppState {
  const total = TEST_QUESTIONS.length;
  const answered = TEST_QUESTIONS.filter((q) => s.answers[q.id]).length;
  const complete = answered === total;
  let view = s.view;
  if (!complete && view !== 'intro' && view !== 'quiz') view = answered > 0 ? 'quiz' : 'intro';
  return { ...s, view, index: Math.min(s.index, total - 1) };
}
