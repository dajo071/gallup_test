import { ArrowRight, Printer, RotateCcw } from 'lucide-react';
import { TALENT_BY_ID } from '../data/talents';
import { buildProfile } from '../lib/profile';
import type { ScoringResult } from '../lib/scoring';
import { DomainChart, FullRanking } from './DomainChart';
import { RecommendationList } from './Recommendations';
import { TalentCard } from './TalentCard';
import { Button, Card, Disclaimer, DomainBadge, Eyebrow } from './ui';

interface Props {
  result: ScoringResult;
  name: string;
  completedAt: string | null;
  selectedActivities: string[];
  onActivities: () => void;
  onRestart: () => void;
}

const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} a ${items[items.length - 1]}`);

export function Results({ result, name, completedAt, selectedActivities, onActivities, onRestart }: Props) {
  const profile = buildProfile(result);
  const date = completedAt ? new Date(completedAt).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  const trimmed = name.trim();

  return (
    <div className="mx-auto max-w-4xl animate-rise">
      <header>
        <Eyebrow>Tvoje výsledky{date ? ` · ${date}` : ''}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
          {trimmed ? `${trimmed}, toto je tvojich päť najsilnejších talentov` : 'Tvojich päť najsilnejších talentov'}
        </h1>

        {/* Rýchly prehľad TOP 5 */}
        <ol className="mt-7 grid gap-2.5 sm:grid-cols-5">
          {result.top5.map((r) => {
            const t = TALENT_BY_ID[r.talentId];
            return (
              <li key={r.talentId}>
                <a href={`#karta-${t.id}`} className="flex h-full items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 transition-colors hover:border-[#cfcabd] sm:flex-col sm:items-start sm:gap-2">
                  <span className="font-display text-2xl font-semibold text-faint">{r.rank}</span>
                  <span className="text-[15px] leading-tight font-bold text-ink">{t.name}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </header>

      {/* Osobný profil */}
      <Card className="avoid-break mt-8 p-6 sm:p-8">
        <Eyebrow>Tvoj profil</Eyebrow>
        <h2 className="mt-2 font-display text-[28px] font-medium tracking-tight">{profile.headline}</h2>
        <div className="mt-4 space-y-3.5">
          {profile.paragraphs.map((p) => (
            <p key={p} className="text-[16px] leading-[1.75] text-ink/90">
              {p}
            </p>
          ))}
        </div>
      </Card>

      {/* TOP 5 */}
      <section className="mt-10 space-y-5">
        {result.top5.map((r, i) => (
          <div key={r.talentId} id={`karta-${r.talentId}`} className="scroll-mt-6">
            <TalentCard score={r} defaultOpen={i === 0} />
          </div>
        ))}
      </section>

      {result.tiedWithFifth.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-ink">Tesne za TOP 5:</strong>{' '}
          {list(result.tiedWithFifth.map((r) => TALENT_BY_ID[r.talentId].name))} –{' '}
          {result.tiedWithFifth.length > 1 ? 'majú' : 'má'} rovnakú silu ako tvoj piaty talent; o poradí rozhodlo doplnkové
          kritérium (počet zvolení a konzistentnosť naprieč typmi otázok).
        </p>
      )}

      {/* Ďalšie silné talenty */}
      <Card className="avoid-break mt-8 p-5 sm:p-7">
        <h3 className="font-display text-2xl font-medium tracking-tight">Hneď za prvou päticou</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Talenty na 6. – 10. mieste. Hranica medzi piatym a šiestym miestom nie je ostrá – ak sa v niektorom z nich spoznávaš
          viac, dôveruj aj vlastnej skúsenosti.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.next5.map((r) => {
            const t = TALENT_BY_ID[r.talentId];
            return (
              <li key={r.talentId} className="rounded-2xl bg-paper p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-faint">{r.rank}.</span>
                  <span className="font-bold text-ink">{t.name}</span>
                  <DomainBadge domain={t.domain} />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.tagline}</p>
              </li>
            );
          })}
        </ul>
      </Card>

      <div className="mt-5 space-y-5">
        <DomainChart result={result} />
        <FullRanking result={result} />
      </div>

      {/* Výzva na pokračovanie */}
      <Card className="no-print mt-10 overflow-hidden bg-ink! p-7 text-white sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">Ďalší krok</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">Kde môžem svoje talenty využiť?</h2>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/75">
          Vyber si činnosti, ktoré ťa lákajú, a zisti, ako sa stretávajú s tvojimi talentmi – vrátane konkrétnych oblastí a
          prvých krokov.
        </p>
        <button
          type="button"
          onClick={onActivities}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
        >
          {selectedActivities.length > 0 ? 'Upraviť výber činností' : 'Vybrať činnosti'} <ArrowRight size={18} aria-hidden />
        </button>
      </Card>

      <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw size={17} aria-hidden /> Absolvovať test odznova
        </Button>
        <Button variant="secondary" onClick={() => window.print()}>
          <Printer size={18} aria-hidden /> Vytlačiť / uložiť PDF
        </Button>
      </div>

      {/* Do tlače pridáme aj odporúčania, ak si ich používateľ už vybral */}
      {selectedActivities.length > 0 && (
        <section className="print-only page-break">
          <h2 className="mb-5 font-display text-3xl font-medium">Kde môžeš svoje talenty využiť</h2>
          <RecommendationList result={result} selected={selectedActivities} />
        </section>
      )}

      <Disclaimer className="mt-10" />
    </div>
  );
}
