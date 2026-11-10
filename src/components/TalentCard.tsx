import { AlertTriangle, Briefcase, ChevronDown, Compass, Home, Lightbulb, Sprout, Zap } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { DOMAIN_BY_ID } from '../data/domains';
import { TALENT_BY_ID } from '../data/talents';
import type { TalentScore } from '../lib/scoring';
import { Card, DomainBadge } from './ui';

const FORMATS_LABEL = ['', 'v 1 z 3 typov otázok', 'v 2 z 3 typov otázok', 'vo všetkých 3 typoch otázok'];

function Section({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div className="avoid-break">
      <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
        {icon}
        {title}
      </h4>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-current opacity-40" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TalentCard({ score, defaultOpen = false }: { score: TalentScore; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const t = TALENT_BY_ID[score.talentId];
  const d = DOMAIN_BY_ID[t.domain];
  const panelId = `talent-${t.id}`;

  return (
    <Card className="avoid-break overflow-hidden">
      <div className="flex gap-4 p-5 sm:gap-6 sm:p-7">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-semibold sm:size-14 sm:text-[28px]"
          style={{ background: d.tint, color: d.color }}
          aria-label={`${score.rank}. miesto`}
        >
          {score.rank}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-[28px]">{t.name}</h3>
            <DomainBadge domain={t.domain} />
          </div>
          <p className="mt-2 text-[16px] leading-relaxed text-ink/85">{t.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
              <div className="h-full rounded-full" style={{ width: `${score.percent}%`, background: d.color }} />
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color: d.color }}>
              {score.percent} %
            </span>
          </div>
          <p className="mt-1.5 text-xs text-faint">
            Relatívna sila · zvolené v {score.chosen} z {score.opportunities} otázok, {FORMATS_LABEL[score.formats]}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="no-print flex w-full items-center justify-between border-t border-line px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper sm:px-7"
      >
        {open ? 'Skryť detail' : 'Zobraziť detail talentu'}
        <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      <div id={panelId} className="collapsible border-t border-line" style={{ display: open ? 'block' : 'none' }}>
        <div className="animate-fade space-y-7 p-5 sm:p-7">
          <p className="text-[16px] leading-[1.75] text-ink/90">{t.description}</p>
          <div className="grid gap-7 md:grid-cols-2">
            <Section icon={<Home size={16} style={{ color: d.color }} />} title="V každodennom živote" items={t.daily} />
            <Section icon={<Briefcase size={16} style={{ color: d.color }} />} title="V práci a pri štúdiu" items={t.work} />
            <Section icon={<Compass size={16} style={{ color: d.color }} />} title="Kde sa uplatníš" items={t.activities} />
            <Section icon={<Zap size={16} style={{ color: d.color }} />} title="Kedy je tvojou výhodou" items={t.advantages} />
            <Section icon={<AlertTriangle size={16} className="text-[#b45309]" />} title="Riziká, keď to preženieš" items={t.risks} />
            <Section icon={<Sprout size={16} style={{ color: d.color }} />} title="Ako talent rozvíjať" items={t.develop} />
          </div>
          <div className="rounded-2xl p-5" style={{ background: d.tint }}>
            <Section icon={<Lightbulb size={16} style={{ color: d.color }} />} title="Vyskúšaj hneď" items={t.examples} />
          </div>
        </div>
      </div>
    </Card>
  );
}
