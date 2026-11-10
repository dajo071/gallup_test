import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { TEST_QUESTIONS } from '../data/questions';
import type { Answers, QuestionType } from '../data/types';
import { Button } from './ui';

interface Props {
  answers: Answers;
  index: number;
  onAnswer: (questionId: string, optionId: string) => void;
  onIndex: (index: number) => void;
  onFinish: () => void;
}

const HINT: Record<QuestionType, string> = {
  pair: 'Vyber výrok, ktorý ťa vystihuje lepšie',
  situation: 'Vyber reakciu, ktorá je ti najprirodzenejšia',
  energy: 'Vyber to, čo ti dáva najviac energie',
};

const MILESTONES: Record<number, string> = {
  25: 'Štvrtina je za tebou.',
  50: 'Si v polovici – ide ti to.',
  75: 'Posledná štvrtina.',
};

/** Oneskorenie automatického prechodu na ďalšiu otázku po výbere (ms). */
const ADVANCE_DELAY = 380;

export function Quiz({ answers, index, onAnswer, onIndex, onFinish }: Props) {
  const total = TEST_QUESTIONS.length;
  const q = TEST_QUESTIONS[index];
  const selected = answers[q.id];
  const answered = TEST_QUESTIONS.filter((x) => answers[x.id]).length;
  const isLast = index === total - 1;
  const allAnswered = answered === total;
  const percent = Math.round((answered / total) * 100);
  const milestone = Object.entries(MILESTONES).find(([p]) => Math.abs((index / total) * 100 - Number(p)) < 50 / total)?.[1];

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const firstUnanswered = TEST_QUESTIONS.findIndex((x) => !answers[x.id]);

  const choose = useCallback(
    (optionId: string) => {
      const wasAnswered = Boolean(answers[q.id]);
      onAnswer(q.id, optionId);
      window.clearTimeout(timer.current);
      // Automaticky pokračujeme len pri prvej odpovedi – pri oprave nechávame používateľa na mieste.
      if (!wasAnswered && !isLast) timer.current = window.setTimeout(() => onIndex(index + 1), ADVANCE_DELAY);
    },
    [answers, q.id, isLast, index, onAnswer, onIndex],
  );

  const go = useCallback(
    (to: number) => {
      window.clearTimeout(timer.current);
      onIndex(Math.max(0, Math.min(total - 1, to)));
    },
    [onIndex, total],
  );

  // Klávesnica: 1–4 alebo A–D vyberá, šípky listujú.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const pos = ['1', '2', '3', '4'].indexOf(k) >= 0 ? ['1', '2', '3', '4'].indexOf(k) : ['a', 'b', 'c', 'd'].indexOf(k);
      if (pos >= 0 && pos < q.options.length) {
        e.preventDefault();
        choose(q.options[pos].id);
      } else if (e.key === 'ArrowLeft' && index > 0) go(index - 1);
      else if (e.key === 'ArrowRight' && selected && !isLast) go(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, index, selected, isLast, choose, go]);

  const isPair = q.type === 'pair';

  return (
    <div className="mx-auto max-w-3xl">
      {/* Indikátor priebehu */}
      <div className="sticky top-0 z-10 -mx-4 bg-paper/90 px-4 pt-3 pb-4 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pt-0">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-bold text-ink">
            Otázka {index + 1} <span className="font-medium text-faint">z {total}</span>
          </span>
          <span className="font-semibold text-muted" aria-live="polite">
            {milestone ?? `${percent} % hotovo`}
          </span>
        </div>
        <div
          className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answered}
          aria-label="Priebeh testu"
        >
          <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Otázka – key zabezpečí jemnú animáciu pri každej zmene */}
      <div key={q.id} className="animate-rise pt-6 sm:pt-12">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{HINT[q.type]}</p>
        <h2 className="mt-3 font-display text-[26px] leading-snug font-medium tracking-tight text-ink sm:text-[32px]">
          {q.prompt}
        </h2>

        <div className={`mt-7 grid gap-3 ${isPair ? 'sm:grid-cols-2 sm:gap-4' : ''}`} role="radiogroup" aria-label={q.prompt}>
          {q.options.map((o, i) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => choose(o.id)}
                className={`group relative flex w-full items-start gap-4 rounded-2xl border-2 bg-surface text-left transition-all duration-200 ${
                  isPair ? 'p-5 sm:min-h-44 sm:flex-col sm:p-6' : 'p-4 sm:p-5'
                } ${
                  active
                    ? 'border-accent bg-accent-soft shadow-[0_6px_20px_-10px_rgba(84,87,205,0.55)]'
                    : 'border-line hover:-translate-y-0.5 hover:border-[#c9c6ee] hover:shadow-[0_8px_22px_-14px_rgba(29,33,48,0.35)]'
                }`}
              >
                <span
                  className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    active ? 'bg-accent text-white' : 'bg-paper text-muted group-hover:bg-accent-soft group-hover:text-accent'
                  }`}
                  aria-hidden
                >
                  {active ? <Check size={16} strokeWidth={3} /> : 'ABCD'[i]}
                </span>
                <span className={`leading-relaxed text-ink ${isPair ? 'text-[17px] sm:text-lg' : 'text-base sm:text-[17px]'}`}>
                  {o.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigácia */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => go(index - 1)} disabled={index === 0}>
          <ArrowLeft size={18} aria-hidden /> Späť
        </Button>
        {isLast ? (
          <Button onClick={onFinish} disabled={!allAnswered}>
            Vyhodnotiť test <ArrowRight size={18} aria-hidden />
          </Button>
        ) : (
          <Button variant={selected ? 'primary' : 'secondary'} onClick={() => go(index + 1)} disabled={!selected}>
            Pokračovať <ArrowRight size={18} aria-hidden />
          </Button>
        )}
      </div>

      {isLast && !allAnswered && firstUnanswered >= 0 && firstUnanswered !== index && (
        <p className="mt-4 text-right text-sm text-muted">
          Ešte chýba {total - answered === 1 ? 'jedna odpoveď' : `${total - answered} odpovedí`}.{' '}
          <button className="font-semibold text-accent underline-offset-4 hover:underline" onClick={() => go(firstUnanswered)}>
            Prejsť na prvú nezodpovedanú
          </button>
        </p>
      )}

      <p className="mt-10 hidden text-center text-xs text-faint sm:block">
        Tip: odpovedať môžeš aj klávesmi {isPair ? 'A / B' : 'A – D'}, listovať šípkami. Priebeh sa ukladá automaticky.
      </p>
    </div>
  );
}
