import { DOMAIN_BY_ID } from '../data/domains';
import { TALENT_BY_ID } from '../data/talents';
import type { DomainId } from '../data/types';
import type { ScoringResult } from './scoring';

/**
 * INTERPRETÁCIA VÝSLEDKOV
 * Osobný profil sa skladá výlučne z reálneho výsledku: z poradia TOP 5,
 * z rozloženia domén a z kombinácie dvoch najsilnejších talentov.
 * Rovnaký výsledok dá vždy rovnaký text.
 */

const DOMAIN_STYLE: Record<DomainId, string> = {
  myslenie: 'Do situácií vstupuješ najprv hlavou – potrebuješ veciam rozumieť, vidieť súvislosti a mať premyslené, kam smeruješ.',
  realizacia: 'Si človek činu – najlepšie sa cítiš, keď sa veci hýbu, majú poriadok a dotiahnu sa do konca.',
  vplyv: 'Tvojou prirodzenou silou je pôsobiť na druhých – vieš sa ozvať, presadiť myšlienku a rozhýbať ľudí.',
  vztahy: 'Svet vnímaš cez ľudí – záleží ti na dôvere, porozumení a na tom, aby sa veci robili spolu.',
};

/** Čo znamená spojenie dvoch domén (kľúč = abecedne zoradená dvojica). */
const COMBO: Record<string, string> = {
  'myslenie+myslenie': 'Oba tvoje najsilnejšie talenty sú myšlienkové: najväčšiu hodnotu prinášaš tam, kde treba veci dobre premyslieť skôr, než sa začne konať.',
  'myslenie+realizacia': 'Spojenie premýšľania a realizácie znamená, že tvoje úvahy nezostávajú na papieri – vieš ich premeniť na konkrétnu prácu.',
  'myslenie+vplyv': 'Spojenie premýšľania a vplyvu znamená, že vieš nielen prísť na dobrú myšlienku, ale aj získať pre ňu ostatných.',
  'myslenie+vztahy': 'Spojenie premýšľania a vzťahov znamená, že k problémom pristupuješ s rozvahou a zároveň s citom pre ľudí, ktorých sa týkajú.',
  'realizacia+realizacia': 'Oba tvoje najsilnejšie talenty sú realizačné: si ten, na koho sa dá spoľahnúť, keď sa má niečo naozaj urobiť.',
  'realizacia+vplyv': 'Spojenie realizácie a vplyvu znamená, že vieš potiahnuť nielen prácu, ale aj ľudí okolo nej.',
  'realizacia+vztahy': 'Spojenie realizácie a vzťahov znamená, že výsledky dosahuješ tak, že pritom ľudí nestrácaš, ale získavaš.',
  'vplyv+vplyv': 'Oba tvoje najsilnejšie talenty sú vplyvové: tvojím živlom sú situácie, v ktorých treba prehovoriť, rozhodnúť alebo strhnúť ostatných.',
  'vplyv+vztahy': 'Spojenie vplyvu a vzťahov znamená, že ľudí vieš viesť a zároveň im rozumieť – pôsobíš presvedčivo a pritom ľudsky.',
  'vztahy+vztahy': 'Oba tvoje najsilnejšie talenty sú vzťahové: tvojou najväčšou hodnotou je to, čo dokážeš vytvoriť medzi ľuďmi.',
};

const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} a ${items[items.length - 1]}`;

export interface Profile {
  headline: string;
  paragraphs: string[];
}

export function buildProfile(result: ScoringResult): Profile {
  const top = result.top5.map((r) => TALENT_BY_ID[r.talentId]);
  const [t1, t2, ...rest] = top;

  const byDomain = [...result.domains].sort((a, b) => b.topCount - a.topCount || b.points - a.points);
  const lead = byDomain[0];
  const present = byDomain.filter((d) => d.topCount > 0);
  const missing = byDomain.filter((d) => d.topCount === 0);
  const leadName = DOMAIN_BY_ID[lead.domain].name;

  let headline: string;
  let shape: string;
  if (lead.topCount >= 4) {
    headline = `Vyhranený profil: ${leadName}`;
    shape = `Tvoj profil je výrazne vyhranený – ${lead.topCount === 5 ? 'všetkých päť' : 'štyri z piatich'} najsilnejších talentov patrí do domény ${leadName}. ${DOMAIN_STYLE[lead.domain]}`;
  } else if (lead.topCount === 3) {
    const others = present.slice(1).map((d) => DOMAIN_BY_ID[d.domain].name);
    headline = `Ťažisko: ${leadName}`;
    shape = `Ťažisko tvojho profilu leží v doméne ${leadName} (tri z piatich talentov), ${others.length > 1 ? 'dopĺňajú ho domény' : 'dopĺňa ho doména'} ${list(others)}. ${DOMAIN_STYLE[lead.domain]}`;
  } else {
    const names = present.map((d) => DOMAIN_BY_ID[d.domain].name);
    headline = present.length === 4 ? 'Všestranný profil' : 'Pestrý profil';
    shape = `Tvoj profil je pestrý – päť najsilnejších talentov sa delí medzi ${present.length === 4 ? 'všetky štyri domény' : `domény ${list(names)}`}. Vieš sa preto pohybovať vo viacerých typoch situácií, najprirodzenejšie však v tej, ktorú určujú tvoje prvé dva talenty.`;
  }

  const leadPair = `Na čele tvojho profilu stojí talent ${t1.name}: ${t1.essence}. Hneď za ním nasleduje ${t2.name} – ${t2.essence}. ${COMBO[[t1.domain, t2.domain].sort().join('+')]}`;

  const restText = `Profil dotvárajú talenty ${list(rest.map((t) => `${t.name} (${t.essence})`))}.`;

  const paragraphs = [shape, leadPair, restText];

  if (missing.length > 0 && lead.topCount < 5) {
    const names = missing.map((d) => DOMAIN_BY_ID[d.domain].name);
    paragraphs.push(
      `Medzi piatimi najsilnejšími talentmi sa ${names.length > 1 ? 'neobjavili domény' : 'neobjavila doména'} ${list(names)}. Neznamená to slabinu ani neschopnosť – iba to, že tieto činnosti ti pravdepodobne berú viac energie, než ti dávajú. Pri úlohách tohto typu sa oplatí oprieť o ľudí, ktorým sú prirodzené.`,
    );
  } else if (lead.topCount === 5) {
    paragraphs.push(
      'Takto sústredený profil je veľká sila, no aj dôvod hľadať spolupracovníkov s talentmi z ostatných domén – dopĺňajú to, čo tebe prirodzene nejde.',
    );
  }

  if (result.differentiation === 'vyrovnany') {
    paragraphs.push(
      'Tvoje odpovede boli pomerne vyrovnané – rozdiely medzi talentmi sú malé a poradie preto ber s väčšou rezervou. Môže to znamenať všestrannosť, ale aj to, že si pri viacerých otázkach váhal.',
    );
  }

  return { headline, paragraphs };
}
