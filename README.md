# Talent Discovery

Interaktívny test na identifikáciu prirodzených talentov a silných stránok. Používateľ odpovie na 70 otázok, získa svojich **TOP 5 talentov** s podrobnou interpretáciou, osobný profil, rebríček všetkých 28 talentov a – po výbere činností, ktoré ho zaujímajú – personalizované odporúčania, kde a ako talenty využiť.

> **Upozornenie.** Ide o pôvodnú metodiku inšpirovanú všeobecným princípom práce so silnými stránkami. **Nie je to psychometricky validovaný test ani klinická diagnostika.** Výsledky sú orientačné sebahodnotenie; spoľahlivosť a validitu treba overiť pilotným testovaním a psychometrickou analýzou (pozri [Obmedzenia](#obmedzenia-a-čo-treba-overiť)). Aplikácia nie je spojená so spoločnosťou Gallup ani s testom CliftonStrengths a nepoužíva jeho otázky, názvy tém, texty ani algoritmy.

## Čo aplikácia vie

- úvodná obrazovka (čas, počet otázok, priebeh, nepovinné meno/prezývka),
- test so 70 otázkami troch typov, indikátor priebehu, návrat späť, ovládanie klávesnicou,
- automatické ukladanie – rozpracovaný test aj výsledky prežijú obnovenie stránky,
- vyhodnotenie: TOP 5 talentov, talenty na 6.–10. mieste, graf štyroch domén, rebríček všetkých talentov,
- pri každom talente: charakteristika, opis, prejavy v živote a v práci, uplatnenie, výhody, riziká, rozvoj, konkrétne príklady,
- osobný profil zložený z reálneho výsledku (poradie TOP 5 + rozloženie domén),
- výber z 30 činností v 5 kategóriách a ich párovanie s talentmi (miera súladu, uplatnené talenty, zdôvodnenie, pozície, prvé kroky),
- tlač / export do PDF (rozbalí všetky detaily a pripojí odporúčania),
- test odznova.

Bez registrácie a bez servera: meno aj odpovede zostávajú v `localStorage` prehliadača.

## Technológie

| Vrstva | Voľba |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Štýly | Tailwind CSS 4 |
| Ikony, písma | lucide-react, Manrope + Fraunces (pribalené, bez externých požiadaviek) |
| Testy | Vitest |

Repozitár bol prázdny, preto bol stack zvolený nanovo. Aplikácia je čisto klientska (statické súbory), takže backend ani databáza nie sú potrebné.

## Inštalácia a spustenie

Vyžaduje Node.js 20 alebo novší.

```bash
npm install
```

```bash
npm run dev
```

Aplikácia beží na adrese, ktorú vypíše Vite (štandardne http://localhost:5173).

Ďalšie príkazy:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm test
```

```bash
npm run qa
```

`npm run build` vytvorí statickú verziu v `dist/` (dá sa nahrať na ľubovoľný hosting), `npm test` spustí 40 automatických testov a `npm run qa` vypíše správu o kvalite metodiky.

## Štruktúra projektu

```
src/
  data/                     DÁTA (bez logiky)
    types.ts                  typy dátového modelu
    domains.ts                4 domény
    talents/                  28 talentov (súbor na doménu) + index
    questions.ts              banka 84 otázok + zostavenie testu
    activities.ts             30 činností a ich väzba na talenty
  lib/                      LOGIKA (bez UI, testovateľná samostatne)
    scoring.ts                hodnotiaci algoritmus
    profile.ts                interpretácia – osobný profil
    matching.ts               párovanie talentov a činností
    questionQuality.ts        kontrola kvality otázok
    storage.ts                lokálne ukladanie a validácia stavu
    useAppState.ts            stav aplikácie
  components/               ROZHRANIE
    Intro, Quiz, Results, TalentCard, DomainChart,
    Activities, Recommendations, ui
tests/                      testy + modeloví používatelia (personas.ts)
scripts/qa-report.ts        správa o kvalite metodiky
```

## Metodika

### Talenty

28 talentov, 7 v každej zo štyroch domén:

| Strategické myslenie | Realizácia | Vplyv | Vzťahy |
| --- | --- | --- | --- |
| Analytik | Ťahúň | Formulátor | Vnímavec |
| Stratég | Organizátor | Obhajca | Tímový hráč |
| Objaviteľ | Garant | Kormidelník | Sprievodca |
| Novátor | Detailista | Súťaživec | Zmierovateľ |
| Syntetik | Štartér | Rozhodný | Prepájač |
| Vizionár | Vytrvalec | Povzbudzovač | Opora |
| Posudzovateľ | Improvizátor | Vyjednávač | Dôverník |

### Otázky

Banka má 84 položiek, test používa 70 z nich. Každá možnosť odpovede patrí práve jednému talentu; používateľ túto väzbu nikdy nevidí.

| Typ | Počet v teste | Zloženie | Výskyt každého talentu |
| --- | --- | --- | --- |
| Nútená voľba – pár vnútri domény | 28 | dva príbuzné talenty | 2× |
| Nútená voľba – pár naprieč doménami | 14 | dva talenty z rôznych domén | 1× |
| Situačná otázka | 14 | jedna možnosť z každej domény | 2× |
| Otázka o prirodzenej energii | 14 | 2 + 2 talenty z dvoch domén | 2× |

Každý talent má teda **presne 7 príležitostí** v troch rôznych formátoch a žiadna dvojica talentov sa nestretne viac než dvakrát. Zvyšných 14 párov je záloha (napr. pre paralelnú formu testu).

Páry vnútri domény sú zámerné: bez nich by človek so silnou doménou dostal všetkých sedem jej talentov na rovnakú úroveň a poradie by rozhodovala náhoda.

Poradie otázok je pevné a strieda typy aj domény. Formulácie sa vyhýbajú minulému času v prvej osobe, aby neboli rodovo zafarbené, a situácie sú volené tak, aby boli zrozumiteľné študentom aj pracujúcim.

### Kontrola kvality otázok

`src/lib/questionQuality.ts` automaticky overuje:

- štruktúru (existujúce talenty, jedinečné id, správny počet možností),
- vyváženosť (rovnaký počet príležitostí aj rovnaké maximum bodov pre každý talent),
- prekrývanie (ako často sa stretáva tá istá dvojica talentov),
- príliš podobné formulácie (podobnosť slov medzi všetkými výrokmi a zadaniami),
- príliš očividné položky (výrok obsahuje koreň názvu meraného talentu),
- nevyváženú dĺžku možností v jednej otázke.

Aktuálny stav: 0 chýb, 0 upozornení. Test `tests/methodology.test.ts` zlyhá, ak sa to zmení.

## Hodnotiaci algoritmus

Implementácia: `src/lib/scoring.ts`. Je deterministický, nepoužíva náhodu a nezávisí od poradia otázok.

**1. Surové body.** Zvolená možnosť pripíše talentu 1 bod (pár) alebo 2 body (voľba zo štyroch – silnejší signál). Nezvolená možnosť nič neodoberá: výber jedného výroku neznamená, že druhý talent chýba. Body sa normalizujú maximom z otázok, ktoré používateľ zodpovedal.

**2. Sila talentu so zohľadnením súperov.** Samotný súčet má pri nútenej voľbe slabinu: talent, ktorý náhodou stál len proti slabým talentom, predbehne talent, ktorý opakovane „prehral“ s tými najsilnejšími. Poradie preto určuje model párového porovnávania (Bradley–Terry / Plackett–Luce):

- každý talent má silu γ; pravdepodobnosť, že v otázke zvíťazí, je γ delené súčtom γ všetkých možností,
- sily sa odhadnú iteračne (pevných 400 krokov, štart γ = 1),
- každý talent má jedno virtuálne porovnanie s priemerným talentom (pol výhry, pol prehry) – rovnaká slabá regularizácia pre všetkých, nie bonus,
- zobrazená „relatívna sila“ = γ / (γ + 1); 50 % znamená priemer.

**3. Poradie.** Podľa sily; pri zhode rozhodujú surové body, potom konzistentnosť (v koľkých typoch otázok sa talent presadil) a napokon pevné poradie v databáze. Ak má talent mimo TOP 5 rovnakú silu ako piaty, aplikácia to používateľovi povie.

**4. Vyhranenosť profilu.** Podľa priemernej sily TOP 5 sa profil označí ako výrazný, mierny alebo vyrovnaný; pri vyrovnanom profile aplikácia upozorní, že poradie treba brať s rezervou. Hranice sú kalibrované simuláciou náhodných odpovedí.

Skóre sa počíta až po dokončení testu a počas vypĺňania sa nikde nezobrazuje.

### Párovanie s činnosťami

`src/lib/matching.ts`. Každá činnosť má priradené talenty s váhou 3 (kľúčový), 2 (silný) alebo 1 (podporný).

```
súlad = Σ (váha × sila talentu) / Σ váh      sila: 1 pre TOP 5, 0,5 pre 6.–10. miesto, inak 0
```

Od 55 % ide o silný súlad, od 30 % o čiastočný, pod tým o nízky. Výber činnosti (záujem) sa do súladu nezapočítava – aplikácia zámerne oddeľuje talent, záujem a nadobudnuté schopnosti a nízky súlad neprezentuje ako zákaz.

## Výsledky overovania

| Kontrola | Výsledok |
| --- | --- |
| Automatické testy (`npm test`) | 40 / 40 |
| Kontrola banky otázok | 0 chýb, 0 upozornení |
| 6 modelových používateľov | u štyroch 5 z 5 očakávaných talentov v TOP 5, u dvoch 4 z 5 (piaty na 6. mieste) |
| 1 800 simulovaných osôb | priemerne 4,73 z 5 očakávaných talentov v TOP 5 (jednoduchý súčet bodov: 4,56) |
| 5 000 náhodných vyplnení | každý talent v TOP 5 v 16,6 – 18,8 % prípadov (očakávaných 17,9 %); žiadny profil označený ako výrazný |
| Prechod aplikáciou v prehliadači | desktop 1280 px aj mobil (iPhone 13): všetky kroky vrátane obnovenia stránky, návratu späť, výberu činností, PDF a testu odznova |

Modeloví používatelia (`tests/personas.ts`) slúžia len na kontrolu algoritmu a do aplikácie nevstupujú.

## Obmedzenia a čo treba overiť

- **Žiadne dáta od reálnych ľudí.** Všetky overenia sú simulácie. Chýba pilotné testovanie, odhad reliability (napr. test–retest), analýza položiek a overenie validity voči vonkajšiemu kritériu.
- **Hranica medzi 5. a 6. talentom je mäkká.** Pri 70 otázkach a 28 talentoch má každý talent 7 príležitostí; v simulácii sa piaty „skutočný“ talent približne v štvrtine prípadov vymení s niektorým z nasledujúcich. Aplikácia preto zobrazuje aj 6.–10. miesto.
- **Výsledky sú ipsatívne** – hovoria o poradí talentov u jedného človeka, nie o tom, či je v niečom lepší než iní ľudia. Na porovnávanie ľudí ani na výber zamestnancov sa nehodia.
- **Väzby otázok na talenty a činností na talenty sú expertný odhad**, nie empiricky zistené vzťahy.
- **Sebahodnotenie** podlieha sociálnej žiaducnosti a aktuálnej nálade.
- Texty používajú generické mužské tvary („silný“, „zvládol“).

## Možnosti rozšírenia

- **Nová otázka:** pridať položku do `src/data/questions.ts`; `npm run qa` ukáže, či zostala banka vyvážená.
- **Nový talent:** pridať do príslušného súboru v `src/data/talents/` a doplniť otázky tak, aby mal rovnaký počet príležitostí.
- **Nová činnosť:** pridať do `src/data/activities.ts` s váhami talentov.
- paralelná forma testu zo záložných položiek, adaptívne dopĺňanie otázok pri tesných výsledkoch,
- zber anonymizovaných odpovedí (so súhlasom) pre psychometrickú analýzu,
- ďalšie jazyky, rodovo citlivé texty, zdieľanie výsledku odkazom, tímový prehľad.
