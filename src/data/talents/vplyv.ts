import type { Talent } from '../types';

export const VPLYV: Talent[] = [
  {
    id: 'formulator',
    name: 'Formulátor',
    domain: 'vplyv',
    tagline: 'Vieš dať myšlienkam slová, ktorým ľudia rozumejú a ktoré si zapamätajú.',
    essence: 'vieš veci pomenovať tak, že im ľudia hneď rozumejú',
    contribution: 'schopnosť vyjadriť myšlienku jasne a pútavo',
    description:
      'Záleží ti na tom, ako sa veci povedia. Hľadáš presné slovo, výstižný príklad či príbeh, vďaka ktorému myšlienka ožije. Nezáleží na tom, či hovoríš pred ľuďmi alebo píšeš v tichu – tvojou silou je, že zložité sa po tvojom vysvetlení zdá jednoduché.',
    daily: [
      'Správu či príspevok si prepíšeš, kým neznie tak, ako chceš.',
      'Zážitok vieš vyrozprávať tak, že ho ostatní vidia pred sebou.',
      'Všímaš si pekné formulácie a zapamätáš si ich.',
      'Ľudia ťa prosia, aby si im pomohol niečo napísať alebo sformulovať.',
    ],
    work: [
      'Tvoje e-maily a zhrnutia netreba čítať dvakrát.',
      'Vieš prekladať medzi „odborníkmi“ a „bežnými ľuďmi“.',
      'Prezentáciu staviaš okolo príkladu alebo príbehu, nie okolo odrážok.',
    ],
    activities: ['Písanie a tvorba obsahu', 'Prezentovanie', 'Vysvetľovanie zložitých tém', 'Príprava prejavov a podkladov', 'Moderovanie diskusií'],
    advantages: [
      'Keď dobrá myšlienka zapadá, lebo ju nikto nevie podať.',
      'Keď treba zložitú zmenu vysvetliť mnohým ľuďom.',
      'Keď nedorozumenie vzniká z nejasných slov.',
    ],
    risks: [
      'Forma ti môže zatieniť obsah.',
      'Hovoríš alebo píšeš viac, než treba.',
      'Dobrá formulácia vie zakryť, že vec ešte nie je domyslená.',
    ],
    develop: [
      'Pred hovorením si ujasni jednu vetu, ktorú si má poslucháč odniesť.',
      'Trénuj stručnosť – skús to isté povedať na polovičnom priestore.',
      'Počúvaj rovnako pozorne, ako hovoríš.',
    ],
    examples: [
      'Ponúkni sa, že spíšeš zhrnutie alebo oznam, ktorý majú pochopiť všetci.',
      'Pomôž kolegovi premeniť jeho odborný podklad na zrozumiteľný príbeh.',
      'Píš si – blog, denník, poznámky. Formulovanie je sval, ktorý rastie používaním.',
    ],
  },
  {
    id: 'obhajca',
    name: 'Obhajca',
    domain: 'vplyv',
    tagline: 'Keď niečomu veríš, vieš pre to získať aj ostatných.',
    essence: 'vieš ľudí získať pre myšlienku, ktorej veríš',
    contribution: 'schopnosť argumentovať a získať ľudí pre vec',
    description:
      'Nestačí ti mať pravdu potichu. Keď si o niečom presvedčený, prirodzene hľadáš argumenty, ktoré zaberú práve na daného človeka, a baví ťa moment, keď sa niekto prikloní na tvoju stranu. Nesúhlas ťa neodradí – berieš ho ako pozvanie do debaty.',
    daily: [
      'Vieš presvedčiť partiu, kam sa pôjde alebo na čo sa bude pozerať.',
      'V debate ťa baví hľadať argument, ktorý druhého zaskočí.',
      'Dobrú vec – knihu, miesto, nápad – odporúčaš tak, že ju ľudia naozaj skúsia.',
      'Zastaneš sa veci alebo človeka, aj keď je väčšina proti.',
    ],
    work: [
      'Návrh neprednesieš len tak – pripravíš si, prečo by ho mali prijať.',
      'Odhadneš, čo je pre koho dôležité, a podľa toho argumentuješ.',
      'Námietky vopred čakáš a máš na ne odpoveď.',
    ],
    activities: ['Predaj a obchod', 'Presadzovanie návrhov a zmien', 'Získavanie podpory a zdrojov', 'Argumentácia a debata', 'Zastupovanie záujmov iných'],
    advantages: [
      'Keď dobrý nápad potrebuje získať podporu rozhodujúcich ľudí.',
      'Keď treba ľudí pohnúť k zmene, do ktorej sa im nechce.',
      'Keď niekto potrebuje, aby sa ho niekto zastal.',
    ],
    risks: [
      'Presviedčaš aj vtedy, keď by bolo lepšie počúvať.',
      'Túžba vyhrať debatu prevýši záujem o pravdu.',
      'Ľudia môžu mať pocit, že ich do niečoho tlačíš.',
    ],
    develop: [
      'Najprv sa pýtaj a počúvaj – najsilnejší argument je ten, ktorý vychádza z potrieb druhého.',
      'Presadzuj len to, za čím si naozaj stojíš.',
      'Nechaj ľuďom priestor povedať „nie“ – dôvera je cennejšia než jeden súhlas.',
    ],
    examples: [
      'Zober dobrý nápad tichého kolegu a pomôž mu ho presadiť.',
      'Pred dôležitým návrhom si spíš tri najpravdepodobnejšie námietky a odpovede na ne.',
      'Zapoj sa do aktivity, kde treba získavať podporu – zbierka, kampaň, študentský projekt.',
    ],
  },
  {
    id: 'kormidelnik',
    name: 'Kormidelník',
    domain: 'vplyv',
    tagline: 'Keď skupina nevie, kam ísť, prirodzene sa chopíš kormidla.',
    essence: 'preberáš vedenie, keď skupina potrebuje smer',
    contribution: 'schopnosť prevziať vedenie a dať skupine smer',
    description:
      'Bezvládie ti je nepríjemné. Keď skupina prešľapuje na mieste, ozveš sa, pomenuješ, čo treba urobiť, a ľudia sa k tebe prirodzene pridajú. Neprekáža ti byť vidieť ani niesť tlak, ktorý k vedeniu patrí.',
    daily: [
      'V skupine si často ten, kto povie, ako sa to spraví.',
      'Keď sa nikto nemá k činu, ujmeš sa toho ty.',
      'Otvorene povieš, čo si myslíš, aj keď to nie je populárne.',
      'Ľudia sa na teba v nejasnej situácii obracajú pohľadom.',
    ],
    work: [
      'Na porade bez vedenia začneš určovať smer.',
      'Neuhýbaš pred konfrontáciou, keď je potrebná.',
      'Vieš ľuďom povedať, čo od nich očakávaš.',
    ],
    activities: ['Vedenie tímu', 'Vedenie porád a projektov', 'Riadenie v kríze', 'Zastupovanie skupiny navonok', 'Stanovovanie smeru a očakávaní'],
    advantages: [
      'Keď je situácia nejasná a niekto musí určiť smer.',
      'Keď treba otvoriť nepríjemnú tému.',
      'Keď skupina potrebuje hlas, ktorý ju bude zastupovať.',
    ],
    risks: [
      'Preberieš vedenie aj tam, kde už niekto vedie.',
      'Tichší ľudia sa pri tebe nedostanú k slovu.',
      'Priamosť môže vyznieť ako tvrdosť.',
    ],
    develop: [
      'Skôr než určíš smer, opýtaj sa aspoň dvoch ľudí na ich pohľad.',
      'Vedome nechávaj viesť aj iných – a podpor ich.',
      'K jasnému slovu pridaj aj záujem o to, ako ho druhý prijal.',
    ],
    examples: [
      'Ponúkni sa viesť úlohu, ktorú nikto nechce a ktorá potrebuje jasné vedenie.',
      'Keď sa diskusia točí v kruhu, zhrň možnosti a navrhni rozhodnutie.',
      'Vyskúšaj si vedenie v bezpečnom prostredí – krúžok, dobrovoľnícka akcia, študentský tím.',
    ],
  },
  {
    id: 'sutazivec',
    name: 'Súťaživec',
    domain: 'vplyv',
    tagline: 'Porovnanie s ostatnými ťa nabíja. Keď sa meria, chceš byť vpredu.',
    essence: 'ženie ťa túžba byť medzi najlepšími',
    contribution: 'ťah na víťazstvo a chuť prekonávať laťku',
    description:
      'Výkon pre teba dostáva zmysel v porovnaní. Prirodzene sleduješ, ako si na tom oproti iným, a pomyslenie, že by to šlo lepšie, ťa ženie dopredu. Súťaž ti dodáva energiu – a prehra ťa mrzí natoľko, že si z nej zoberieš ponaučenie.',
    daily: [
      'Aj spoločenskú hru hráš tak, aby si vyhral.',
      'Sleduješ svoje časy, skóre alebo poradie.',
      'Výkon niekoho lepšieho ťa skôr vyprovokuje než odradí.',
      'Prehru si v hlave prehrávaš a hľadáš, čo nabudúce zmeniť.',
    ],
    work: [
      'Zaujímajú ťa rebríčky a porovnania – a kde v nich stojíš.',
      'Pri výberovom konaní či súťaži podávaš najlepší výkon.',
      'Vieš vyburcovať tím slovami „toto vyhráme“.',
    ],
    activities: ['Obchod a plnenie cieľov', 'Súťaže a výberové konania', 'Šport a výkonnostné disciplíny', 'Práca s merateľnými výsledkami', 'Prekonávanie konkurencie'],
    advantages: [
      'Keď treba zabojovať o zákazku, miesto alebo ocenenie.',
      'Keď tím upadol do pohodlia a potrebuje laťku.',
      'Keď sa výkon dá merať a porovnávať.',
    ],
    risks: [
      'Zo spolupracovníkov sa stávajú súperi.',
      'Vyhýbaš sa tomu, v čom nemôžeš vyhrať.',
      'Tvoju hodnotu začne určovať poradie.',
    ],
    develop: [
      'Súťaž najmä so svojím včerajším výkonom.',
      'Vyberaj si súperov, od ktorých sa môžeš učiť.',
      'V tíme smeruj súťaživosť von – proti cieľu, nie proti kolegom.',
    ],
    examples: [
      'Premeň nudnú úlohu na výzvu s merateľným cieľom a časovým limitom.',
      'Nájdi si niekoho o stupeň lepšieho a navrhni mu priateľské meranie síl.',
      'Prihlás sa do súťaže alebo výzvy vo svojom odbore – termín a porovnanie ťa posunú.',
    ],
  },
  {
    id: 'rozhodny',
    name: 'Rozhodný',
    domain: 'vplyv',
    tagline: 'Vieš sa rozhodnúť aj bez záruk – a za svojím rozhodnutím si stojíš.',
    essence: 'rozhoduješ sa s istotou a nesieš za to dôsledky',
    contribution: 'vnútorná istota a ochota rozhodnúť',
    description:
      'Máš vnútorný kompas, ktorému dôveruješ. Nepotrebuješ, aby ti rozhodnutie niekto schválil, ani istotu, že vyjde. Vieš povedať „ideme touto cestou“, niesť za to zodpovednosť a nenechať sa rozkolísať každou pochybnosťou.',
    daily: [
      'Rozhoduješ sa rýchlo a k rozhodnutému sa nevraciaš.',
      'Cudzie rady si vypočuješ, ale riadiš sa vlastným úsudkom.',
      'Nevadí ti ísť inou cestou než väčšina.',
      'V neznámej situácii si veríš, že si poradíš.',
    ],
    work: [
      'Keď treba rozhodnúť, nehľadáš, na koho by sa to dalo presunúť.',
      'Zvládaš riziko a neistotu bez toho, aby ťa ochromili.',
      'Tvoj pokoj dodáva istotu aj ostatným.',
    ],
    activities: ['Rozhodovanie pod tlakom', 'Samostatné vedenie projektov', 'Podnikanie', 'Krízové riadenie', 'Práca s rizikom a neistotou'],
    advantages: [
      'Keď chýbajú informácie a rozhodnúť sa aj tak musí.',
      'Keď sa tím bojí zodpovednosti za krok do neznáma.',
      'Keď treba ustáť tlak a nesúhlas okolia.',
    ],
    risks: [
      'Prepočuješ varovanie, ktoré si mal počuť.',
      'Ťažko priznávaš, že rozhodnutie bolo zlé.',
      'Ostatní sa pri tebe prestanú ozývať s pochybnosťami.',
    ],
    develop: [
      'Pri veľkých rozhodnutiach si vyžiadaj jeden nesúhlasný názor.',
      'Vopred si urči, podľa čoho spoznáš, že treba zmeniť kurz.',
      'Hovor nahlas aj o svojich omyloch – istote to neuberá, dôvere pridáva.',
    ],
    examples: [
      'Ponúkni sa rozhodnúť tam, kde sa tím zasekol medzi dvoma rovnocennými možnosťami.',
      'Zober si úlohu s nejasným zadaním, pri ktorej si cestu určuješ sám.',
      'Pomôž nerozhodnému priateľovi – nie radou, ale otázkou, čo by spravil, keby sa nemohol pomýliť.',
    ],
  },
  {
    id: 'povzbudzovac',
    name: 'Povzbudzovač',
    domain: 'vplyv',
    tagline: 'Tvoja energia je nákazlivá. Vieš ľudí nadchnúť a dodať im chuť.',
    essence: 'dodávaš ľuďom chuť a energiu pustiť sa do veci',
    contribution: 'schopnosť nadchnúť ľudí a zdvihnúť im energiu',
    description:
      'Prirodzene vidíš to, čo sa dá, a vieš to preniesť na ostatných. Keď skupina stráca chuť, nájdeš slová, vtip alebo gesto, ktoré ju zdvihnú. Radosť z úspechu – vlastného aj cudzieho – dávaš najavo a tým ho násobíš.',
    daily: [
      'Keď sa niekomu niečo podarí, povieš mu to nahlas.',
      'Vieš rozbehnúť partiu, ktorá sa nevie rozhýbať.',
      'Aj v nepríjemnej situácii nájdeš niečo, čo sa dá oceniť.',
      'Ľudia hovoria, že po rozhovore s tebou majú viac chuti do vecí.',
    ],
    work: [
      'Vieš tímu pripomenúť, prečo sa to celé oplatí.',
      'Oslavuješ malé víťazstvá a iných to ťahá ďalej.',
      'Po neúspechu pomáhaš ľuďom znova sa postaviť.',
    ],
    activities: ['Motivovanie tímu', 'Vedenie tréningov a workshopov', 'Rozbiehanie spoločných aktivít', 'Podpora pri zmenách', 'Budovanie tímového ducha'],
    advantages: [
      'Keď tím prechádza ťažkým obdobím a stráca chuť.',
      'Keď treba ľudí získať pre niečo nové.',
      'Keď dobrá práca zostáva bez povšimnutia.',
    ],
    risks: [
      'Nadšením prekryješ problém, ktorý treba riešiť.',
      'Stále pozitívny tón môže znieť neúprimne.',
      'Ťaháš náladu ostatných na úkor vlastných síl.',
    ],
    develop: [
      'Chváľ konkrétne – čo presne sa podarilo a prečo na tom záleží.',
      'Daj priestor aj ťažkým pocitom, kým začneš povzbudzovať.',
      'Dopĺňaj si vlastnú energiu, aby si ju mal z čoho rozdávať.',
    ],
    examples: [
      'Na konci týždňa napíš jednému človeku, čo sa mu podľa teba podarilo.',
      'Keď tím začína náročný projekt, ujmi sa úvodu a pripomeň, čo už spolu zvládol.',
      'Pridaj sa k niekomu, kto sa bojí začať – cvičiť, učiť sa, vystúpiť – ako jeho „doping“.',
    ],
  },
  {
    id: 'vyjednavac',
    name: 'Vyjednávač',
    domain: 'vplyv',
    tagline: 'V rozdielnych záujmoch hľadáš dohodu, s ktorou sa dá žiť na oboch stranách.',
    essence: 'hľadáš dohody, pri ktorých získajú obe strany',
    contribution: 'cit pre dohodu a vyváženie rôznych záujmov',
    description:
      'Rozdielne záujmy pre teba nie sú prekážka, ale úloha. Zaujíma ťa, čo kto naozaj potrebuje, kde sa dá ustúpiť a kde nie, a baví ťa skladať riešenie, ktoré podpíšu obe strany. Vieš trpezlivo stáť za svojím a pritom nezhodiť most.',
    daily: [
      'Baví ťa dohodnúť lepšiu cenu alebo podmienky.',
      'Pri delení úloh či nákladov navrhneš kľúč, ktorý všetci prijmú.',
      'Skôr než povieš svoju požiadavku, zisťuješ, o čo ide druhému.',
      'Vieš, kedy pritlačiť a kedy počkať.',
    ],
    work: [
      'Na rokovanie ideš s jasným cieľom aj s hranicou, pod ktorú nepôjdeš.',
      'Hľadáš, čo môžeš ponúknuť, aby si získal, čo potrebuješ.',
      'Vieš uzavrieť dohodu, na ktorej sa ostatní zasekli.',
    ],
    activities: ['Vyjednávanie podmienok a zmlúv', 'Nákup a obchodné rokovania', 'Dohody medzi tímami', 'Zastupovanie záujmov', 'Riešenie sporov o zdroje'],
    advantages: [
      'Keď dve strany chcú zdanlivo nezlučiteľné veci.',
      'Keď treba získať lepšie podmienky bez pokazenia vzťahu.',
      'Keď sa tímy sporia o čas, ľudí alebo peniaze.',
    ],
    risks: [
      'Vyjednávaš aj tam, kde by stačilo jednoducho sa opýtať alebo dať.',
      'Kompromis sa ti stane cieľom, hoci jedna strana má pravdu.',
      'Ľudia môžu mať pocit, že s nimi stále „hráš partiu“.',
    ],
    develop: [
      'Pred rokovaním si spíš záujmy oboch strán, nielen ich požiadavky.',
      'Rozlišuj, kde ide o dohodu a kde o princíp, z ktorého sa neustupuje.',
      'Hovor otvorene, o čo ti ide – priehľadnosť zvyšuje dôveru.',
    ],
    examples: [
      'Ponúkni sa ako sprostredkovateľ, keď sa dva tímy nevedia dohodnúť na prioritách.',
      'Pri najbližšej zmluve, nájme alebo nákupe si priprav tri veci, ktoré môžeš ponúknuť výmenou.',
      'Trénuj v malom – dohodni výmenu služieb, úpravu termínu, rozdelenie práce.',
    ],
  },
];
