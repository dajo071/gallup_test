import { useEffect, useMemo } from 'react';
import { Activities } from './components/Activities';
import { Intro } from './components/Intro';
import { Quiz } from './components/Quiz';
import { Recommendations } from './components/Recommendations';
import { Results } from './components/Results';
import { TEST_QUESTIONS } from './data/questions';
import { scoreAnswers } from './lib/scoring';
import type { View } from './lib/storage';
import { useAppState } from './lib/useAppState';

export default function App() {
  const { state, update, reset } = useAppState();
  const { view, answers } = state;

  const answered = useMemo(() => TEST_QUESTIONS.filter((q) => answers[q.id]).length, [answers]);
  const complete = answered === TEST_QUESTIONS.length;
  // Skóre sa počíta až po dokončení testu – počas vypĺňania sa nikde nezobrazuje.
  const result = useMemo(() => (complete ? scoreAnswers(answers) : null), [complete, answers]);

  const go = (v: View) => update({ view: v });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const restart = () => {
    if (answered === 0 || window.confirm('Naozaj chceš začať odznova? Doterajšie odpovede aj výsledky sa vymažú.')) reset();
  };

  const start = () => {
    if (complete) return go('results');
    const firstUnanswered = TEST_QUESTIONS.findIndex((q) => !answers[q.id]);
    update({ view: 'quiz', index: Math.max(0, firstUnanswered) });
  };

  const showResults = result && view !== 'intro' && view !== 'quiz';

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="no-print mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <button type="button" onClick={() => go(complete ? 'results' : 'intro')} className="flex items-center gap-2.5" aria-label="Talent Discovery – domov">
          <span className="grid size-8 grid-cols-2 gap-[3px] rounded-[10px] bg-ink p-[7px]" aria-hidden>
            <span className="rounded-full bg-[#6b6fe0]" />
            <span className="rounded-full bg-[#d98a2b]" />
            <span className="rounded-full bg-[#d9577a]" />
            <span className="rounded-full bg-[#27a08e]" />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-ink">Talent Discovery</span>
        </button>
        {view === 'quiz' && (
          <button type="button" onClick={() => go('intro')} className="text-sm font-semibold text-muted hover:text-ink">
            Prerušiť
          </button>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 sm:px-6">
        {view === 'intro' && (
          <Intro
            name={state.name}
            answered={answered}
            onName={(name) => update({ name })}
            onStart={start}
            onRestart={restart}
          />
        )}

        {view === 'quiz' && (
          <Quiz
            answers={answers}
            index={state.index}
            onAnswer={(qid, oid) => update((s) => ({ answers: { ...s.answers, [qid]: oid } }))}
            onIndex={(index) => update({ index })}
            onFinish={() => update((s) => ({ view: 'results', completedAt: s.completedAt ?? new Date().toISOString() }))}
          />
        )}

        {showResults && view === 'results' && (
          <Results
            result={result}
            name={state.name}
            completedAt={state.completedAt}
            selectedActivities={state.selectedActivities}
            onActivities={() => go('activities')}
            onRestart={restart}
          />
        )}

        {showResults && view === 'activities' && (
          <Activities
            selected={state.selectedActivities}
            onToggle={(id) =>
              update((s) => ({
                selectedActivities: s.selectedActivities.includes(id)
                  ? s.selectedActivities.filter((x) => x !== id)
                  : [...s.selectedActivities, id],
              }))
            }
            onClear={() => update({ selectedActivities: [] })}
            onBack={() => go('results')}
            onContinue={() => go('recommendations')}
          />
        )}

        {showResults && view === 'recommendations' && (
          <Recommendations
            result={result}
            selected={state.selectedActivities}
            onBack={() => go('activities')}
            onResults={() => go('results')}
          />
        )}
      </main>

      <footer className="no-print border-t border-line px-4 py-6 text-center text-xs text-faint">
        Talent Discovery · pôvodná, zatiaľ nevalidovaná metodika · údaje zostávajú v tvojom prehliadači
      </footer>
    </div>
  );
}
