import type { Activity, ActivityCategory } from './types';

/**
 * Databáza činností. Každá činnosť má priradené talenty, ktoré sa pri nej
 * uplatnia: 3 = kľúčový, 2 = silný, 1 = podporný. Z týchto váh sa počíta
 * miera súladu (src/lib/matching.ts).
 */

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  { id: 'analyticke', name: 'Analytické a strategické činnosti' },
  { id: 'kreativne', name: 'Kreatívne činnosti' },
  { id: 'organizacne', name: 'Organizačné a realizačné činnosti' },
  { id: 'komunikacne', name: 'Komunikačné a vplyvové činnosti' },
  { id: 'vztahove', name: 'Vzťahové a pomáhajúce činnosti' },
];

export const ACTIVITIES: Activity[] = [
  /* ---------------- Analytické a strategické ---------------- */
  {
    id: 'analyza-dat',
    name: 'Analyzovanie dát',
    category: 'analyticke',
    talents: { analytik: 3, posudzovatel: 2, detailista: 2, syntetik: 1, objavitel: 1 },
    roles: ['Dátový analytik', 'Kontroling a reporting', 'Prieskum trhu', 'Analytik v športe, zdravotníctve či verejnej správe'],
    start: [
      'Zober si vlastné údaje (výdavky, čas, tréningy) a nájdi v nich tri zistenia.',
      'Nauč sa základy tabuliek – kontingenčné tabuľky a grafy stačia na veľa.',
      'Vyskúšaj voľne dostupné dáta, napríklad zo štatistického úradu, a odpovedz si na jednu vlastnú otázku.',
    ],
  },
  {
    id: 'komplexne-problemy',
    name: 'Riešenie komplexných problémov',
    category: 'analyticke',
    talents: { analytik: 3, syntetik: 2, strateg: 2, vytrvalec: 2, novator: 1 },
    roles: ['Konzultant', 'Inžinier a technológ', 'Vývojár softvéru', 'Procesný špecialista'],
    start: [
      'Vyber si problém, ktorý vo svojom okolí dlho nikto nevyriešil, a rozkresli si jeho príčiny.',
      'Trénuj na prípadových štúdiách, logických úlohách alebo súťažiach.',
      'Pri každom riešení si zapíš, ako si postupoval – buduješ si vlastnú metódu.',
    ],
  },
  {
    id: 'strategie',
    name: 'Vytváranie stratégií',
    category: 'analyticke',
    talents: { strateg: 3, vizionar: 2, syntetik: 2, posudzovatel: 1, rozhodny: 1 },
    roles: ['Strategické plánovanie', 'Rozvoj obchodu', 'Produktový manažér', 'Vedenie organizácie či neziskovky'],
    start: [
      'Napíš jednostranovú stratégiu pre niečo vlastné – klub, projekt, osobný cieľ.',
      'Pri firmách, ktoré poznáš, skús pomenovať, na čom stavajú a čoho sa vzdali.',
      'Ponúkni sa, že pripravíš varianty postupu pre najbližšie rozhodnutie v tíme.',
    ],
  },
  {
    id: 'vyskum',
    name: 'Výskum a získavanie informácií',
    category: 'analyticke',
    talents: { objavitel: 3, analytik: 2, vytrvalec: 1, detailista: 1, syntetik: 1 },
    roles: ['Výskumník', 'Novinár a rešeršista', 'Analytik trhu', 'Používateľský výskum'],
    start: [
      'Vyber si otázku, ktorá ťa zaujíma, a spracuj k nej prehľad z piatich kvalitných zdrojov.',
      'Nauč sa overovať zdroje a rozlišovať fakt od názoru.',
      'Urob tri krátke rozhovory s ľuďmi, ktorí téme rozumejú, a zhrň, čo si zistil.',
    ],
  },
  {
    id: 'planovanie-buducnosti',
    name: 'Plánovanie budúcnosti',
    category: 'analyticke',
    talents: { vizionar: 3, strateg: 2, organizator: 1, posudzovatel: 1 },
    roles: ['Rozvoj organizácie', 'Urbanizmus a územné plánovanie', 'Finančné plánovanie', 'Kariérne poradenstvo'],
    start: [
      'Opíš, ako má vyzerať tvoja oblasť o päť rokov, a čo sa musí stať tento rok.',
      'Sleduj dva-tri zdroje o trendoch vo svojom odbore.',
      'Skús scenáre: najlepší, najhorší a najpravdepodobnejší vývoj jednej veci.',
    ],
  },
  {
    id: 'optimalizacia',
    name: 'Optimalizácia procesov',
    category: 'analyticke',
    talents: { organizator: 3, analytik: 2, detailista: 2, novator: 1, tahun: 1 },
    roles: ['Procesný manažér', 'Logistika a výroba', 'Prevádzka', 'Automatizácia a digitalizácia'],
    start: [
      'Zmapuj jeden opakovaný postup krok za krokom a nájdi, kde sa stráca čas.',
      'Odmeraj stav pred zmenou a po nej, aby si vedel, či pomohla.',
      'Zoznám sa so základmi štíhlych metód (lean) alebo automatizácie rutinných úloh.',
    ],
  },

  /* ---------------- Kreatívne ---------------- */
  {
    id: 'napady',
    name: 'Tvorba nových nápadov',
    category: 'kreativne',
    talents: { novator: 3, syntetik: 1, objavitel: 1, povzbudzovac: 1, vizionar: 1 },
    roles: ['Kreatívec v reklame', 'Produktový dizajn', 'Vývoj nových služieb', 'Dramaturgia a tvorba programu'],
    start: [
      'Veď si zápisník nápadov a raz týždenne jeden rozpracuj.',
      'Vyskúšaj techniky ako brainstorming s obmedzením alebo „ako by to urobil niekto iný“.',
      'Ponúkni sa do tímu, ktorý vymýšľa niečo nové – akciu, produkt, kampaň.',
    ],
  },
  {
    id: 'navrhovanie-projektov',
    name: 'Navrhovanie projektov',
    category: 'kreativne',
    talents: { strateg: 2, novator: 2, organizator: 2, vizionar: 2, starter: 1 },
    roles: ['Projektový dizajnér', 'Príprava grantov', 'Rozvoj produktov a služieb', 'Zakladateľ iniciatívy'],
    start: [
      'Spíš návrh projektu na jednu stranu: cieľ, pre koho, kroky, čo potrebuješ.',
      'Pozri si výzvy na malé granty alebo študentské projekty a jeden návrh podaj.',
      'Daj návrh prečítať niekomu kritickému ešte pred spustením.',
    ],
  },
  {
    id: 'dizajn',
    name: 'Grafický dizajn',
    category: 'kreativne',
    talents: { novator: 3, detailista: 3, vnimavec: 1, formulator: 1 },
    roles: ['Grafický dizajnér', 'Dizajn webov a aplikácií', 'Ilustrácia', 'Vizuálna komunikácia značky'],
    start: [
      'Nauč sa základy typografie, farieb a kompozície.',
      'Navrhni plagát alebo vizuál pre reálnu akciu vo svojom okolí.',
      'Buduj si portfólio – aj tri dobré práce sú začiatok.',
    ],
  },
  {
    id: 'obsah',
    name: 'Tvorba obsahu',
    category: 'kreativne',
    talents: { formulator: 3, novator: 2, objavitel: 1, vytrvalec: 1, vnimavec: 1 },
    roles: ['Copywriter', 'Redaktor', 'Tvorca videa či podcastu', 'Správa sociálnych sietí'],
    start: [
      'Vyber si tému a formát a zverejňuj pravidelne aspoň dva mesiace.',
      'Sleduj, na čo ľudia reagujú, a podľa toho upravuj.',
      'Ponúkni tvorbu obsahu organizácii alebo klubu, ktorý poznáš.',
    ],
  },
  {
    id: 'inovacie',
    name: 'Inovácie',
    category: 'kreativne',
    talents: { novator: 3, starter: 2, vizionar: 2, obhajca: 1, vytrvalec: 1 },
    roles: ['Inovačný manažér', 'Startup', 'Výskum a vývoj', 'Zlepšovanie služieb'],
    start: [
      'Nájdi vec, ktorá ľuďom okolo teba komplikuje život, a navrhni jej lepšiu verziu.',
      'Vyrob najjednoduchší prototyp a ukáž ho piatim ľuďom.',
      'Zapoj sa do inovačnej súťaže alebo hackathonu.',
    ],
  },
  {
    id: 'experimentovanie',
    name: 'Experimentovanie',
    category: 'kreativne',
    talents: { objavitel: 2, novator: 2, starter: 2, analytik: 2, improvizator: 1 },
    roles: ['Laboratórna a vývojová práca', 'Testovanie produktov', 'Marketingové testy', 'Gastronómia a remeslo'],
    start: [
      'Sformuluj si predpoklad a navrhni malý pokus, ktorý ho potvrdí alebo vyvráti.',
      'Meň vždy len jednu vec, aby si vedel, čo zabralo.',
      'Zapisuj si pokusy aj neúspešné – sú rovnako cenné.',
    ],
  },

  /* ---------------- Organizačné a realizačné ---------------- */
  {
    id: 'riadenie-projektov',
    name: 'Riadenie projektov',
    category: 'organizacne',
    talents: { organizator: 3, tahun: 2, garant: 2, kormidelnik: 1, strateg: 1 },
    roles: ['Projektový manažér', 'Koordinátor', 'Stavbyvedúci', 'Produkcia'],
    start: [
      'Zober si na starosť malý projekt s jasným termínom a ľuďmi.',
      'Nauč sa základy: cieľ, rozsah, harmonogram, riziká, zodpovednosti.',
      'Vyskúšaj jednoduchý nástroj na sledovanie úloh a používaj ho dôsledne.',
    ],
  },
  {
    id: 'podujatia',
    name: 'Organizovanie podujatí',
    category: 'organizacne',
    talents: { organizator: 3, improvizator: 2, prepajac: 2, detailista: 1, opora: 1 },
    roles: ['Event manažér', 'Produkcia kultúrnych akcií', 'Organizátor konferencií', 'Cestovný ruch'],
    start: [
      'Zorganizuj malú akciu – stretnutie, turnaj, výlet – od pozvánky po upratanie.',
      'Pridaj sa ako dobrovoľník k väčšiemu podujatiu a sleduj zákulisie.',
      'Po akcii si spíš, čo fungovalo a čo nabudúce inak.',
    ],
  },
  {
    id: 'koordinacia-timu',
    name: 'Koordinácia tímu',
    category: 'organizacne',
    talents: { timovy: 3, organizator: 2, kormidelnik: 1, zmierovatel: 1, garant: 1 },
    roles: ['Tímový koordinátor', 'Vedúci zmeny', 'Scrum master', 'Koordinátor dobrovoľníkov'],
    start: [
      'Ponúkni sa, že budeš držať prehľad o tom, kto na čom pracuje.',
      'Zaveď krátke pravidelné stretnutie s tromi otázkami: čo je hotové, čo ďalej, čo brzdí.',
      'Pýtaj sa ľudí, čo im v spolupráci chýba, a jednu vec zmeň.',
    ],
  },
  {
    id: 'planovanie-uloh',
    name: 'Plánovanie úloh',
    category: 'organizacne',
    talents: { organizator: 3, tahun: 2, strateg: 1, detailista: 1 },
    roles: ['Plánovač výroby či zmien', 'Asistent a office manažér', 'Dispečer', 'Projektová podpora'],
    start: [
      'Naplánuj si týždeň vopred a v piatok porovnaj plán so skutočnosťou.',
      'Nauč sa odhadovať čas – pri každej úlohe si zapíš odhad aj realitu.',
      'Pomôž s plánom niekomu, kto sa v úlohách stráca.',
    ],
  },
  {
    id: 'kontrola-kvality',
    name: 'Kontrola kvality',
    category: 'organizacne',
    talents: { detailista: 3, posudzovatel: 2, garant: 2, analytik: 1 },
    roles: ['Kontrolór kvality', 'Tester softvéru', 'Korektor', 'Audit a dodržiavanie predpisov'],
    start: [
      'Zostav kontrolný zoznam pre typ práce, ktorý dobre poznáš.',
      'Ponúkni sa na záverečnú kontrolu dôležitých výstupov.',
      'Uč sa pomenovať chybu vecne a navrhnúť, ako jej predísť.',
    ],
  },
  {
    id: 'implementacia',
    name: 'Implementácia riešení',
    category: 'organizacne',
    talents: { tahun: 3, vytrvalec: 2, starter: 2, improvizator: 1, garant: 1 },
    roles: ['Implementačný špecialista', 'Technik a remeselník', 'Vývojár', 'Zavádzanie zmien v prevádzke'],
    start: [
      'Vyber si jeden dohodnutý, ale nezrealizovaný nápad a dotiahni ho.',
      'Rozdeľ si prácu na etapy s viditeľným výsledkom.',
      'Zapisuj si prekážky a ako si ich obišiel – ušetrí ti to čas nabudúce.',
    ],
  },

  /* ---------------- Komunikačné a vplyvové ---------------- */
  {
    id: 'prezentovanie',
    name: 'Prezentovanie',
    category: 'komunikacne',
    talents: { formulator: 3, obhajca: 2, povzbudzovac: 1, rozhodny: 1 },
    roles: ['Lektor a rečník', 'Obchodný zástupca', 'Hovorca', 'Sprievodca a moderátor'],
    start: [
      'Priprav si päťminútové vystúpenie na tému, ktorú máš rád, a nahraj sa.',
      'Hľadaj príležitosti hovoriť pred malou skupinou.',
      'Po každom vystúpení si vypýtaj jednu vec na zlepšenie.',
    ],
  },
  {
    id: 'vyjednavanie',
    name: 'Vyjednávanie',
    category: 'komunikacne',
    talents: { vyjednavac: 3, obhajca: 2, strateg: 1, vnimavec: 1, posudzovatel: 1 },
    roles: ['Nákupca', 'Obchodník', 'Právnik a mediátor', 'Diplomacia a odbory'],
    start: [
      'Pred každou dohodou si spíš svoj cieľ, hranicu a čo môžeš ponúknuť.',
      'Trénuj na malých veciach – cena, termín, rozdelenie práce.',
      'Prečítaj si niečo o vyjednávaní založenom na záujmoch, nie pozíciách.',
    ],
  },
  {
    id: 'predaj',
    name: 'Predaj',
    category: 'komunikacne',
    talents: { obhajca: 3, prepajac: 2, sutazivec: 2, vyjednavac: 1, vytrvalec: 1 },
    roles: ['Obchodný zástupca', 'Account manažér', 'Realitný maklér', 'Fundraiser'],
    start: [
      'Skús predať niečo vlastné – výrobok, službu, vstupenky na akciu.',
      'Uč sa najprv pýtať na potreby, až potom ponúkať.',
      'Počítaj s odmietnutím – sleduj si pomer oslovení a úspechov.',
    ],
  },
  {
    id: 'vedenie-ludi',
    name: 'Vedenie ľudí',
    category: 'komunikacne',
    talents: { kormidelnik: 3, rozhodny: 2, sprievodca: 2, povzbudzovac: 1, garant: 1 },
    roles: ['Vedúci tímu', 'Manažér', 'Tréner a kapitán', 'Vedúci oddielu či krúžku'],
    start: [
      'Zober si vedenie malej skupiny pri konkrétnej úlohe.',
      'Uč sa dávať jasné zadania a pravidelnú spätnú väzbu.',
      'Pýtaj sa ľudí, ktorých vedieš, čo im od teba pomáha a čo nie.',
    ],
  },
  {
    id: 'motivovanie',
    name: 'Motivovanie tímu',
    category: 'komunikacne',
    talents: { povzbudzovac: 3, vnimavec: 1, formulator: 1, sprievodca: 1, sutazivec: 1 },
    roles: ['Tréner', 'Tímlíder', 'Animátor a lektor', 'Personalista pre angažovanosť'],
    start: [
      'Všímaj si, čo koho poháňa – u každého je to niečo iné.',
      'Zaveď zvyk oceňovať konkrétne úspechy, aj malé.',
      'Pri ďalšej náročnej úlohe sa ujmi úvodu a pomenuj, prečo sa oplatí.',
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    category: 'komunikacne',
    talents: { prepajac: 3, formulator: 1, starter: 1, dovernik: 1 },
    roles: ['Rozvoj obchodu', 'Vzťahy s verejnosťou', 'Náborový špecialista', 'Správca komunity'],
    start: [
      'Choď na odborné podujatie s cieľom spoznať troch nových ľudí.',
      'Po stretnutí sa do dvoch dní ozvi s niečím užitočným.',
      'Raz mesačne prepoj dvoch ľudí, ktorí si môžu pomôcť.',
    ],
  },

  /* ---------------- Vzťahové a pomáhajúce ---------------- */
  {
    id: 'mentoring',
    name: 'Mentoring',
    category: 'vztahove',
    talents: { sprievodca: 3, dovernik: 2, vnimavec: 1, posudzovatel: 1 },
    roles: ['Mentor nováčikov', 'Školiteľ', 'Vedúci praxe', 'Mentor v dobrovoľníckom programe'],
    start: [
      'Ponúkni sa niekomu o krok za tebou – nováčikovi, mladšiemu študentovi.',
      'Dohodnite si cieľ a pravidelné stretnutia.',
      'Viac sa pýtaj, než radíš.',
    ],
  },
  {
    id: 'vzdelavanie',
    name: 'Vzdelávanie',
    category: 'vztahove',
    talents: { formulator: 3, sprievodca: 2, objavitel: 1, povzbudzovac: 1 },
    roles: ['Učiteľ', 'Lektor kurzov', 'Tvorca vzdelávacích materiálov', 'Doučovanie'],
    start: [
      'Priprav krátky workshop alebo návod k niečomu, čo vieš dobre.',
      'Vyskúšaj doučovanie alebo vedenie krúžku.',
      'Sleduj, čo ľuďom pomáha pochopiť – a čo ich len zahlcuje.',
    ],
  },
  {
    id: 'koucing',
    name: 'Koučing',
    category: 'vztahove',
    talents: { vnimavec: 3, sprievodca: 2, dovernik: 2, povzbudzovac: 1 },
    roles: ['Kouč', 'Kariérny poradca', 'Personalista pre rozvoj', 'Poradenstvo a pomáhajúce profesie'],
    start: [
      'Trénuj aktívne počúvanie – zopakuj vlastnými slovami, čo si počul.',
      'Nauč sa klásť otvorené otázky namiesto rád.',
      'Pozri si úvodný kurz koučingu alebo poradenských zručností.',
    ],
  },
  {
    id: 'timova-spolupraca',
    name: 'Tímová spolupráca',
    category: 'vztahove',
    talents: { timovy: 3, opora: 2, zmierovatel: 1, garant: 1 },
    roles: ['Člen projektového tímu', 'Zdravotnícke a záchranné tímy', 'Gastronómia a služby', 'Športové kolektívy'],
    start: [
      'Zapoj sa do spoločného projektu, kde výsledok závisí od viacerých.',
      'Pýtaj sa kolegov, čo od teba potrebujú, aby sa im pracovalo ľahšie.',
      'Ponúkni tímu to, čo ti ide prirodzene, a otvorene povedz, čo ti nejde.',
    ],
  },
  {
    id: 'podpora-kolegov',
    name: 'Podpora kolegov',
    category: 'vztahove',
    talents: { opora: 3, vnimavec: 2, timovy: 1, garant: 1 },
    roles: ['Asistent', 'Technická a zákaznícka podpora', 'Personalistika', 'Sociálna a zdravotná starostlivosť'],
    start: [
      'Všímaj si, kto je preťažený, a ponúkni konkrétnu pomoc.',
      'Spíš odpovede na najčastejšie otázky, s ktorými za tebou ľudia chodia.',
      'Stráž si vlastnú kapacitu – pomoc má byť udržateľná.',
    ],
  },
  {
    id: 'komunita',
    name: 'Budovanie komunity',
    category: 'vztahove',
    talents: { prepajac: 2, timovy: 2, povzbudzovac: 2, starter: 1, opora: 1, organizator: 1 },
    roles: ['Komunitný manažér', 'Koordinátor dobrovoľníkov', 'Práca s mládežou', 'Občianske a susedské iniciatívy'],
    start: [
      'Zvolaj prvé neformálne stretnutie ľudí, ktorých spája jedna téma.',
      'Vytvor miesto, kde sa môžu ozývať – skupinu, nástenku, pravidelný termín.',
      'Zapájaj ostatných do organizovania, nech komunita nestojí na tebe.',
    ],
  },
];

export const ACTIVITY_BY_ID: Record<string, Activity> = Object.fromEntries(ACTIVITIES.map((a) => [a.id, a]));
