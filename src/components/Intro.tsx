import { ArrowRight, Clock, Compass, ListChecks, Lock, Sparkles } from 'lucide-react';
import { DOMAINS } from '../data/domains';
import { TEST_QUESTIONS } from '../data/questions';
import { TALENTS } from '../data/talents';
import { Button, Card, Disclaimer, DomainIcon, Eyebrow } from './ui';

interface Props {
  name: string;
  answered: number;
  onName: (name: string) => void;
  onStart: () => void;
  onRestart: () => void;
}

const GAINS = [
  { icon: Sparkles, title: 'Tvojich TOP 5 talentov', text: 'Päť najvýraznejších talentov v poradí, s podrobným opisom každého z nich.' },
  { icon: Compass, title: 'Kde ich využiť', text: 'Prepojenie talentov s činnosťami, ktoré ťa zaujímajú, a konkrétne prvé kroky.' },
  { icon: ListChecks, title: 'Riziká aj rozvoj', text: 'Čo hrozí, keď talent preženieš, a ako ho ďalej rozvíjať.' },
];

const STEPS = [
  'Vyberáš z dvoch alebo štyroch možností tú, ktorá je ti bližšia. Neexistujú správne ani nesprávne odpovede.',
  'Odpovedaj podľa toho, aký naozaj si – nie aký by si chcel byť alebo čo sa od teba čaká.',
  'Priebeh sa ukladá automaticky. Test môžeš prerušiť a neskôr pokračovať.',
];

export function Intro({ name, answered, onName, onStart, onRestart }: Props) {
  const total = TEST_QUESTIONS.length;
  const minutes = Math.round((total * 12) / 60);
  const inProgress = answered > 0 && answered < total;

  return (
    <div className="animate-rise">
      <section className="mx-auto max-w-3xl pt-6 text-center sm:pt-14">
        <Eyebrow>Test prirodzených talentov</Eyebrow>
        <h1 className="mt-4 font-display text-[40px] leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl">
          Objav, v čom si <em className="text-accent">prirodzene</em> silný.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Každý z nás má jedinečnú kombináciu schopností, spôsobov myslenia a prirodzených preferencií. Niektorí ľudia
          vynikajú v analýze, iní v komunikácii, organizovaní, tvorivosti alebo budovaní vzťahov.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-[17px] leading-relaxed text-ink">
          Zisti, ktoré talenty sú tvoje najsilnejšie a ako ich môžeš využiť v práci aj osobnom živote.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-ink">
          <span className="inline-flex items-center gap-2">
            <Clock size={16} className="text-accent" aria-hidden /> približne {minutes} minút
          </span>
          <span className="inline-flex items-center gap-2">
            <ListChecks size={16} className="text-accent" aria-hidden /> {total} otázok
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock size={16} className="text-accent" aria-hidden /> bez registrácie
          </span>
        </div>

        <Card className="mx-auto mt-9 max-w-md p-5 text-left sm:p-6">
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Ako ťa máme oslovovať? <span className="font-normal text-faint">(nepovinné)</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            maxLength={40}
            autoComplete="off"
            placeholder="Meno alebo prezývka"
            onChange={(e) => onName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onStart()}
            className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          />
          <Button className="mt-4 w-full py-3.5 text-base" onClick={onStart}>
            {inProgress ? `Pokračovať v teste (${answered}/${total})` : 'Objaviť moje talenty'}
            <ArrowRight size={18} aria-hidden />
          </Button>
          {inProgress && (
            <button onClick={onRestart} className="mt-3 w-full text-center text-sm font-medium text-muted underline-offset-4 hover:underline">
              Začať odznova
            </button>
          )}
          <p className="mt-3 text-center text-xs leading-relaxed text-faint">
            Meno aj odpovede zostávajú len v tvojom prehliadači. Nič sa nikam neodosiela.
          </p>
        </Card>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {GAINS.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon size={20} aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </Card>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight">Ako test prebieha</h2>
          <ol className="mt-5 space-y-4">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-muted">{s}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight">
            {TALENTS.length} talentov v štyroch doménach
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {DOMAINS.map((d) => (
              <li key={d.id} className="rounded-2xl p-4" style={{ background: d.tint }}>
                <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: d.color }}>
                  <DomainIcon domain={d.id} size={16} /> {d.name}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Disclaimer className="mx-auto mt-14 max-w-3xl text-center" />
    </div>
  );
}
