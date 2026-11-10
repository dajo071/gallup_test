import type { Talent } from '../types';
import { MYSLENIE } from './myslenie';
import { REALIZACIA } from './realizacia';
import { VPLYV } from './vplyv';
import { VZTAHY } from './vztahy';

/**
 * Databáza talentov (28 talentov, 7 v každej zo 4 domén).
 * Poradie v tomto poli je zároveň „kanonické poradie“ – posledné, čisto
 * technické kritérium pri úplnej zhode skóre (pozri src/lib/scoring.ts).
 */
export const TALENTS: Talent[] = [...MYSLENIE, ...REALIZACIA, ...VPLYV, ...VZTAHY];

export const TALENT_BY_ID: Record<string, Talent> = Object.fromEntries(TALENTS.map((t) => [t.id, t]));
