import { Brain, HeartHandshake, Megaphone, Target } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { DOMAIN_BY_ID } from '../data/domains';
import type { DomainId } from '../data/types';

/** Malé zdieľané stavebné prvky rozhrania. */

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-[#2b3147] disabled:bg-[#c9c7c1] disabled:text-white shadow-sm',
  secondary: 'bg-surface text-ink border border-line hover:border-[#cfcabd] disabled:text-faint',
  ghost: 'text-muted hover:text-ink hover:bg-black/5 disabled:text-[#c0c0c0] disabled:hover:bg-transparent',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`card rounded-3xl border border-line bg-surface shadow-[0_1px_2px_rgba(29,33,48,0.04),0_8px_24px_-12px_rgba(29,33,48,0.08)] ${className}`}>
      {children}
    </div>
  );
}

const DOMAIN_ICONS = { myslenie: Brain, realizacia: Target, vplyv: Megaphone, vztahy: HeartHandshake };

export function DomainIcon({ domain, size = 18 }: { domain: DomainId; size?: number }) {
  const Icon = DOMAIN_ICONS[domain];
  return <Icon size={size} strokeWidth={2} aria-hidden />;
}

export function DomainBadge({ domain }: { domain: DomainId }) {
  const d = DOMAIN_BY_ID[domain];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: d.tint, color: d.color }}
    >
      <DomainIcon domain={domain} size={13} />
      {d.name}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{children}</p>;
}

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-muted ${className}`}>
      <strong className="font-semibold text-ink">Dôležité:</strong> výsledky sú orientačné sebahodnotenie, nie klinická
      diagnóza ani psychometricky validovaný test. Metodika je pôvodná a jej spoľahlivosť treba ešte overiť pilotným
      testovaním a psychometrickou analýzou. Aplikácia nie je spojená so spoločnosťou Gallup ani s testom
      CliftonStrengths.
    </p>
  );
}
