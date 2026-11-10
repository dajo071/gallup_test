import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ACTIVITIES, ACTIVITY_CATEGORIES } from '../data/activities';
import { Button, Eyebrow } from './ui';

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
  onBack: () => void;
  onContinue: () => void;
}

/** Krok 1: výber činností, ktoré používateľa zaujímajú. Súlad s talentmi sa tu zámerne NEzobrazuje. */
export function Activities({ selected, onToggle, onClear, onBack, onContinue }: Props) {
  const set = new Set(selected);
  const n = selected.length;

  return (
    <div className="mx-auto max-w-4xl animate-rise pb-28">
      <Eyebrow>Krok 1 z 2 · Tvoje záujmy</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">Čo ťa láka robiť?</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
        Označ činnosti, ktoré ťa zaujímajú alebo ktoré by si chcel skúsiť – bez ohľadu na to, či ich už vieš. Talent a záujem
        nie sú to isté, preto sa najprv pýtame na záujem a až potom ho porovnáme s tvojimi talentmi.
      </p>

      <div className="mt-9 space-y-9">
        {ACTIVITY_CATEGORIES.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-faint">{cat.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {ACTIVITIES.filter((a) => a.category === cat.id).map((a) => {
                const active = set.has(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(a.id)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
                      active
                        ? 'border-accent bg-accent text-white shadow-[0_6px_16px_-8px_rgba(84,87,205,0.7)]'
                        : 'border-line bg-surface text-ink hover:border-[#c9c6ee]'
                    }`}
                  >
                    {active && <Check size={16} strokeWidth={3} aria-hidden />}
                    {a.name}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Spodná lišta s počtom vybraných */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" onClick={onBack} className="px-3">
            <ArrowLeft size={18} aria-hidden /> <span className="hidden sm:inline">Moje talenty</span>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted" aria-live="polite">
              {n === 0 ? 'Vyber aspoň jednu' : `Vybrané: ${n}`}
              {n > 0 && (
                <button onClick={onClear} className="ml-2 font-semibold text-ink underline-offset-4 hover:underline">
                  zrušiť
                </button>
              )}
            </span>
            <Button onClick={onContinue} disabled={n === 0}>
              Zobraziť odporúčania <ArrowRight size={18} aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
