import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { DOMAINS, DOMAIN_BY_ID } from '../data/domains';
import { TALENT_BY_ID } from '../data/talents';
import type { ScoringResult } from '../lib/scoring';
import { Card, DomainIcon } from './ui';

/** Grafické znázornenie štyroch domén: podiel na zvolených odpovediach + počet talentov v TOP 5. */
export function DomainChart({ result }: { result: ScoringResult }) {
  const max = Math.max(...result.domains.map((d) => d.share), 1);
  return (
    <Card className="avoid-break p-5 sm:p-7">
      <h3 className="font-display text-2xl font-medium tracking-tight">Tvoje štyri domény</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        Ako sa tvoje odpovede rozdelili medzi domény. Náhodné odpovede by dali každej doméne 25 %.
      </p>

      {/* Skladaný pruh – celok 100 % */}
      <div className="mt-6 flex h-4 gap-0.5 overflow-hidden rounded-full" role="img" aria-label="Rozdelenie odpovedí medzi domény">
        {result.domains.map((d) => (
          <div key={d.domain} style={{ width: `${d.share}%`, background: DOMAIN_BY_ID[d.domain].color }} title={`${DOMAIN_BY_ID[d.domain].name}: ${d.share} %`} />
        ))}
      </div>

      <ul className="mt-6 space-y-4">
        {result.domains.map((d) => {
          const meta = DOMAIN_BY_ID[d.domain];
          return (
            <li key={d.domain}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[15px] font-bold" style={{ color: meta.color }}>
                  <DomainIcon domain={d.domain} size={16} />
                  {meta.name}
                </span>
                <span className="text-sm text-muted">
                  {d.topCount > 0 && (
                    <span className="mr-2 font-semibold text-ink">
                      {d.topCount} {d.topCount === 1 ? 'talent' : d.topCount < 5 ? 'talenty' : 'talentov'} v TOP 5
                    </span>
                  )}
                  <span className="font-bold tabular-nums text-ink">{d.share} %</span>
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full" style={{ background: meta.tint }}>
                <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(d.share / max) * 100}%`, background: meta.color }} />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/** Rebríček všetkých talentov – relatívna sila. */
export function FullRanking({ result }: { result: ScoringResult }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="no-print flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"
      >
        <span>
          <span className="block font-display text-2xl font-medium tracking-tight">Rebríček všetkých {result.ranking.length} talentov</span>
          <span className="mt-1 block text-sm text-muted">Relatívna sila každého talentu podľa tvojich odpovedí.</span>
        </span>
        <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div className="collapsible border-t border-line p-5 sm:p-7" style={{ display: open ? 'block' : 'none' }}>
        <h3 className="print-only mb-4 font-display text-2xl font-medium">Rebríček všetkých talentov</h3>
        <ol className="grid gap-x-10 gap-y-2.5 md:grid-cols-2">
          {result.ranking.map((r) => {
            const t = TALENT_BY_ID[r.talentId];
            const d = DOMAIN_BY_ID[t.domain];
            return (
              <li key={r.talentId} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-right font-semibold tabular-nums text-faint">{r.rank}.</span>
                <span className={`w-32 shrink-0 truncate ${r.rank <= 5 ? 'font-bold text-ink' : 'text-ink/80'}`}>{t.name}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="block h-full rounded-full" style={{ width: `${r.percent}%`, background: d.color, opacity: r.rank <= 5 ? 1 : 0.55 }} />
                </span>
                <span className="w-10 text-right tabular-nums text-muted">{r.percent} %</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {DOMAINS.map((d) => (
            <span key={d.id} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: d.color }} /> {d.name}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-faint">
          Relatívna sila vyjadruje, ako často by talent „zvíťazil“ nad priemerným talentom, so zohľadnením toho, s akými
          talentmi bol v otázkach porovnávaný (50 % = priemer). Talenty na konci rebríčka nie sú slabiny – len ti sú menej
          prirodzené než tie na začiatku.
        </p>
      </div>
    </Card>
  );
}
