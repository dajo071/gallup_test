import type { Talent } from '../types';

export const REALIZACIA: Talent[] = [
  {
    id: 'tahun',
    name: 'Ťahúň',
    domain: 'realizacia',
    tagline: 'Dobrý deň je pre teba ten, na konci ktorého je niečo hotové.',
    essence: 'potrebuješ vidieť za sebou hotovú prácu',
    contribution: 'vnútorný ťah dotiahnuť veci do hotového výsledku',
    description:
      'Máš v sebe vnútorný motor, ktorý sa každé ráno spúšťa nanovo. Uspokojenie ti prináša viditeľný pokrok – odškrtnutá úloha, uzavretá etapa, hotový výsledok. Vydržíš vysoké tempo a pri práci sa vieš sám poháňať, aj keď ťa nikto nekontroluje.',
    daily: [
      'Aj voľný deň si rád naplníš niečím, čo po ňom zostane.',
      'Odškrtávanie zoznamu ti robí úprimnú radosť.',
      'Po dosiahnutí cieľa rýchlo hľadáš ďalší.',
      'Z nečinnosti bývaš nesvoj.',
    ],
    work: [
      'Úlohy u teba neležia – berieš ich a posúvaš k záveru.',
      'Udávaš tempo, ktorému sa ostatní prispôsobujú.',
      'Pýtaš sa „dokedy?“ a „čo je hotové?“',
    ],
    activities: ['Dokončovanie projektov', 'Plnenie cieľov a termínov', 'Práca s merateľnými výsledkami', 'Rozbiehanie zaseknutých úloh', 'Samostatná práca na vlastnú zodpovednosť'],
    advantages: [
      'Keď sa blíži termín a treba zabrať.',
      'Keď projekt stráca tempo a potrebuje niekoho, kto ho potiahne.',
      'Keď je práce veľa a nikto na ňu nedohliada.',
    ],
    risks: [
      'Nevieš vypnúť a oddych vnímaš ako stratu času.',
      'Množstvo hotových úloh zameníš za ich význam.',
      'Od ostatných čakáš rovnaké tempo a si netrpezlivý, keď ho nemajú.',
    ],
    develop: [
      'Pred začiatkom týždňa si vyber tri veci, na ktorých naozaj záleží.',
      'Naplánuj si oddych rovnako záväzne ako prácu.',
      'Zastav sa pri dokončenej veci a vedome ju oceň, kým pôjdeš ďalej.',
    ],
    examples: [
      'Zober si v tíme úlohu, ktorá sa dlho vlečie, a dohodni si termín, dokedy ju uzavrieš.',
      'Veď si jednoduchý zoznam „hotovo“ – pomôže ti vidieť pokrok aj pri dlhých projektoch.',
      'Veľký cieľ si rozdeľ na týždenné míľniky, aby si mal pravidelne čo uzatvárať.',
    ],
  },
  {
    id: 'organizator',
    name: 'Organizátor',
    domain: 'realizacia',
    tagline: 'Z chaosu vieš urobiť systém, v ktorom má každá vec svoje miesto a čas.',
    essence: 'dávaš veciam poriadok, postup a jasné roly',
    contribution: 'schopnosť usporiadať úlohy, ľudí a čas do fungujúceho celku',
    description:
      'Keď vidíš veľa úloh, ľudí a termínov naraz, prirodzene ich začneš usporadúvať. Uvažuješ v krokoch, nadväznostiach a zodpovednostiach. Dobre zorganizovaná vec ti prináša pokoj a uspokojenie – a ostatným istotu, že sa na nič nezabudne.',
    daily: [
      'Výlet alebo oslavu máš premyslenú vrátane toho, kto čo prinesie.',
      'Používaš kalendár, zoznamy alebo vlastný systém a držíš sa ho.',
      'Doma majú veci svoje miesto a hľadanie ťa rozčuľuje.',
      'Keď treba niečo zariadiť viacerým ľuďom, ujmeš sa rozdelenia úloh.',
    ],
    work: [
      'Veľké zadanie rozmeníš na kroky s termínmi.',
      'Udržíš prehľad o viacerých veciach naraz.',
      'Zavádzaš postupy, vďaka ktorým sa rovnaká chyba neopakuje.',
    ],
    activities: ['Riadenie projektov', 'Plánovanie a harmonogramy', 'Organizovanie podujatí', 'Koordinácia ľudí a zdrojov', 'Nastavovanie procesov'],
    advantages: [
      'Keď je veľa pohyblivých častí a hrozí chaos.',
      'Keď tím má nápad, ale nevie, ako ho uskutočniť.',
      'Keď treba pripraviť akciu s pevným termínom.',
    ],
    risks: [
      'Plán sa stane dôležitejším než to, čomu má slúžiť.',
      'Zle znášaš, keď niekto pracuje inak než podľa tvojho systému.',
      'Preorganizuješ aj to, čo by sa zvládlo jednoducho.',
    ],
    develop: [
      'V každom pláne nechaj rezervu na nečakané.',
      'Pýtaj sa ľudí, aký spôsob práce vyhovuje im, nielen tebe.',
      'Pravidelne škrtaj kroky a pravidlá, ktoré už nič neprinášajú.',
    ],
    examples: [
      'Ponúkni sa, že zostavíš plán spoločnej akcie – kto, čo, dokedy.',
      'Vytvor pre opakovanú úlohu jednoduchý kontrolný zoznam a zdieľaj ho.',
      'Pomôž kolegovi alebo spolužiakovi rozložiť veľkú úlohu na zvládnuteľné časti.',
    ],
  },
  {
    id: 'garant',
    name: 'Garant',
    domain: 'realizacia',
    tagline: 'Čo sľúbiš, to platí. Záväzok je pre teba vecou cti.',
    essence: 'stojíš si za slovom a berieš záväzky osobne',
    contribution: 'spoľahlivosť a osobná zodpovednosť za výsledok',
    description:
      'Keď na seba niečo vezmeš, cítiš to ako osobný záväzok – bez ohľadu na to, aká je vec veľká a či sa na ňu niekto pozerá. Nedodržaný sľub ťa ťaží, kým ho nenapravíš. Ľudia ti preto zverujú veci, na ktorých im záleží.',
    daily: [
      'Chodíš načas a dohodnuté termíny dodržiavaš.',
      'Keď niečo pokazíš, priznáš to a snažíš sa to napraviť.',
      'Požičané veci vraciaš v poriadku a bez pripomínania.',
      'Ťažko sa ti hovorí „nie“, keď ťa niekto požiada o pomoc.',
    ],
    work: [
      'Úlohu ti stačí zadať raz – netreba ťa kontrolovať.',
      'Ozveš sa vopred, keď hrozí, že niečo nestihneš.',
      'Cítiš zodpovednosť za výsledok, nielen za svoju časť.',
    ],
    activities: ['Správa zverených úloh a agend', 'Práca s vysokou mierou dôvery', 'Dohľad nad plnením záväzkov', 'Starostlivosť o klientov', 'Samostatné vedenie zverenej oblasti'],
    advantages: [
      'Keď ide o veľa a treba niekoho, na koho sa dá spoľahnúť.',
      'Keď sa zodpovednosť rozplýva a nikto sa k veci nehlási.',
      'Keď treba obnoviť dôveru po predošlých nesplnených sľuboch.',
    ],
    risks: [
      'Naberieš si viac, než dokážeš uniesť.',
      'Preberáš zodpovednosť aj za to, čo patrí iným.',
      'Vlastnú chybu si vyčítaš dlhšie, než je užitočné.',
    ],
    develop: [
      'Pred každým „áno“ si over, čo kvôli nemu budeš musieť odsunúť.',
      'Uč sa delegovať – nechať zodpovednosť tomu, komu patrí.',
      'Rozlišuj medzi tým, čo si sľúbil, a tým, čo si na seba iba vzal v hlave.',
    ],
    examples: [
      'Prihlás sa o úlohu, pri ktorej je dôležitá diskrétnosť alebo presnosť.',
      'Pri tímovej práci navrhni, aby mala každá úloha jedno konkrétne meno.',
      'Raz týždenne si prejdi svoje záväzky a tie, ktoré nestíhaš, otvorene prejednaj.',
    ],
  },
  {
    id: 'detailista',
    name: 'Detailista',
    domain: 'realizacia',
    tagline: 'Vidíš drobnosti, ktoré iným unikajú, a záleží ti na tom, aby bola práca čistá.',
    essence: 'dbáš na presnosť a kvalitu do posledného detailu',
    contribution: 'presnosť, dôslednosť a cit pre kvalitu',
    description:
      'Kvalitu vnímaš v detailoch. Preklep, nerovný okraj či nepresné číslo ti udrú do očí a nedajú ti pokoj, kým ich neopravíš. Radšej urobíš vec poriadne než rýchlo – a výsledok, pod ktorý sa podpíšeš, znesie aj prísny pohľad.',
    daily: [
      'Správu si pred odoslaním prečítaš ešte raz.',
      'Všimneš si krivo zavesený obraz alebo chybu v jedálnom lístku.',
      'Pri ručnej práci ti záleží na čistom prevedení.',
      'Návody čítaš celé a postupuješ podľa nich.',
    ],
    work: [
      'Tvoje výstupy sú spoľahlivo bez chýb.',
      'Kolegovia ti dávajú veci „na posledné pozretie“.',
      'Dodržiavaš postupy a normy aj vtedy, keď by sa dali obísť.',
    ],
    activities: ['Kontrola kvality', 'Korektúry a revízie', 'Práca s presnými údajmi', 'Dolaďovanie finálnych výstupov', 'Dokumentácia a evidencia'],
    advantages: [
      'Keď je chyba drahá – v zmluve, výpočte či v bezpečnosti.',
      'Keď má výsledok reprezentovať a musí byť dotiahnutý.',
      'Keď treba nájsť, kde presne sa niečo pokazilo.',
    ],
    risks: [
      'Doladuješ aj tam, kde si to nikto nevšimne, a strácaš čas.',
      'Ťažko odovzdávaš prácu, ktorá nie je podľa teba dokonalá.',
      'Upozorňovanie na drobné chyby môže ostatných unavovať.',
    ],
    develop: [
      'Vopred si urči, aká úroveň kvality je pre danú úlohu „dosť dobrá“.',
      'Najprv si over celok, až potom lešti detaily.',
      'Pri pripomienkach vyberaj tie, ktoré majú na výsledok skutočný vplyv.',
    ],
    examples: [
      'Ponúkni sa na záverečnú kontrolu dôležitého dokumentu alebo prezentácie.',
      'Zostav kontrolný zoznam najčastejších chýb pre svoju oblasť.',
      'Pri veľkej úlohe si stanov čas na doladenie a po jeho uplynutí ju odovzdaj.',
    ],
  },
  {
    id: 'starter',
    name: 'Štartér',
    domain: 'realizacia',
    tagline: 'Kým ostatní ešte zvažujú, ty už robíš prvý krok.',
    essence: 'rozbiehaš veci skôr, než sa o nich stihne dlho hovoriť',
    contribution: 'energia pustiť sa do veci a rozhýbať ju',
    description:
      'Čakanie ťa unavuje viac než práca. Veríš, že najviac sa človek dozvie, keď vec jednoducho skúsi – a tak premieňaš reči na prvé kroky. Tvoja energia vie rozhýbať aj ľudí a projekty, ktoré dlho stáli na mieste.',
    daily: [
      'Keď ťa niečo zaujme, vyskúšaš to ešte v ten deň.',
      'Dlhé rozhodovanie v reštaurácii či obchode ťa znervózňuje.',
      'Často si ten, kto povie „tak poďme na to“.',
      'Učíš sa najradšej tak, že to rovno skúšaš.',
    ],
    work: [
      'Nápad z porady má od teba do večera prvý náčrt.',
      'Oslovíš, zavoláš, napíšeš – nečakáš, kým to urobí niekto iný.',
      'Radšej rýchly pokus a oprava než dokonalý plán.',
    ],
    activities: ['Rozbiehanie nových projektov', 'Pilotné pokusy a prvé verzie', 'Oslovovanie a získavanie príležitostí', 'Zavádzanie zmien', 'Podnikanie a vlastné iniciatívy'],
    advantages: [
      'Keď sa o veci dlho hovorí a nič sa nedeje.',
      'Keď je príležitosť krátka a treba konať hneď.',
      'Keď tím potrebuje prekonať strach zo začiatku.',
    ],
    risks: [
      'Vyrazíš skôr, než je jasné, kam sa ide.',
      'Rozbehneš viac vecí, než sa dá dotiahnuť.',
      'Opatrnejších ľudí môžeš tlačiť rýchlejšie, než im je príjemné.',
    ],
    develop: [
      'Pred štartom si polož tri otázky: čo je cieľ, čo je riziko, kto to dokončí.',
      'Dohodni si počet rozbehnutých vecí, ktorý neprekročíš.',
      'Vypočuj si aspoň jednu námietku, kým sa pustíš do práce.',
    ],
    examples: [
      'Pri nápade, o ktorom sa dlho hovorí, priprav do týždňa najjednoduchšiu skúšobnú verziu.',
      'Zober si na starosť prvý krok – prvý telefonát, prvý návrh, prvé stretnutie.',
      'Spoj sa s niekým, kto rád dokončuje, a rozdeľte si štart a cieľ.',
    ],
  },
  {
    id: 'vytrvalec',
    name: 'Vytrvalec',
    domain: 'realizacia',
    tagline: 'Prekážky ťa nezastavia. Idúc krok za krokom, dôjdeš tam, kde iní vzdali.',
    essence: 'vydržíš pri veci, aj keď je ťažká a trvá dlho',
    contribution: 'trpezlivosť a húževnatosť pri dlhodobom úsilí',
    description:
      'Tvojou silou je dlhý dych. Keď sa vec skomplikuje, nehľadáš únik, ale ďalší krok. Vieš pracovať na cieli, ktorého výsledok príde až o mesiace, a neúspech berieš ako súčasť cesty, nie ako jej koniec.',
    daily: [
      'Pri ťažkej hádanke alebo oprave to skúšaš znova a znova.',
      'Dlhodobé návyky – šport, jazyk, nástroj – si dokážeš udržať.',
      'Rozčítanú knihu či rozrobenú vec nerád necháš nedokončenú.',
      'Keď prší alebo sa ti nechce, aj tak ideš.',
    ],
    work: [
      'Zostávaš pri úlohe aj vtedy, keď prvé nadšenie opadlo.',
      'Po neúspechu skúšaš iný spôsob, nie inú úlohu.',
      'Zvládaš monotónne či zdĺhavé etapy, ktoré iných odradia.',
    ],
    activities: ['Dlhodobé projekty', 'Riešenie úporných problémov', 'Budovanie zručnosti tréningom', 'Práca vyžadujúca trpezlivosť', 'Dotiahnutie vecí cez náročné obdobia'],
    advantages: [
      'Keď je cieľ ďaleko a výsledky dlho nevidno.',
      'Keď prvý pokus zlyhal a treba to skúsiť znova.',
      'Keď tím stráca chuť a potrebuje vidieť, že sa to dá vydržať.',
    ],
    risks: [
      'Držíš sa cesty aj vtedy, keď by bolo rozumnejšie ju zmeniť.',
      'Prehliadaš únavu, kým sa neprejaví naplno.',
      'Môžeš mať málo pochopenia pre tých, ktorí to vzdajú skôr.',
    ],
    develop: [
      'Stanov si vopred body, v ktorých vyhodnotíš, či má zmysel pokračovať.',
      'Rozlišuj vytrvalosť v cieli od tvrdohlavosti v spôsobe.',
      'Zaraď do dlhých projektov malé oslavy medzistupňov.',
    ],
    examples: [
      'Zober si úlohu, ktorú už viacerí vzdali, a daj si na ňu vymedzený čas.',
      'Veď si záznam o malých pokrokoch – v dlhom projekte je to palivo.',
      'Pomôž niekomu udržať návyk tým, že doňho pôjdeš s ním.',
    ],
  },
  {
    id: 'improvizator',
    name: 'Improvizátor',
    domain: 'realizacia',
    tagline: 'Zmena plánu ťa nerozhodí. Pracuješ s tým, čo práve je.',
    essence: 'pohotovo reaguješ na to, čo prinesie situácia',
    contribution: 'pohotovosť a pokoj pri nečakaných zmenách',
    description:
      'Budúcnosť pre teba nie je pevná trasa, ale niečo, čo sa tvorí priebežne. Keď sa okolnosti zmenia, nezdržiavaš sa tým, čo malo byť, a hľadáš, čo sa dá urobiť teraz. V nepredvídateľnom prostredí si pokojnejší než väčšina ľudí.',
    daily: [
      'Zrušený program berieš ako príležitosť na niečo iné.',
      'Vieš uvariť z toho, čo je práve v chladničke.',
      'Na cestách ti nevadí nemať všetko vopred naplánované.',
      'Keď sa niečo pokazí, rýchlo vymyslíš náhradné riešenie.',
    ],
    work: [
      'Zmenu zadania zvládneš bez veľkého rozčuľovania.',
      'Dobre sa ti pracuje tam, kde je každý deň iný.',
      'Vieš preskakovať medzi úlohami podľa toho, čo práve horí.',
    ],
    activities: ['Riešenie nečakaných situácií', 'Práca v premenlivom prostredí', 'Operatívne rozhodovanie', 'Zákaznícka podpora a servis', 'Krízové zásahy'],
    advantages: [
      'Keď sa plán rozpadne a treba rýchlo reagovať.',
      'Keď sa podmienky menia zo dňa na deň.',
      'Keď ostatných zmena paralyzuje.',
    ],
    risks: [
      'Spoliehaš sa na improvizáciu aj tam, kde by sa dalo pripraviť.',
      'Necháš sa unášať naliehavým a dôležité odkladáš.',
      'Ľuďom, ktorí potrebujú istotu, môžeš pôsobiť nevyspytateľne.',
    ],
    develop: [
      'Maj aspoň hrubý plán – improvizuje sa ľahšie, keď vieš, od čoho sa odchyľuješ.',
      'Každý deň si urči jednu dôležitú vec, ktorú urobíš bez ohľadu na okolnosti.',
      'Včas oznám ostatným, keď meníš smer, aby s tebou stíhali.',
    ],
    examples: [
      'Prihlás sa na úlohy, kde sa nedá všetko naplánovať – podujatia, služby, práca s ľuďmi.',
      'Keď tím zaskočí zmena, povedz nahlas: „Dobre, čo sa dá urobiť hneď teraz?“',
      'Po zvládnutej nečakanej situácii si zapíš, čo zabralo – vznikne ti zásoba riešení.',
    ],
  },
];
