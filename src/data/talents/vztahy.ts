import type { Talent } from '../types';

export const VZTAHY: Talent[] = [
  {
    id: 'vnimavec',
    name: 'Vnímavec',
    domain: 'vztahy',
    tagline: 'Vycítiš, čo ľudia prežívajú, aj keď to nepovedia nahlas.',
    essence: 'vnímaš, čo ľudia prežívajú, aj bez slov',
    contribution: 'cit pre to, čo ľudia prežívajú a potrebujú',
    description:
      'Nálady a pocity druhých čítaš tak prirodzene, ako iní čítajú text. Všimneš si zmenu tónu, zaváhanie či úsmev, ktorý nesedí. Ľudia sa pri tebe cítia pochopení, lebo vieš pomenovať to, čo sami ešte nevedeli vysloviť.',
    daily: [
      'Pri vstupe do miestnosti vycítiš, aká je v nej nálada.',
      'Všimneš si, že niekoho niečo trápi, hoci tvrdí, že je v poriadku.',
      'Silný film alebo príbeh ťa zasiahne viac než ostatných.',
      'Vieš, kedy sa pýtať a kedy len ticho byť nablízku.',
    ],
    work: [
      'Odhadneš, ako správu prijme ten, komu je určená.',
      'Zachytíš napätie v tíme skôr, než prerastie do konfliktu.',
      'Rozumieš tomu, čo zákazník potrebuje, aj keď to hovorí inak.',
    ],
    activities: ['Práca s ľuďmi a klientmi', 'Poradenstvo a starostlivosť', 'Zisťovanie potrieb používateľov', 'Vedenie citlivých rozhovorov', 'Pomáhajúce profesie'],
    advantages: [
      'Keď treba oznámiť ťažkú správu citlivo.',
      'Keď niekto potrebuje byť vypočutý, nie poučený.',
      'Keď treba pochopiť, čo ľudia naozaj chcú.',
    ],
    risks: [
      'Cudzie emócie nesieš ako vlastné a vyčerpávajú ťa.',
      'Zo súcitu sa vyhneš nepríjemnej, ale potrebnej pravde.',
      'Rozhoduješ podľa pocitov tam, kde by bolo treba aj fakty.',
    ],
    develop: [
      'Uč sa rozlišovať, čo je tvoj pocit a čo si prevzal od iných.',
      'Svoje vnemy si overuj otázkou – „zdá sa mi, že…, je to tak?“',
      'Dopraj si pravidelný čas osamote na „vyvetranie“.',
    ],
    examples: [
      'Pred dôležitým oznámením poraď tímu, ako ho ľudia asi prijmú a čo budú potrebovať počuť.',
      'Keď je niekto na porade nezvyčajne ticho, po skončení sa mu nenápadne ozvi.',
      'Zapoj sa tam, kde treba rozumieť ľuďom – rozhovory s používateľmi, dobrovoľníctvo, podpora nováčikov.',
    ],
  },
  {
    id: 'timovy',
    name: 'Tímový hráč',
    domain: 'vztahy',
    tagline: 'Najlepšie sa ti pracuje spolu. „My“ je pre teba silnejšie než „ja“.',
    essence: 'najradšej dosahuješ veci spoločne s ostatnými',
    contribution: 'chuť spolupracovať a ťahať za jeden povraz',
    description:
      'Spoločné dielo ťa teší viac než sólový úspech. Prirodzene sa pýtaš, kto ďalší by mal byť pri tom, deliš sa o informácie aj zásluhy a dbáš, aby nikto nezostal bokom. V dobrom tíme podávaš lepší výkon než sám.',
    daily: [
      'Radšej pozveš o jedného človeka viac, než by si niekoho vynechal.',
      'Športy a hry ťa bavia najmä v družstve.',
      'O dobré tipy a kontakty sa deliš bez váhania.',
      'Úspech partie ťa teší rovnako ako vlastný.',
    ],
    work: [
      'Hovoríš „podarilo sa nám“, nie „podarilo sa mi“.',
      'Všimneš si, kto sa v diskusii nedostal k slovu, a prizveš ho.',
      'Ochotne prispôsobíš svoju časť práce potrebám celku.',
    ],
    activities: ['Tímová spolupráca', 'Spoločné projekty', 'Zapájanie nových ľudí', 'Práca v zmiešaných tímoch', 'Komunitné a dobrovoľnícke aktivity'],
    advantages: [
      'Keď úloha presahuje sily jednotlivca.',
      'Keď sa v tíme tvoria skupinky a niekto zostáva mimo.',
      'Keď treba spojiť ľudí s rôznymi schopnosťami.',
    ],
    risks: [
      'Kvôli zhode skupiny potlačíš vlastný názor.',
      'Ťažko sa ti pracuje a rozhoduje osamote.',
      'Zodpovednosť sa v „my“ ľahko rozplynie.',
    ],
    develop: [
      'Pri spoločnej práci vždy pomenuj, kto za čo zodpovedá.',
      'Trénuj vyslovenie nesúhlasu – dobrému tímu pomáha.',
      'Vyhraď si aj čas na sústredenú samostatnú prácu.',
    ],
    examples: [
      'Na začiatku spoločnej úlohy navrhni krátke kolo: kto čo vie a čo by rád robil.',
      'Ujmi sa nového člena tímu a predstav ho ostatným.',
      'Keď niekto dosiahne úspech sám, pripomeň aj tých, ktorí mu pomohli.',
    ],
  },
  {
    id: 'sprievodca',
    name: 'Sprievodca',
    domain: 'vztahy',
    tagline: 'Vidíš v ľuďoch, čím sa môžu stať, a teší ťa pomáhať im rásť.',
    essence: 'pomáhaš ľuďom rásť a tešíš sa z ich pokrokov',
    contribution: 'schopnosť rozvíjať druhých a vidieť ich potenciál',
    description:
      'V každom človeku vidíš rozpracované dielo. Všímaš si malé pokroky, ktoré iní prehliadnu, a vieš ich pomenovať tak, že človek chce pokračovať. Najväčšiu radosť máš, keď niekto zvládne to, čo si predtým netrúfal – a ty si pri tom stál.',
    daily: [
      'Trpezlivo vysvetlíš to isté aj tretí raz, ak vidíš snahu.',
      'Pamätáš si, v čom sa kto zlepšil, a povieš mu to.',
      'Ľudia za tebou chodia po radu, ako sa niečo naučiť.',
      'Radšej ukážeš, ako na to, než by si to urobil za druhého.',
    ],
    work: [
      'Zaúčaš nováčikov a baví ťa to.',
      'Zveruješ ľuďom úlohy, pri ktorých môžu o kúsok vyrásť.',
      'Spätnú väzbu dávaš tak, aby sa z nej dalo učiť.',
    ],
    activities: ['Mentoring', 'Vzdelávanie a lektorovanie', 'Koučing', 'Zaúčanie nových ľudí', 'Trénerstvo a vedenie krúžkov'],
    advantages: [
      'Keď niekto začína a potrebuje trpezlivé vedenie.',
      'Keď má tím talent, ktorý ešte nie je rozvinutý.',
      'Keď človek stratil dôveru vo vlastné schopnosti.',
    ],
    risks: [
      'Investuješ do ľudí, ktorí o rast nestoja.',
      'Popri rozvoji iných zanedbáš ten vlastný.',
      'Zo snahy chrániť odkladáš kritickú spätnú väzbu.',
    ],
    develop: [
      'Pýtaj sa ľudí, kam chcú rásť oni – nie kam ich vidíš ty.',
      'Uč sa dávať aj náročnú spätnú väzbu, jasne a s rešpektom.',
      'Maj aj ty svojho mentora a vlastný cieľ rozvoja.',
    ],
    examples: [
      'Ponúkni sa ako sprievodca nováčikovi – v práci, škole či klube.',
      'Raz mesačne povedz niekomu konkrétne, v čom sa od minula posunul.',
      'Priprav krátky návod alebo školenie k niečomu, čo vieš dobre.',
    ],
  },
  {
    id: 'zmierovatel',
    name: 'Zmierovateľ',
    domain: 'vztahy',
    tagline: 'V napätí hľadáš, čo ľudí spája, a pomáhaš im nájsť spoločnú reč.',
    essence: 'upokojuješ napätie a hľadáš, čo ľudí spája',
    contribution: 'schopnosť upokojiť napätie a nájsť spoločnú reč',
    description:
      'Konflikt pre teba nie je súboj, ktorý treba vyhrať, ale uzol, ktorý treba rozviazať. Aj v ostrej výmene počuješ, v čom sa strany zhodujú, a vieš to pomenovať. Tvoja prítomnosť znižuje teplotu v miestnosti a pomáha ľuďom vrátiť sa k veci.',
    daily: [
      'Pri rodinnej či priateľskej hádke si ten, kto ju pomáha urovnať.',
      'Vieš uznať, že pravdu má sčasti každý.',
      'Zbytočným sporom sa vyhneš – energiu radšej dáš inam.',
      'Hlasná výmena názorov je ti nepríjemná a snažíš sa ju stíšiť.',
    ],
    work: [
      'V spore dvoch kolegov vieš hovoriť s oboma.',
      'Vraciaš diskusiu od osobných výpadov k spoločnému cieľu.',
      'Navrhuješ praktické riešenia, s ktorými môžu žiť všetci.',
    ],
    activities: ['Riešenie konfliktov', 'Mediácia a facilitácia', 'Vedenie citlivých diskusií', 'Práca so sťažnosťami', 'Budovanie pokojnej tímovej atmosféry'],
    advantages: [
      'Keď sa spor vyostril a strany sa prestali počúvať.',
      'Keď musia spolupracovať ľudia, ktorí si nesadli.',
      'Keď emócie bránia dohode, ktorá je na dosah.',
    ],
    risks: [
      'Vyhneš sa konfliktu, ktorý by bolo treba otvoriť.',
      'Pre pokoj ustúpiš aj tam, kde by si nemal.',
      'Zahladíš napätie, ale príčina zostane.',
    ],
    develop: [
      'Rozlišuj spor, ktorý škodí, od nezhody, ktorá vec posúva.',
      'Trénuj povedať vlastný názor, aj keď rozvíri hladinu.',
      'Po upokojení sa vráť k príčine a pomôž ju doriešiť.',
    ],
    examples: [
      'Keď sa diskusia vyhrotí, zhrň nahlas: „V tomto sa zhodneme, líšime sa v tomto.“',
      'Ponúkni dvom ľuďom v spore, že si každého vypočuješ osobitne.',
      'Navrhni tímu pravidlá diskusie skôr, než ich bude treba.',
    ],
  },
  {
    id: 'prepajac',
    name: 'Prepájač',
    domain: 'vztahy',
    tagline: 'Ľahko nadväzuješ kontakty a baví ťa spájať ľudí, ktorí si majú čo povedať.',
    essence: 'ľahko nadväzuješ kontakty a spájaš ľudí navzájom',
    contribution: 'schopnosť nadväzovať kontakty a prepájať ľudí',
    description:
      'Neznámy človek je pre teba príležitosť, nie prekážka. Prirodzene nadviažeš rozhovor, zapamätáš si, čo kto robí a hľadá, a keď sa stretnú dve potreby, hneď ti napadne: „Vy dvaja by ste sa mali spoznať.“ Tvoja sieť známostí je živá a rastie sama.',
    daily: [
      'Dáš sa do reči s ľuďmi vo vlaku, v rade či na akcii.',
      'Pamätáš si, kto sa čomu venuje a čo by sa mu hodilo.',
      'Často povieš: „Poznám niekoho, kto ti s tým pomôže.“',
      'Na nové miesto či do nového kolektívu ideš s chuťou.',
    ],
    work: [
      'Vieš, na koho sa obrátiť, aj mimo vlastného tímu.',
      'Prepájaš oddelenia, ktoré o sebe nevedeli.',
      'Nových ľudí vieš rýchlo získať a zapojiť.',
    ],
    activities: ['Networking', 'Budovanie partnerstiev', 'Nábor a oslovovanie ľudí', 'Budovanie komunity', 'Vzťahy s verejnosťou a klientmi'],
    advantages: [
      'Keď projekt potrebuje ľudí, kontakty alebo spojencov.',
      'Keď tím uviazol vo vlastnej bubline.',
      'Keď treba rýchlo nájsť niekoho, kto „to vie“.',
    ],
    risks: [
      'Známostí je veľa, ale zostávajú na povrchu.',
      'Rozptýliš sa medzi ľuďmi a práca stojí.',
      'Sľúbiš prepojenie alebo pomoc a zabudneš.',
    ],
    develop: [
      'Veď si poznámky o ľuďoch a sľuboch, ktoré si im dal.',
      'Vyber si pár vzťahov, ktoré budeš vedome prehlbovať.',
      'Po každom prepojení sa neskôr opýtaj, ako dopadlo.',
    ],
    examples: [
      'Raz týždenne zoznám dvoch ľudí, ktorí si môžu byť užitoční.',
      'Ujmi sa úlohy získať pre akciu hostí, partnerov alebo dobrovoľníkov.',
      'Usporiadaj neformálne stretnutie ľudí z rôznych kruhov, ktorých spája jedna téma.',
    ],
  },
  {
    id: 'opora',
    name: 'Opora',
    domain: 'vztahy',
    tagline: 'Keď niekto potrebuje pomoc, si tam – a robíš to bez veľkých rečí.',
    essence: 'ochotne pomáhaš tam, kde to niekto potrebuje',
    contribution: 'ochota priložiť ruku k dielu tam, kde treba',
    description:
      'Pomáhanie je pre teba prirodzený spôsob, ako byť užitočný. Všimneš si, kto nestíha alebo si nevie rady, a ponúkneš sa skôr, než požiada. Nepotrebuješ za to potlesk – stačí ti vedieť, že to niekomu uľahčilo deň.',
    daily: [
      'Pomôžeš so sťahovaním, odvozom či strážením, aj keď sa ti to nehodí.',
      'Všimneš si, komu treba podržať dvere alebo odniesť tašku.',
      'Na oslave pomáhaš v kuchyni, kým ostatní sedia.',
      'Pamätáš si, čo kto potreboval, a ozveš sa, keď na to natrafíš.',
    ],
    work: [
      'Zaskočíš za kolegu, ktorý nestíha.',
      'Robíš aj nenápadnú prácu v zákulisí, bez ktorej by vec nefungovala.',
      'Ochotne odpovedáš na otázky a zdieľaš, čo vieš.',
    ],
    activities: ['Podpora kolegov a klientov', 'Asistencia a servis', 'Starostlivosť a služba ľuďom', 'Dobrovoľníctvo', 'Zákulisná práca pre tím'],
    advantages: [
      'Keď je niekto preťažený a hanbí sa požiadať o pomoc.',
      'Keď úspech závisí od množstva drobnej, nenápadnej práce.',
      'Keď v tíme chýba ochota urobiť niečo navyše.',
    ],
    risks: [
      'Pomáhaš na úkor vlastnej práce a síl.',
      'Ľudia si na tvoju pomoc zvyknú a prestanú sa snažiť.',
      'Tvoj prínos zostáva neviditeľný a nedocenený.',
    ],
    develop: [
      'Pred ponukou pomoci si over, či ju druhý chce a či na ňu máš kapacitu.',
      'Pomáhaj tak, aby sa človek nabudúce zaobišiel aj bez teba.',
      'Uč sa aj sám o pomoc požiadať – a hovoriť o tom, čo si urobil.',
    ],
    examples: [
      'Keď vidíš preťaženého kolegu, ponúkni konkrétnu vec: „Zoberiem ti tieto dve úlohy.“',
      'Zapoj sa do služby, ktorá ti dáva zmysel – doučovanie, pomoc seniorom, zbierky.',
      'Raz týždenne si vyhraď hodinu, počas ktorej si „k dispozícii“ ostatným.',
    ],
  },
  {
    id: 'dovernik',
    name: 'Dôverník',
    domain: 'vztahy',
    tagline: 'Staviaš na hlbokých a pevných vzťahoch, v ktorých sa dá povedať čokoľvek.',
    essence: 'buduješ hlboké vzťahy postavené na dôvere',
    contribution: 'schopnosť budovať hlbokú a trvalú dôveru',
    description:
      'Radšej máš pár ľudí naozaj blízko než mnohých zďaleka. Vzťah pre teba rastie časom, úprimnosťou a tým, že vydrží aj ťažké chvíle. Ľudia ti zverujú veci, ktoré inde nepovedia, lebo vedia, že u teba zostanú v bezpečí.',
    daily: [
      'Máš priateľstvá, ktoré trvajú roky až desaťročia.',
      'Tajomstvo u teba zostane tajomstvom.',
      'Radšej rozhovor vo dvojici než veľká spoločnosť.',
      'Povieš priateľovi aj nepríjemnú pravdu, lebo ti na ňom záleží.',
    ],
    work: [
      'Najlepšie sa ti pracuje s ľuďmi, ktorých dobre poznáš.',
      'Kolegovia sa ti zdôverujú s vecami, ktoré nepovedia šéfovi.',
      'Buduješ si vzťahy s klientmi či partnermi, ktoré vydržia roky.',
    ],
    activities: ['Dlhodobá práca s klientmi', 'Individuálne poradenstvo', 'Práca v malom stabilnom tíme', 'Dôverné a citlivé agendy', 'Budovanie partnerstiev na roky'],
    advantages: [
      'Keď treba hovoriť o citlivých veciach.',
      'Keď vzťah so zákazníkom či partnerom rozhoduje o všetkom.',
      'Keď tím potrebuje prostredie, kde sa dá priznať chyba.',
    ],
    risks: [
      'Uzavrieš sa v úzkom kruhu a nových ľudí púšťaš k sebe pomaly.',
      'Blízkym nadŕžaš a strácaš nadhľad.',
      'Sklamanie dôvery ťa zasiahne hlboko a dlho.',
    ],
    develop: [
      'Vedome venuj čas aj ľuďom mimo svojho najbližšieho kruhu.',
      'V práci rozlišuj lojalitu k človeku a spravodlivosť k ostatným.',
      'Hovor ľuďom, že si ich vážiš – nespoliehaj sa, že to vedia.',
    ],
    examples: [
      'Zober si na starosť klienta či partnera, pri ktorom ide o dlhodobý vzťah.',
      'Pozvi kolegu, ktorého poznáš len povrchne, na kávu vo dvojici.',
      'Buď v tíme tým, kto prvý otvorene povie „toto som pokazil“ – ostatným to otvorí dvere.',
    ],
  },
];
