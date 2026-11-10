import type { Question, QuestionType } from './types';

/**
 * BANKA OTÁZOK (84 položiek)
 *
 * Dizajn (každý talent má v teste presne 7 príležitostí):
 *  - 28 párov VNÚTRI domény  (každý talent 2×) – jemné rozlíšenie príbuzných talentov
 *  - 14 párov NAPRIEČ doménami (každý talent 1×)
 *  - 14 situačných otázok, jedna možnosť z každej domény (každý talent 2×)
 *  - 14 otázok o energii, 2 + 2 talenty z dvoch domén (každý talent 2×)
 *  - 14 záložných párov (form: 'reserve', každý talent 1×) – do testu nevstupujú
 *
 * Pridanie otázky: stačí doplniť položku nižšie. Vyváženosť banky overuje
 * `npm run qa` (src/lib/questionQuality.ts).
 */

type Opt = [text: string, talent: string];

function make(id: string, type: QuestionType, form: Question['form'], prompt: string, opts: Opt[]): Question {
  return {
    id,
    type,
    form,
    prompt,
    options: opts.map(([text, talent], i) => ({ id: `${id}-${'abcd'[i]}`, text, talent })),
  };
}

const pair = (id: string, prompt: string, a: Opt, b: Opt, form: Question['form'] = 'core') =>
  make(id, 'pair', form, prompt, [a, b]);
const situation = (id: string, prompt: string, ...opts: Opt[]) => make(id, 'situation', 'core', prompt, opts);
const energy = (id: string, prompt: string, ...opts: Opt[]) => make(id, 'energy', 'core', prompt, opts);

/* ------------------------------------------------------------------ */
/* 1. Páry vnútri domény                                               */
/* ------------------------------------------------------------------ */

export const WITHIN_PAIRS: Question[] = [
  // Myslenie
  pair('w01', 'Známy ti nadšene ukáže ponuku, ktorá vyzerá až príliš dobre.',
    ['Začnem zisťovať, ako to presne funguje a z čoho sa tá cena skladá.', 'analytik'],
    ['Pripomeniem mu, čo všetko sa môže pokaziť, a poradím, nech sa neponáhľa.', 'posudzovatel']),
  pair('w02', 'Pred dôležitým rozhodnutím…',
    ['…si triezvo spíšem, čo hovorí za a čo proti.', 'posudzovatel'],
    ['…si premyslím niekoľko možných ciest a kam každá povedie.', 'strateg']),
  pair('w03', 'Keď premýšľam, čo ďalej…',
    ['…hľadám najšikovnejší spôsob, ako sa dostať k tomu, čo chcem.', 'strateg'],
    ['…predstavujem si, ako by môj život či práca mohli vyzerať o niekoľko rokov.', 'vizionar']),
  pair('w04', 'Viac ma baví…',
    ['…predstavovať si, kam sa veci časom vyvinú.', 'vizionar'],
    ['…vymýšľať, ako by sa niečo dalo robiť úplne inak už teraz.', 'novator']),
  pair('w05', 'Keď mám voľné popoludnie len pre seba…',
    ['…najradšej niečo vymýšľam alebo tvorím po svojom.', 'novator'],
    ['…najradšej sa ponorím do témy, o ktorej zatiaľ veľa neviem.', 'objavitel']),
  pair('w06', 'Na dobrej knihe alebo prednáške si najviac cením…',
    ['…že sa dozviem niečo úplne nové.', 'objavitel'],
    ['…že mi pomôže pochopiť, ako veci spolu súvisia.', 'syntetik']),
  pair('w07', 'Keď sa snažím niečomu porozumieť…',
    ['…hľadám celkový obraz a princíp, ktorý to celé vysvetľuje.', 'syntetik'],
    ['…rozoberiem si to na časti a každú preskúmam zvlášť.', 'analytik']),

  // Realizácia
  pair('w08', 'Pri práci ma najviac poháňa…',
    ['…pocit, že každý deň niečo uzavriem.', 'tahun'],
    ['…vedomie, že nepoľavím, aj keď to trvá dlho.', 'vytrvalec']),
  pair('w09', 'Keď sa mi do rozrobenej veci už nechce, pokračujem najmä preto…',
    ['…že nechcem vzdať to, do čoho som sa raz pustil.', 'vytrvalec'],
    ['…že sľub je sľub.', 'garant']),
  pair('w10', 'Keď odovzdávam prácu, najviac mi záleží na tom…',
    ['…aby bola načas a presne tak, ako sme sa dohodli.', 'garant'],
    ['…aby v nej nebola jediná chyba, aj keby si ju nikto nevšimol.', 'detailista']),
  pair('w11', 'Pri príprave väčšej akcie by mi najviac sedelo…',
    ['…doladiť drobnosti, aby všetko vyzeralo a fungovalo bezchybne.', 'detailista'],
    ['…zostaviť celkový plán: čo, kedy a v akom poradí sa má stať.', 'organizator']),
  pair('w12', 'Na výlet do neznámeho mesta…',
    ['…idem s pripraveným programom a rezerváciami.', 'organizator'],
    ['…idem bez plánu a rozhodujem sa podľa toho, čo ma na mieste zaujme.', 'improvizator']),
  pair('w13', 'Lepšie sa cítim, keď…',
    ['…pohotovo reagujem na to, čo deň prinesie.', 'improvizator'],
    ['…sám rozbieham niečo, čo tu predtým nebolo.', 'starter']),
  pair('w14', 'Väčšiu radosť mi robí…',
    ['…chvíľa, keď sa nová vec konečne rozbehne.', 'starter'],
    ['…chvíľa, keď je vec hotová a môžem ju uzavrieť.', 'tahun']),

  // Vplyv
  pair('w15', 'Keď niekomu hovorím o veci, ktorá ma zaujala, ide mi najmä o to…',
    ['…aby jej dobre porozumel.', 'formulator'],
    ['…aby ju začal vidieť tak ako ja.', 'obhajca']),
  pair('w16', 'Keď má niekto iný názor než ja…',
    ['…hľadám argument, ktorým ho získam na svoju stranu.', 'obhajca'],
    ['…hľadám riešenie, v ktorom si každý nájde to svoje.', 'vyjednavac']),
  pair('w17', 'Keď sa skupina nevie zhodnúť, čo ďalej…',
    ['…zisťujem, čo kto potrebuje, a skladám z toho dohodu.', 'vyjednavac'],
    ['…poviem, ako to urobíme, a ujmem sa toho.', 'kormidelnik']),
  pair('w18', 'V situácii, kde nikto nevie, čo robiť…',
    ['…si vezmem slovo a začnem ľudí usmerňovať.', 'kormidelnik'],
    ['…sa pokojne rozhodnem za seba a idem svojou cestou.', 'rozhodny']),
  pair('w19', 'Viac ma vystihuje…',
    ['…nepotrebujem sa s nikým porovnávať, verím vlastnému úsudku.', 'rozhodny'],
    ['…najlepší výkon podám, keď mám s kým merať sily.', 'sutazivec']),
  pair('w20', 'Pri spoločnej hre alebo športe…',
    ['…mi ide hlavne o to vyhrať.', 'sutazivec'],
    ['…som ten, kto ostatných hecuje a dvíha im náladu.', 'povzbudzovac']),
  pair('w21', 'Keď chcem niekomu pomôcť s ťažkou úlohou…',
    ['…dodám mu chuť a vieru, že to zvládne.', 'povzbudzovac'],
    ['…vysvetlím mu ju tak, aby jej rozumel.', 'formulator']),

  // Vzťahy
  pair('w22', 'Keď má niekto blízky ťažký deň…',
    ['…snažím sa pochopiť, čo prežíva, a vypočuť ho.', 'vnimavec'],
    ['…spýtam sa, čo treba urobiť, a urobím to.', 'opora']),
  pair('w23', 'Keď si niekto nevie poradiť s úlohou…',
    ['…pomôžem mu s ňou, nech to má za sebou.', 'opora'],
    ['…ukážem mu postup, aby to nabudúce zvládol sám.', 'sprievodca']),
  pair('w24', 'V skupine ma viac teší…',
    ['…keď vidím, ako sa jednotlivci zlepšujú.', 'sprievodca'],
    ['…keď cítim, že ťaháme za jeden povraz.', 'timovy']),
  pair('w25', 'Na väčšom podujatí…',
    ['…sa držím svojej partie a užívam si, že sme spolu.', 'timovy'],
    ['…s chuťou spoznávam ľudí, ktorých ešte nepoznám.', 'prepajac']),
  pair('w26', 'Vo vzťahoch mi viac sedí…',
    ['…poznať veľa ľudí z rôznych kruhov.', 'prepajac'],
    ['…mať zopár ľudí, s ktorými si poviem naozaj všetko.', 'dovernik']),
  pair('w27', 'Keď mi priateľ urobí niečo, čo ma zamrzí…',
    ['…otvorene mu to poviem, úprimnosť je pre mňa základ.', 'dovernik'],
    ['…skôr to prejdem, pokoj medzi nami je pre mňa dôležitejší.', 'zmierovatel']),
  pair('w28', 'Keď sa dvaja ľudia v mojej blízkosti pohádajú…',
    ['…snažím sa ich upokojiť a nájsť, na čom sa zhodnú.', 'zmierovatel'],
    ['…všímam si najmä to, ako sa každý z nich cíti a čo ho ranilo.', 'vnimavec']),
];

/* ------------------------------------------------------------------ */
/* 2. Páry naprieč doménami                                            */
/* ------------------------------------------------------------------ */

export const CROSS_PAIRS: Question[] = [
  pair('x01', 'Keď dostanem novú úlohu…',
    ['…najprv chcem pochopiť, v čom presne spočíva a prečo vznikla.', 'analytik'],
    ['…hneď rozmýšľam, ako ju čo najskôr dotiahnuť do konca.', 'tahun']),
  pair('x02', 'Pri spoločnom projekte ma viac baví…',
    ['…rozmýšľať, ktorou cestou sa oplatí ísť.', 'strateg'],
    ['…rozvrhnúť, kto čo urobí a dokedy.', 'organizator']),
  pair('x03', 'Ponúknu mi dve úlohy. Vyberiem si tú…',
    ['…pri ktorej sa naučím niečo nové, aj keď neviem, ako dopadne.', 'objavitel'],
    ['…ktorú mi niekto zveril, lebo vie, že ju nenechám tak.', 'garant']),
  pair('x04', 'Keď pracujem na niečom vlastnom…',
    ['…baví ma skúšať nezvyčajné postupy, aj za cenu chýb.', 'novator'],
    ['…baví ma vybrúsiť to tak, aby sa na tom nedala nájsť chyba.', 'detailista']),
  pair('x05', 'Keď sa objaví zaujímavá myšlienka…',
    ['…potrebujem si ju najprv v pokoji premyslieť zo všetkých strán.', 'syntetik'],
    ['…najradšej ju hneď vyskúšam v praxi.', 'starter']),
  pair('x06', 'Viac mi ide…',
    ['…vidieť, kam by sa veci mohli dostať.', 'vizionar'],
    ['…vydržať, kým sa tam naozaj dostanú.', 'vytrvalec']),
  pair('x07', 'Keď sa okolnosti náhle zmenia…',
    ['…zastavím sa a zvážim, čo nová situácia naozaj znamená.', 'posudzovatel'],
    ['…prispôsobím sa a pokračujem s tým, čo je k dispozícii.', 'improvizator']),
  pair('x08', 'Po dôležitom rozhovore si zvyčajne pamätám…',
    ['…výstižné vety a slovné obraty, ktoré v ňom zazneli.', 'formulator'],
    ['…ako sa pri ňom ten druhý cítil.', 'vnimavec']),
  pair('x09', 'Keď skupina vyberá z viacerých návrhov…',
    ['…zabojujem za ten, ktorému verím.', 'obhajca'],
    ['…podporím ten, na ktorom sa zhodne najviac ľudí.', 'timovy']),
  pair('x10', 'Keď mám na starosti menej skúseného človeka…',
    ['…jasne mu poviem, čo má robiť a čo očakávam.', 'kormidelnik'],
    ['…nechám ho skúšať a pomáham mu prísť na to.', 'sprievodca']),
  pair('x11', 'Keď sa v skupine začne súperiť, kto je lepší…',
    ['…ožijem a chcem ukázať, čo vo mne je.', 'sutazivec'],
    ['…snažím sa to upokojiť, aby sa nikto necítil zle.', 'zmierovatel']),
  pair('x12', 'Keď stojím pred ťažkým rozhodnutím…',
    ['…spolieham sa na vlastný úsudok.', 'rozhodny'],
    ['…obvolám ľudí, ktorí s tým majú skúsenosť.', 'prepajac']),
  pair('x13', 'Keď vidím, že niekto nestíha…',
    ['…poviem mu pár slov, po ktorých sa mu bude robiť ľahšie.', 'povzbudzovac'],
    ['…vezmem kus jeho práce na seba.', 'opora']),
  pair('x14', 'Pri spolupráci s novým človekom…',
    ['…si chcem najprv ujasniť, čo kto od koho čaká.', 'vyjednavac'],
    ['…ho chcem najprv bližšie spoznať.', 'dovernik']),
];

/* ------------------------------------------------------------------ */
/* 3. Situačné otázky (jedna možnosť z každej domény)                  */
/* ------------------------------------------------------------------ */

export const SITUATIONS: Question[] = [
  situation('s01', 'Tvoja trieda, partia alebo tím má o mesiac pripraviť väčšiu spoločnú akciu a zatiaľ sa nič nedeje. Čo urobíš ako prvé?',
    ['Zistím, aký je rozpočet, koľko ľudí príde a čo všetko treba zabezpečiť.', 'analytik'],
    ['Spíšem zoznam úloh a navrhnem, kto si čo vezme.', 'organizator'],
    ['Zvolám ľudí, poviem, že sa do toho treba pustiť, a ujmem sa vedenia.', 'kormidelnik'],
    ['Oslovím známych, ktorí vedia pomôcť s priestorom, hudbou či jedlom.', 'prepajac']),
  situation('s02', 'Zapojíš sa do tímovej súťaže (kvíz, turnaj, hackathon). Akú rolu si prirodzene nájdeš?',
    ['Premýšľam nad taktikou – na čo sa sústrediť a čo vynechať.', 'strateg'],
    ['Vezmem si konkrétnu časť a postarám sa, aby bola splnená do bodky.', 'garant'],
    ['Sledujem skóre a burcujem, aby sme súperov porazili.', 'sutazivec'],
    ['Robím, čo práve treba – zháňam, nosím, zaskakujem.', 'opora']),
  situation('s03', 'Začínaš na novom mieste (škola, práca, kurz). Čo je pre teba v prvých týždňoch typické?',
    ['Nasávam všetko nové a vypytujem sa, ako tu veci fungujú.', 'objavitel'],
    ['Dávam si záležať, aby moje prvé úlohy boli bez jedinej chyby.', 'detailista'],
    ['Rýchlo si urobím vlastný názor a robím veci po svojom.', 'rozhodny'],
    ['Hľadám jedného-dvoch ľudí, s ktorými si budem naozaj rozumieť.', 'dovernik']),
  situation('s04', 'Partia sa nudí a nikto nevie, čo podniknúť. Ako sa zachováš?',
    ['Vymyslím niečo, čo sme ešte nikdy neskúšali.', 'novator'],
    ['Poviem „poďme“ a jednoducho vyrazíme – program sa nájde.', 'starter'],
    ['Rozprúdim náladu, aby ľudia dostali chuť niečo robiť.', 'povzbudzovac'],
    ['Všimnem si, kto má na čo chuť a kto je unavený, a podľa toho navrhnem.', 'vnimavec']),
  situation('s05', 'Skupinový projekt sa zasekol – ľudia sú unavení a nevedia sa zhodnúť. Čo urobíš?',
    ['Odstúpim o krok a pomenujem, o čo nám vlastne ide.', 'syntetik'],
    ['Pracujem ďalej na svojej časti – zastaviť sa nechcem.', 'vytrvalec'],
    ['Hľadám kompromis medzi tým, čo chcú jednotlivé strany.', 'vyjednavac'],
    ['Navrhnem, aby sme si sadli a dokončili to spoločne.', 'timovy']),
  situation('s06', 'Na poslednú chvíľu ťa požiadajú, aby si nováčikom alebo mladším žiakom porozprával o tom, čomu sa venuješ. Ako k tomu pristúpiš?',
    ['Porozprávam, kam táto oblasť smeruje a čo v nej raz bude možné.', 'vizionar'],
    ['Prípravu nepotrebujem – budem reagovať na to, čo ich zaujme.', 'improvizator'],
    ['Vymyslím dobrý príbeh a príklady, aby to bolo zrozumiteľné.', 'formulator'],
    ['Zistím, čo už vedia, a pomôžem im urobiť prvý vlastný krok.', 'sprievodca']),
  situation('s07', 'Na stretnutí sa dlho rieši sporný návrh a čas beží. Aká je tvoja prirodzená reakcia?',
    ['Vecne zhrniem, čo hovorí za a čo proti.', 'posudzovatel'],
    ['Tlačím na to, aby sme rozhodli a pohli sa ďalej.', 'tahun'],
    ['Postavím sa za variant, ktorý považujem za správny, a presviedčam.', 'obhajca'],
    ['Upokojujem vyostrenú debatu, aby sa ľudia znova počúvali.', 'zmierovatel']),
  situation('s08', 'V spoločnej práci sa tesne pred termínom objaví vážna chyba. Čo urobíš?',
    ['Hľadám, kde presne chyba vznikla a čo ju spôsobilo.', 'analytik'],
    ['Beriem to na seba – zostanem, kým to nebude v poriadku.', 'garant'],
    ['Rozhodnem, či odovzdáme s chybou, alebo požiadame o odklad.', 'rozhodny'],
    ['Zvolám všetkých, nech to vyriešime spoločne.', 'timovy']),
  situation('s09', 'Mladší súrodenec alebo známy sa pripravuje na dôležitú skúšku a prosí ťa o pomoc. Ako mu pomôžeš?',
    ['Poradím mu, na čo sa zamerať a čo pokojne vynechať.', 'strateg'],
    ['Prejdem s ním úlohy a upozorním ho na každú chybu.', 'detailista'],
    ['Dodám mu sebadôveru a chuť do učenia.', 'povzbudzovac'],
    ['Zistím, čomu nerozumie, a trpezlivo ho to naučím.', 'sprievodca']),
  situation('s10', 'Sused dlhodobo robí hluk, ktorý prekáža celému vchodu. Čo urobíš?',
    ['Zistím si, aké platia pravidlá a aké máme možnosti.', 'objavitel'],
    ['Zazvoním uňho ešte dnes a poviem mu to.', 'starter'],
    ['Navrhnem mu dohodu – kedy áno a kedy nie.', 'vyjednavac'],
    ['Dbám hlavne na to, aby sa zo sporu nestala vojna medzi susedmi.', 'zmierovatel']),
  situation('s11', 'S priateľmi chcete vyzbierať peniaze na dobrú vec. Čím prispeješ najradšej?',
    ['Vymyslím nezvyčajný spôsob, ako zbierku urobiť.', 'novator'],
    ['Budem obchádzať ľudí a vydržím aj po desiatom odmietnutí.', 'vytrvalec'],
    ['Napíšem výzvu, ktorá ľudí osloví.', 'formulator'],
    ['Rozhodím siete medzi známych a zapojím ďalších ľudí.', 'prepajac']),
  situation('s12', 'Na podujatí, kde pomáhaš, vypadne hlavný bod programu. Čo urobíš?',
    ['Premyslím, ako zvyšok programu poskladať, aby stále dával zmysel.', 'syntetik'],
    ['Na mieste vymyslím náhradu z toho, čo máme k dispozícii.', 'improvizator'],
    ['Presvedčím niekoho z prítomných, aby vystúpil.', 'obhajca'],
    ['Spýtam sa organizátora, čo potrebuje, a urobím to.', 'opora']),
  situation('s13', 'Dostaneš možnosť viesť ročný projekt. Čo ťa na tom láka najviac?',
    ['Predstava, čo z neho môže vyrásť o niekoľko rokov.', 'vizionar'],
    ['Že na konci bude jasný, hotový výsledok.', 'tahun'],
    ['Že budem viesť ľudí a určovať smer.', 'kormidelnik'],
    ['Že s pár ľuďmi prežijem rok intenzívnej spolupráce.', 'dovernik']),
  situation('s14', 'Máš spolu s ďalšími vybrať víťaza súťaže (napríklad najlepší projekt). Čo je ti najbližšie?',
    ['Držím sa kritérií a hodnotím nestranne.', 'posudzovatel'],
    ['Navrhnem postup hodnotenia, aby bolo prehľadné a rýchle.', 'organizator'],
    ['Baví ma to napätie – najradšej by som si s nimi zmeral sily.', 'sutazivec'],
    ['Myslím aj na to, ako výsledok prijmú tí, ktorí nevyhrajú.', 'vnimavec']),
];

/* ------------------------------------------------------------------ */
/* 4. Otázky o prirodzenej energii (2 + 2 talenty z dvoch domén)       */
/* ------------------------------------------------------------------ */

export const ENERGY: Question[] = [
  energy('e01', 'Ktorá časť prípravy väčšej veci (cesty, projektu, oslavy) ťa baví najviac?',
    ['Zisťovať a porovnávať informácie.', 'analytik'],
    ['Rozhodovať medzi možnosťami, ako to celé poňať.', 'strateg'],
    ['Vedieť, že na moju časť sa ostatní môžu spoľahnúť.', 'garant'],
    ['Zostavovať harmonogram a zoznamy.', 'organizator']),
  energy('e02', 'Pri čom najľahšie stratíš pojem o čase?',
    ['Keď vymýšľam niečo nové.', 'novator'],
    ['Keď premýšľam, ako veci spolu súvisia.', 'syntetik'],
    ['Keď dávam veciam poriadok a systém.', 'organizator'],
    ['Keď rozbieham niečo od nuly.', 'starter']),
  energy('e03', 'Ktorý deň by ťa nabil najviac?',
    ['Deň, keď snívam a plánujem, čo by mohlo byť.', 'vizionar'],
    ['Deň, keď sa naučím niečo úplne nové.', 'objavitel'],
    ['Deň, keď niečo vypilujem do dokonalosti.', 'detailista'],
    ['Deň plný nečakaných situácií, ktoré zvládnem.', 'improvizator']),
  energy('e04', 'Čo ti pri riešení problémov prináša najväčšie uspokojenie?',
    ['Keď nájdem šikovnú cestu, ktorú iní nevideli.', 'strateg'],
    ['Keď prídem s nápadom, aký ešte nikto nemal.', 'novator'],
    ['Keď dosiahnem dohodu, s ktorou sú spokojní všetci.', 'vyjednavac'],
    ['Keď urobím ťažké rozhodnutie a ukáže sa ako správne.', 'rozhodny']),
  energy('e05', 'Čo ťa dokáže najviac „nakopnúť“?',
    ['Keď sa ukáže, že môj triezvy odhad bol správny.', 'posudzovatel'],
    ['Keď si predstavím, čo veľké by z toho raz mohlo byť.', 'vizionar'],
    ['Keď dostanem dôveru niečo viesť.', 'kormidelnik'],
    ['Keď mám šancu vyhrať.', 'sutazivec']),
  energy('e06', 'Ktorý rozhovor ťa napĺňa najviac?',
    ['Rozhovor o myšlienkach, pri ktorom do seba veci zapadnú.', 'syntetik'],
    ['Rozhovor, v ktorom niekomu pomôžem triezvo sa rozhodnúť.', 'posudzovatel'],
    ['Rozhovor, v ktorom sa mi niekto otvorí a cíti sa pochopený.', 'vnimavec'],
    ['Rozhovor, po ktorom ten druhý vie, ako sa posunúť ďalej.', 'sprievodca']),
  energy('e07', 'Ako by vyzeral tvoj ideálny voľný večer?',
    ['Dokument, kniha alebo kurz o niečom, čo ešte nepoznám.', 'objavitel'],
    ['Hlavolam, logická hra alebo problém, ktorému prídem na koreň.', 'analytik'],
    ['Spoločná aktivita s partiou – hra, šport, varenie.', 'timovy'],
    ['Dlhý rozhovor s jedným blízkym človekom.', 'dovernik']),
  energy('e08', 'Čo ti vo vzťahu k ľuďom robí najväčšiu radosť?',
    ['Keď niekomu niečo vysvetlím a on povie: „Aha, už rozumiem.“', 'formulator'],
    ['Keď sa mi podarí dohodnúť podmienky výhodné pre obe strany.', 'vyjednavac'],
    ['Keď zoznámim dvoch ľudí a oni si sadnú.', 'prepajac'],
    ['Keď sa ľudia po hádke vďaka mne znova rozprávajú.', 'zmierovatel']),
  energy('e09', 'V ťažkej chvíli skupiny máš najviac energie na to…',
    ['…povedať jasné slovo, čo sa urobí.', 'rozhodny'],
    ['…zdvihnúť ľuďom náladu a vieru.', 'povzbudzovac'],
    ['…utíšiť spory a udržať ľudí pokope.', 'zmierovatel'],
    ['…potichu urobiť to, čo práve treba.', 'opora']),
  energy('e10', 'Čo ťa na práci s ľuďmi baví najviac?',
    ['Vidieť, ako im moje slová dodajú chuť.', 'povzbudzovac'],
    ['Získať ich pre myšlienku, ktorej verím.', 'obhajca'],
    ['Sledovať, ako sa postupne zlepšujú.', 'sprievodca'],
    ['Spoznávať stále nových.', 'prepajac']),
  energy('e11', 'Po akom dni zaspávaš najspokojnejšie?',
    ['Keď je za mnou kus hotovej práce.', 'tahun'],
    ['Keď mám splnené všetky sľuby a záväzky.', 'garant'],
    ['Keď viem, že niekto mal vďaka mne ľahší deň.', 'opora'],
    ['Keď sme ako partia niečo dokázali spolu.', 'timovy']),
  energy('e12', 'Čo si na sebe potichu ceníš najviac?',
    ['Že vydržím tam, kde to iní vzdajú.', 'vytrvalec'],
    ['Že moja práca znesie aj prísnu kontrolu.', 'detailista'],
    ['Že mi ľudia zverujú veci, ktoré inde nepovedia.', 'dovernik'],
    ['Že vycítim, čo ľudia potrebujú.', 'vnimavec']),
  energy('e13', 'Kedy sa cítiš najviac vo svojom živle?',
    ['Keď sa niečo práve začína a všetko je otvorené.', 'starter'],
    ['Keď ide do tuhého a treba zaťať zuby.', 'vytrvalec'],
    ['Keď niekoho získavam pre svoj pohľad.', 'obhajca'],
    ['Keď držím opraty a ľudia sa na mňa spoliehajú.', 'kormidelnik']),
  energy('e14', 'Ktorá chvíľa ti dodá najviac energie?',
    ['Keď zvládnem situáciu, na ktorú sa nedalo pripraviť.', 'improvizator'],
    ['Keď odškrtnem poslednú položku zo zoznamu.', 'tahun'],
    ['Keď v niečom zvíťazím.', 'sutazivec'],
    ['Keď nájdem presne tie správne slová.', 'formulator']),
];

/* ------------------------------------------------------------------ */
/* 5. Záložné páry (nevstupujú do testu)                               */
/* ------------------------------------------------------------------ */

const r = (id: string, prompt: string, a: Opt, b: Opt) => pair(id, prompt, a, b, 'reserve');

export const RESERVE_PAIRS: Question[] = [
  r('r01', 'Keď mám iný názor než ostatní…',
    ['…najprv si overím fakty, či sa nemýlim.', 'analytik'],
    ['…pustím sa do presviedčania.', 'obhajca']),
  r('r02', 'V novom tíme najviac prispejem, keď…',
    ['…môžem premýšľať nad postupom.', 'strateg'],
    ['…môžem ísť na čele a rozdeľovať úlohy.', 'kormidelnik']),
  r('r03', 'Do nového kurzu alebo krúžku idem najmä preto…',
    ['…že ma tá oblasť láka a chcem jej porozumieť.', 'objavitel'],
    ['…že v nej chcem patriť medzi najlepších.', 'sutazivec']),
  r('r04', 'Keď treba vyriešiť problém…',
    ['…prídem s viacerými netradičnými nápadmi.', 'novator'],
    ['…rýchlo vyberiem jedno riešenie a stojím si za ním.', 'rozhodny']),
  r('r05', 'Po dlhom a únavnom stretnutí zvyknem…',
    ['…zhrnúť, čo z toho celého vlastne vyplýva.', 'syntetik'],
    ['…odľahčiť atmosféru a dodať ľuďom chuť pokračovať.', 'povzbudzovac']),
  r('r06', 'Pri plánovaní niečoho spoločného (bývania, cesty, projektu)…',
    ['…hovorím najmä o tom, ako by to raz mohlo vyzerať.', 'vizionar'],
    ['…hľadám, ako zladiť to, čo chce každý z nás.', 'vyjednavac']),
  r('r07', 'Keď mi niekto ukáže svoj text alebo návrh…',
    ['…zhodnotím, či obsah obstojí.', 'posudzovatel'],
    ['…poradím, ako to povedať jasnejšie a pútavejšie.', 'formulator']),
  r('r08', 'Keď spolupracujem s niekým pomalším…',
    ['…ťahám tempo, aby sme to stihli.', 'tahun'],
    ['…spomalím a pomôžem mu zlepšiť sa.', 'sprievodca']),
  r('r09', 'Keď v skupine vznikne zmätok a nervozita…',
    ['…urobím poriadok v tom, kto má čo robiť.', 'organizator'],
    ['…upokojím ľudí, aby sa prestali obviňovať.', 'zmierovatel']),
  r('r10', 'Keď niekto potrebuje vybaviť vec, s ktorou nemám skúsenosť…',
    ['…sľúbim, že sa na to pozriem, a dotiahnem to.', 'garant'],
    ['…spojím ho s niekým, kto to vie.', 'prepajac']),
  r('r11', 'Keď mi niekto ukáže svoju prácu tesne pred odovzdaním…',
    ['…upozorním ho na chyby, ktoré v nej vidím.', 'detailista'],
    ['…spýtam sa, s čím mu ešte môžem pomôcť.', 'opora']),
  r('r12', 'S novým známym…',
    ['…hneď vymyslím, čo by sme mohli spolu podniknúť.', 'starter'],
    ['…si radšej dám čas, kým ho naozaj spoznám.', 'dovernik']),
  r('r13', 'Keď chce niekto v skupine uprostred náročnej úlohy skončiť…',
    ['…idem príkladom a pokračujem ďalej.', 'vytrvalec'],
    ['…zaujíma ma, čo sa v ňom deje.', 'vnimavec']),
  r('r14', 'Keď sa v poslednej chvíli zmení spoločný plán…',
    ['…rovno vymyslím náhradné riešenie.', 'improvizator'],
    ['…najprv zistím, čo na to ostatní.', 'timovy']),
];

/** Celá banka otázok. */
export const QUESTION_BANK: Question[] = [...WITHIN_PAIRS, ...CROSS_PAIRS, ...SITUATIONS, ...ENERGY, ...RESERVE_PAIRS];

/**
 * Poradie otázok v teste. Je pevné (nie náhodné) a strieda typy otázok aj domény,
 * aby test nepôsobil monotónne. Na výsledok poradie nemá vplyv – skóre je súčet.
 */
function buildTestOrder(): Question[] {
  // páry vnútri domény prestriedame podľa domén: M, R, V, Vz, M, R, …
  const within: Question[] = [];
  for (let i = 0; i < 7; i++) for (let d = 0; d < 4; d++) within.push(WITHIN_PAIRS[d * 7 + i]);

  const order: Question[] = [];
  for (let k = 0; k < 14; k++) {
    order.push(within[2 * k], SITUATIONS[k], CROSS_PAIRS[k], within[2 * k + 1], ENERGY[k]);
  }
  return order;
}

export const TEST_QUESTIONS: Question[] = buildTestOrder();
export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(QUESTION_BANK.map((q) => [q.id, q]));
