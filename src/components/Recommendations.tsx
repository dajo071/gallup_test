import { ArrowLeft, Briefcase, Footprints, Heart, Printer, Sparkles, Wrench } from 'lucide-react';
import { DOMAIN_BY_ID } from '../data/domains';
import { TALENT_BY_ID } from '../data/talents';
import { LEVEL_LABEL, matchSelected, suggestOther, type ActivityMatch, type FitLevel } from '../lib/matching';
import type { ScoringResult } from '../lib/scoring';
import { Button, Card, Eyebrow } from './ui';

const LEVEL_STYLE: Record<FitLevel, { color: string; tint: string }> = {
  silny: { color: '#1a8a79', tint: '#e4f5f2' },
  ciastocny: { color: '#b8741a', tint: '#fbf1e1' },
  nizky: { color: '#6b7080', tint: '#eeeef0' },
};

function TalentChip({ talentId, note }: { talentId: string; note?: string }) {
  const t = TALENT_BY_ID[talentId];
  const d = DOMAIN_BY_ID[t.domain];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: d.tint, color: d.color }}>
      {t.name}
      {note && <span className="font-medium opacity-70">· {note}</span>}
    </span>
  );
}

export function MatchCard({ match, compact = false }: { match: ActivityMatch; compact?: boolean }) {
  const s = LEVEL_STYLE[match.level];
  return (
    <Card className="avoid-break p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-medium tracking-tight">{match.activity.name}</h3>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold" style={{ background: s.tint, color: s.color }}>
          {LEVEL_LABEL[match.level]} · {match.fit} %
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line" aria-hidden>
        <div className="h-full rounded-full" style={{ width: `${match.fit}%`, background: s.color }} />
      </div>

      {(match.matched.length > 0 || match.near.length > 0) && (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-faint">Talenty, ktoré tu uplatníš</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {match.matched.map((m) => (
              <TalentChip key={m.talentId} talentId={m.talentId} note={`${m.rank}. v TOP 5`} />
            ))}
            {match.near.map((m) => (
              <TalentChip key={m.talentId} talentId={m.talentId} note={`${m.rank}. miesto`} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 text-[15px] leading-[1.7] text-ink/90">{match.why}</p>

      {!compact && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold">
              <Briefcase size={16} className="text-accent" aria-hidden /> Kde sa s tým stretneš
            </h4>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {match.activity.roles.map((r) => (
                <li key={r} className="rounded-lg bg-paper px-2.5 py-1.5 text-sm text-ink/85">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold">
              <Footprints size={16} className="text-accent" aria-hidden /> Ako začať
            </h4>
            <ol className="mt-2.5 space-y-2">
              {match.activity.start.map((st, i) => (
                <li key={st} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                    {i + 1}
                  </span>
                  {st}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Card>
  );
}

/** Tri veci, ktoré aplikácia zámerne nezamieňa. */
export function ThreeLenses() {
  const items = [
    { icon: Sparkles, title: 'Prirodzený talent', text: 'To, čo ti ide ľahko a dodáva energiu. Toto meral test.' },
    { icon: Heart, title: 'Osobný záujem', text: 'To, čo ťa láka. Toto si označil výberom činností.' },
    { icon: Wrench, title: 'Schopnosti a skúsenosti', text: 'To, čo už vieš a máš odskúšané. Toto vieš posúdiť len ty.' },
  ];
  return (
    <Card className="avoid-break p-5 sm:p-7">
      <h3 className="text-base font-bold">Ako odporúčania čítať</h3>
      <div className="mt-4 grid gap-5 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <p className="flex items-center gap-2 text-sm font-bold">
              <Icon size={16} className="text-accent" aria-hidden /> {title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Najlepšie sa darí tam, kde sa všetky tri stretnú. Miera súladu nižšie hovorí len o prvej z nich – nie je to verdikt,
        akú prácu máš robiť. Aj činnosť s nízkym súladom sa dá naučiť; len ťa pravdepodobne bude stáť viac energie.
      </p>
    </Card>
  );
}

/** Zoznam odporúčaní – používa sa na obrazovke aj v tlačovom výstupe. */
export function RecommendationList({ result, selected }: { result: ScoringResult; selected: string[] }) {
  const matches = matchSelected(selected, result);
  const others = suggestOther(selected, result);
  return (
    <div className="space-y-5">
      <ThreeLenses />
      {matches.map((m) => (
        <MatchCard key={m.activity.id} match={m} />
      ))}
      {others.length > 0 && (
        <div className="pt-6">
          <h3 className="font-display text-2xl font-medium tracking-tight">Možno si nezvážil</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Tieto činnosti si si nevybral, no silno sa opierajú o tvoje talenty. Či ťa aj bavia, vieš posúdiť len ty.
          </p>
          <div className="mt-4 space-y-5">
            {others.map((m) => (
              <MatchCard key={m.activity.id} match={m} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  result: ScoringResult;
  selected: string[];
  onBack: () => void;
  onResults: () => void;
}

export function Recommendations({ result, selected, onBack, onResults }: Props) {
  return (
    <div className="mx-auto max-w-4xl animate-rise">
      <Eyebrow>Krok 2 z 2 · Odporúčania</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">Kde môžeš svoje talenty využiť</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
        Vybrané činnosti sme porovnali s tvojimi najsilnejšími talentmi. Sú zoradené od najvyššieho súladu.
      </p>

      <div className="mt-8">
        <RecommendationList result={result} selected={selected} />
      </div>

      <div className="no-print mt-10 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden /> Upraviť výber činností
        </Button>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={onResults}>
            Späť na moje talenty
          </Button>
          <Button onClick={() => window.print()}>
            <Printer size={18} aria-hidden /> Vytlačiť / uložiť PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
