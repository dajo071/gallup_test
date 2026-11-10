import type { Domain, DomainId } from './types';

export const DOMAINS: Domain[] = [
  {
    id: 'myslenie',
    name: 'Strategické myslenie',
    short: 'Myslenie',
    description: 'Ako pracuješ s informáciami, nápadmi a budúcnosťou.',
    color: '#5457cd',
    tint: '#eeeefb',
  },
  {
    id: 'realizacia',
    name: 'Realizácia',
    short: 'Realizácia',
    description: 'Ako meníš zámery na hotové výsledky.',
    color: '#b8741a',
    tint: '#fbf1e1',
  },
  {
    id: 'vplyv',
    name: 'Vplyv',
    short: 'Vplyv',
    description: 'Ako komunikuješ, presadzuješ myšlienky a hýbeš ľuďmi.',
    color: '#c8456b',
    tint: '#fbebf0',
  },
  {
    id: 'vztahy',
    name: 'Vzťahy',
    short: 'Vzťahy',
    description: 'Ako rozumieš ľuďom, spolupracuješ a buduješ dôveru.',
    color: '#1a8a79',
    tint: '#e4f5f2',
  },
];

export const DOMAIN_BY_ID = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<DomainId, Domain>;
