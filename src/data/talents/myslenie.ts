import type { Talent } from '../types';

export const MYSLENIE: Talent[] = [
  {
    id: 'analytik',
    name: 'Analytik',
    domain: 'myslenie',
    tagline: 'Potrebuješ rozumieť tomu, prečo veci fungujú tak, ako fungujú.',
    essence: 'rozkladáš veci na časti a hľadáš skutočné príčiny',
    contribution: 'schopnosť rozložiť problém na časti a nájsť jeho príčinu',
    description:
      'Povrchná odpoveď ti nestačí. Keď niečo nesedí, prirodzene začneš rozoberať, z čoho sa to skladá, čo s čím súvisí a kde je skutočná príčina. Dôveruješ tomu, čo sa dá overiť, a rozhodnutia si potrebuješ vedieť zdôvodniť.',
    daily: [
      'Pri väčšom nákupe si porovnáš parametre a recenzie, kým sa rozhodneš.',
      'Keď počuješ prekvapivé tvrdenie, pýtaš sa, z čoho vychádza.',
      'Všimneš si, keď čísla alebo fakty v príbehu nesedia.',
      'Pri chybe ťa viac než vinník zaujíma, ako presne k nej došlo.',
    ],
    work: [
      'Skôr než navrhneš riešenie, zisťuješ, čo je vlastne problém.',
      'Kolegovia za tebou chodia, keď treba niečomu prísť na koreň.',
      'Tvoje závery stoja na dátach a dajú sa spätne skontrolovať.',
    ],
    activities: ['Analýza dát', 'Hľadanie príčin problémov', 'Výskum a overovanie', 'Optimalizácia procesov', 'Vyhodnocovanie výsledkov'],
    advantages: [
      'Keď sa opakuje chyba a nikto nevie prečo.',
      'Keď treba urobiť rozhodnutie s veľkými dôsledkami.',
      'Keď sa tím rozhoduje podľa dojmov a chýbajú mu fakty.',
    ],
    risks: [
      'Analyzuješ tak dlho, že sa rozhodnutie zbytočne odkladá.',
      'Otázkami „a prečo?“ môžeš pôsobiť ako spochybňovač cudzích nápadov.',
      'Aj jednoduchú vec vieš premeniť na zložitý problém.',
    ],
    develop: [
      'Vopred si urči, koľko času a informácií si daná otázka zaslúži.',
      'Každú analýzu ukonči jednou vetou: „Odporúčam teda…“',
      'Trénuj rozhodovanie aj pri neúplných informáciách – začni pri malých veciach.',
    ],
    examples: [
      'Ponúkni sa, že po skončení projektu spíšeš, čo fungovalo, čo nie a prečo.',
      'Keď sa tím háda o názor, navrhni, aké údaje by spor rozhodli, a získaj ich.',
      'Veď si jednoduchý prehľad vlastných výdavkov alebo času a raz mesačne z neho vyvoď jednu zmenu.',
    ],
  },
  {
    id: 'strateg',
    name: 'Stratég',
    domain: 'myslenie',
    tagline: 'Vidíš viac ciest k cieľu a vieš vybrať tú, ktorá dáva najväčší zmysel.',
    essence: 'vidíš viacero ciest k cieľu a vyberáš tú najschodnejšiu',
    contribution: 'schopnosť zvážiť varianty a zvoliť najlepší postup',
    description:
      'Kým sa pohneš, premyslíš si niekoľko ťahov dopredu. Prirodzene si kladieš otázku „čo ak?“ – čo ak sa zmenia podmienky, čo ak prvý plán nevyjde. Vďaka tomu rýchlo rozlišuješ, čo je podstatné a čo len odvádza pozornosť.',
    daily: [
      'Pri plánovaní cesty máš v hlave aj náhradnú trasu.',
      'Baví ťa šach, stratégie alebo hry, kde sa oplatí myslieť dopredu.',
      'Pri dôležitom rozhodnutí si predstavíš, kam ktorá možnosť povedie.',
      'Rýchlo odhadneš, na čom celá vec stojí a padá.',
    ],
    work: [
      'Pri novom zadaní sa najprv pýtaš, čo je cieľ, až potom, čo treba urobiť.',
      'Vieš povedať, čomu sa nevenovať, aby zostali sily na to hlavné.',
      'Prekážku berieš ako dôvod zmeniť cestu, nie cieľ.',
    ],
    activities: ['Tvorba stratégií', 'Stanovovanie priorít', 'Plánovanie scenárov', 'Rozhodovanie medzi variantmi', 'Príprava na rokovania'],
    advantages: [
      'Keď je úloh priveľa a treba vybrať, na ktorých záleží.',
      'Keď sa plán zrúti a treba rýchlo nájsť inú cestu.',
      'Keď tím pracuje usilovne, ale nie je jasné, kam smeruje.',
    ],
    risks: [
      'Tvoje úvahy sú o tri kroky vpredu a ostatní nestíhajú sledovať, ako si k záveru prišiel.',
      'Premýšľanie o variantoch môže nahradiť samotný začiatok.',
      'Môžeš podceniť detaily, na ktorých plán v praxi stroskotá.',
    ],
    develop: [
      'Svoje úvahy hovor nahlas alebo kresli – ľudia potrebujú vidieť cestu, nielen záver.',
      'Ku každej stratégii dopíš prvý konkrétny krok na zajtra.',
      'Spoj sa s niekým, kto je silný v detailoch a realizácii.',
    ],
    examples: [
      'Pred väčším rozhodnutím si napíš tri varianty a pri každom, čo by muselo platiť, aby vyšiel.',
      'Navrhni tímu krátke stretnutie „čo prestaneme robiť“.',
      'Pri osobnom cieli si priprav plán B skôr, než ho budeš potrebovať.',
    ],
  },
  {
    id: 'objavitel',
    name: 'Objaviteľ',
    domain: 'myslenie',
    tagline: 'Učenie a objavovanie nových vecí ťa nabíja samo osebe.',
    essence: 'neustále sa učíš a ponáraš sa do nových tém',
    contribution: 'chuť rýchlo si naštudovať nové témy',
    description:
      'Baví ťa samotný proces spoznávania – ten moment, keď niečomu ešte nerozumieš a postupne sa to začne skladať. Nové témy ťa priťahujú, aj keď ich hneď na nič nepotrebuješ. Do neznámeho prostredia vstupuješ so zvedavosťou, nie s obavou.',
    daily: [
      'Jedno vyhľadávanie sa ti ľahko zmení na hodinu čítania o niečom úplne inom.',
      'Máš rozčítaných viac kníh, kurzov alebo podcastov naraz.',
      'V rozhovore sa pýtaš ľudí na ich prácu či záľuby, lebo ťa to naozaj zaujíma.',
      'Na dovolenke chceš vedieť, ako miesto funguje, nielen ako vyzerá.',
    ],
    work: [
      'Do nového nástroja alebo oblasti sa dostaneš rýchlejšie než ostatní.',
      'Dobrovoľne sa hlásiš na úlohy, pri ktorých sa niečo naučíš.',
      'Prinášaš do tímu poznatky z oblastí, ktoré s prácou zdanlivo nesúvisia.',
    ],
    activities: ['Výskum a rešerše', 'Zaúčanie sa do nových oblastí', 'Testovanie nových nástrojov', 'Štúdium a samovzdelávanie', 'Zber podnetov a trendov'],
    advantages: [
      'Keď sa mení odbor a treba sa rýchlo preorientovať.',
      'Keď tím potrebuje niekoho, kto si naštuduje neznámu tému.',
      'Keď rutinné riešenia prestávajú stačiť.',
    ],
    risks: [
      'Začneš veľa vecí a pri žiadnej nezostaneš dosť dlho.',
      'Zbieranie poznatkov sa stane cieľom a nič z neho nevznikne.',
      'Rutinná práca ťa rýchlo omrzí a začneš ju odkladať.',
    ],
    develop: [
      'Pri každej novej téme si povedz, na čo konkrétne ju chceš použiť.',
      'Vyber si jednu oblasť, v ktorej pôjdeš do hĺbky aspoň rok.',
      'Čo sa naučíš, do týždňa niekomu vysvetli alebo vyskúšaj v praxi.',
    ],
    examples: [
      'Ponúkni sa, že pre tím preskúmaš novú tému a zhrnieš ju na jednu stranu.',
      'Zaveď si „učebnú hodinu“ týždenne s jasnou otázkou, na ktorú hľadáš odpoveď.',
      'Zaznamenávaj si, čo si sa naučil, aby si videl pokrok aj tam, kde chýbajú známky.',
    ],
  },
  {
    id: 'novator',
    name: 'Novátor',
    domain: 'myslenie',
    tagline: 'Tam, kde iní vidia zabehnutý postup, ty vidíš, ako by to šlo inak.',
    essence: 'prichádzaš s nápadmi, ako robiť veci inak',
    contribution: 'schopnosť prísť s nečakaným, originálnym riešením',
    description:
      'Nápady k tebe prichádzajú ľahko a často. Zabehnuté postupy ťa provokujú k otázke, či by to nešlo jednoduchšie, krajšie alebo úplne inak. Baví ťa začiatok – prázdny papier, na ktorom ešte môže vzniknúť čokoľvek.',
    daily: [
      'Veci doma si prerábaš a upravuješ podľa seba.',
      'Recept či návod berieš skôr ako inšpiráciu než ako predpis.',
      'Nápady ti prichádzajú v sprche, na prechádzke aj uprostred rozhovoru.',
      'Rýchlo ťa omrzí robiť niečo stále rovnakým spôsobom.',
    ],
    work: [
      'Na poradách prinášaš návrhy, ktoré ostatným nenapadli.',
      'Keď sa povie „vždy sme to tak robili“, spozornieš.',
      'Najviac energie máš vo fáze, keď sa projekt ešte len vymýšľa.',
    ],
    activities: ['Tvorba nápadov', 'Navrhovanie nových riešení', 'Experimentovanie a prototypy', 'Kreatívna tvorba', 'Zlepšovanie zabehnutých postupov'],
    advantages: [
      'Keď sa tím zasekol a doterajšie riešenia nefungujú.',
      'Keď treba vymyslieť niečo, čím sa odlíšite.',
      'Keď je priestor skúšať a chyby sú lacné.',
    ],
    risks: [
      'Nový nápad ťa zláka skôr, než dotiahneš ten predošlý.',
      'Meníš aj veci, ktoré fungujú dobre.',
      'Kritiku nápadu môžeš brať osobne.',
    ],
    develop: [
      'Zapisuj si nápady na jedno miesto a raz týždenne vyber jeden, ktorý posunieš ďalej.',
      'Ku každému nápadu skús hneď vymyslieť najmenší možný pokus, ktorý ho overí.',
      'Hľadaj spolupracovníkov, ktorých baví dotiahnuť veci do konca.',
    ],
    examples: [
      'Navrhni malý pilot: „Skúsme to dva týždne inak a porovnajme výsledok.“',
      'Pri rutinnej úlohe si polož otázku, ktorý krok by sa dal úplne vynechať.',
      'Zober problém niekoho iného a prines mu tri rôzne smery riešenia, nie jeden.',
    ],
  },
  {
    id: 'syntetik',
    name: 'Syntetik',
    domain: 'myslenie',
    tagline: 'V jednotlivostiach vidíš vzorce a z útržkov skladáš celok.',
    essence: 'spájaš zdanlivo nesúvisiace veci do zrozumiteľného celku',
    contribution: 'schopnosť vidieť súvislosti a celkový obraz',
    description:
      'Tvoja myseľ prirodzene hľadá, čo majú veci spoločné. Kým iní vidia desať samostatných faktov, ty vidíš jeden princíp, ktorý ich vysvetľuje. Baví ťa uvažovať v pojmoch, modeloch a prirovnaniach a potrebuješ čas na premýšľanie osamote.',
    daily: [
      'Často povieš „to mi pripomína…“ a prepojíš dve vzdialené oblasti.',
      'Pri filme alebo knihe ťa zaujíma myšlienka za príbehom.',
      'Na vysvetlenie si pomáhaš prirovnaním alebo náčrtom.',
      'Dlhá prechádzka s vlastnými myšlienkami je pre teba oddych, nie nuda.',
    ],
    work: [
      'Z dlhej diskusie vieš vytiahnuť, o čo v nej vlastne ide.',
      'Všimneš si, že dva tímy riešia ten istý problém pod iným názvom.',
      'Zložitú tému vieš zhrnúť do jednoduchej schémy.',
    ],
    activities: ['Tvorba konceptov a modelov', 'Sumarizovanie zložitých tém', 'Navrhovanie systémov', 'Prepájanie poznatkov z rôznych oblastí', 'Písanie odborných a úvahových textov'],
    advantages: [
      'Keď je informácií priveľa a nikto nevidí celok.',
      'Keď treba zložitú vec vysvetliť ľuďom mimo odboru.',
      'Keď sa rieši dôsledok a príčina leží v inej časti systému.',
    ],
    risks: [
      'Zostaneš v abstraktnej rovine a ostatní nevedia, čo s tým prakticky urobiť.',
      'Vidíš súvislosti aj tam, kde ide len o náhodu.',
      'Premýšľanie ťa pohltí natoľko, že unikáš od bežných povinností.',
    ],
    develop: [
      'Ku každej myšlienke pridaj konkrétny príklad z praxe.',
      'Over si svoje „vzorce“ na faktoch alebo u niekoho, kto pozná detaily.',
      'Vyhraď si na premýšľanie pevný čas, aby nevytláčalo všetko ostatné.',
    ],
    examples: [
      'Po dlhej porade pošli ostatným tri vety: čo sme zistili, čo z toho vyplýva, čo ďalej.',
      'Nakresli mapu toho, ako spolu súvisia časti projektu, a ukáž ju tímu.',
      'Veď si poznámky, v ktorých prepájaš myšlienky z rôznych kníh a oblastí.',
    ],
  },
  {
    id: 'vizionar',
    name: 'Vizionár',
    domain: 'myslenie',
    tagline: 'Žiješ aj v tom, čo ešte nie je – a vieš si to živo predstaviť.',
    essence: 'premýšľaš o tom, čo by mohlo byť o pár rokov',
    contribution: 'schopnosť predstaviť si budúcnosť a dať veciam smer',
    description:
      'Prítomnosť je pre teba východisko, nie hranica. Prirodzene si predstavuješ, ako by veci mohli vyzerať o rok, o päť či o desať rokov, a táto predstava ťa ťahá dopredu. Všímaš si prvé náznaky zmien skôr, než sa stanú zrejmými.',
    daily: [
      'Radšej hovoríš o plánoch a možnostiach než o tom, čo bolo.',
      'Máš jasnú predstavu, kde by si chcel byť o pár rokov.',
      'Sleduješ, kam sa uberá technológia, spoločnosť alebo tvoj odbor.',
      'Keď sa niečo nedarí, pomáha ti myslieť na to, k čomu to celé vedie.',
    ],
    work: [
      'Pýtaš sa, či dnešné rozhodnutie bude dávať zmysel aj o tri roky.',
      'Vieš ľuďom opísať, ako bude vyzerať hotový výsledok.',
      'Upozorníš na trend, ktorý ostatní ešte neberú vážne.',
    ],
    activities: ['Tvorba vízie a dlhodobých cieľov', 'Sledovanie trendov', 'Plánovanie rozvoja', 'Navrhovanie nových smerov', 'Inšpirovanie tímu cieľom'],
    advantages: [
      'Keď organizácia alebo človek stojí na križovatke.',
      'Keď každodenná práca stráca zmysel a treba pripomenúť, kam vedie.',
      'Keď sa blíži zmena, na ktorú sa dá pripraviť vopred.',
    ],
    risks: [
      'Prítomné povinnosti zanedbáš v prospech budúcich snov.',
      'Tvoje predstavy môžu ostatným znieť nereálne, ak chýba cesta k nim.',
      'Si netrpezlivý, keď realita postupuje pomalšie než tvoja predstava.',
    ],
    develop: [
      'Víziu rozdeľ na etapy a pomenuj, čo sa má stať do troch mesiacov.',
      'Opisuj budúcnosť konkrétne – čo ľudia uvidia, budú robiť, čo sa zmení.',
      'Pravidelne si porovnávaj, ktoré tvoje odhady vyšli a ktoré nie.',
    ],
    examples: [
      'Napíš si na jednu stranu, ako má vyzerať tvoj bežný deň o tri roky, a vyvoď z toho prvý krok.',
      'Na začiatku projektu opíš tímu „deň po úspešnom dokončení“.',
      'Raz za štvrťrok si poznač tri zmeny vo svojom odbore a čo z nich pre teba vyplýva.',
    ],
  },
  {
    id: 'posudzovatel',
    name: 'Posudzovateľ',
    domain: 'myslenie',
    tagline: 'Zachováš si chladnú hlavu a posudzuješ veci podľa faktov, nie podľa nálady.',
    essence: 'triezvo zvažuješ fakty a nedáš sa strhnúť dojmom',
    contribution: 'triezvy, nezaujatý úsudok a zmysel pre riziká',
    description:
      'Keď sa ostatní nadchýnajú alebo panikária, ty si zachovávaš odstup. Prirodzene oddeľuješ fakty od dojmov a želaní, zvažuješ pre aj proti a neponáhľaš sa so súdom. Ľudia sa na tvoj úsudok spoliehajú, lebo vedia, že nie je zafarbený sympatiami.',
    daily: [
      'Pri spore si vypočuješ obe strany, kým si urobíš názor.',
      'Reklamné sľuby a „zaručené“ správy berieš s rezervou.',
      'Dôležité rozhodnutie si necháš prejsť hlavou do druhého dňa.',
      'Priatelia sa ťa pýtajú na názor, keď chcú počuť pravdu, nie útechu.',
    ],
    work: [
      'V návrhu nájdeš slabé miesto skôr, než narobí škodu.',
      'Hodnotíš prácu podľa kritérií, nie podľa toho, kto ju odovzdal.',
      'V napätej situácii vraciaš diskusiu k tomu, čo naozaj vieme.',
    ],
    activities: ['Posudzovanie návrhov a rizík', 'Hodnotenie a spätná väzba', 'Kontrola a audit', 'Výber z viacerých ponúk', 'Rozhodovanie sporných prípadov'],
    advantages: [
      'Keď je tím príliš nadšený a nevidí riziká.',
      'Keď treba spravodlivo rozhodnúť medzi ľuďmi alebo návrhmi.',
      'Keď emócie zatieňujú fakty.',
    ],
    risks: [
      'Tvoja zdržanlivosť môže pôsobiť chladne alebo ako nezáujem.',
      'Hľadaním slabín vieš schladiť aj dobrý nápad priskoro.',
      'Opatrnosť ťa môže zdržať pri príležitosti, ktorá si žiada odvahu.',
    ],
    develop: [
      'Pri hodnotení najprv povedz, čo je na veci dobré, až potom riziká.',
      'Popri faktoch sa pýtaj aj na to, ako sa s rozhodnutím ľudia cítia.',
      'Rozlišuj, kedy je čas posudzovať a kedy nechať nápad najprv vyrásť.',
    ],
    examples: [
      'Ponúkni sa ako „oponent“ dôležitého návrhu – nájdi tri riziká a ku každému opatrenie.',
      'Pri výbere medzi možnosťami zostav kritériá ešte predtým, než uvidíš ponuky.',
      'Keď sa známy rozhoduje v emóciách, pomôž mu spísať, čo je fakt a čo domnienka.',
    ],
  },
];
