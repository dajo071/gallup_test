/** Spoločné typy dátového modelu. Dáta sú zámerne oddelené od logiky aj od UI. */

export type DomainId = 'myslenie' | 'realizacia' | 'vplyv' | 'vztahy';

export interface Domain {
  id: DomainId;
  name: string;
  short: string;
  description: string;
  /** Hlavná farba domény (text, grafy). */
  color: string;
  /** Jemné pozadie domény. */
  tint: string;
}

export interface Talent {
  id: string;
  name: string;
  domain: DomainId;
  /** Krátka charakteristika (jedna veta). */
  tagline: string;
  /** Slovesná fráza v 2. osobe – používa sa pri skladaní osobného profilu. */
  essence: string;
  /** Menná fráza – čím talent prispieva pri činnosti (používa sa v odporúčaniach). */
  contribution: string;
  /** Podrobný opis. */
  description: string;
  /** Typické prejavy v každodennom živote. */
  daily: string[];
  /** Prejavy v pracovnom prostredí. */
  work: string[];
  /** Činnosti, pri ktorých sa talent najlepšie uplatňuje. */
  activities: string[];
  /** Situácie, v ktorých je talent výhodou. */
  advantages: string[];
  /** Riziká pri nadmernom využívaní. */
  risks: string[];
  /** Odporúčania na rozvoj. */
  develop: string[];
  /** Konkrétne príklady využitia. */
  examples: string[];
}

/** pair = nútená voľba z dvoch výrokov, situation = situačná otázka, energy = otázka o prirodzenej energii */
export type QuestionType = 'pair' | 'situation' | 'energy';

export interface QuestionOption {
  id: string;
  text: string;
  /** Talent, ktorému odpoveď pripíše body. Používateľovi sa nikdy nezobrazuje. */
  talent: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  /** core = súčasť testu, reserve = záložná položka banky (napr. pre paralelnú formu testu). */
  form: 'core' | 'reserve';
  prompt: string;
  options: QuestionOption[];
}

export type ActivityCategoryId = 'analyticke' | 'kreativne' | 'organizacne' | 'komunikacne' | 'vztahove';

export interface ActivityCategory {
  id: ActivityCategoryId;
  name: string;
}

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategoryId;
  /** Talenty, ktoré sa pri činnosti uplatnia, s váhou 3 = kľúčový, 2 = silný, 1 = podporný. */
  talents: Record<string, 1 | 2 | 3>;
  /** Pracovné pozície alebo oblasti, kde sa činnosť vyskytuje. */
  roles: string[];
  /** Konkrétne prvé kroky. */
  start: string[];
}

/** Odpovede: id otázky → id zvolenej možnosti. */
export type Answers = Record<string, string>;
