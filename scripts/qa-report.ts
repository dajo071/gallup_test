/**
 * Správa o kvalite metodiky: `npm run qa`
 * Vypíše kontrolu banky otázok, výsledky modelových používateľov
 * a simuláciu náhodných odpovedí (overenie, že žiadny talent nie je zvýhodnený).
 */
import { ACTIVITIES } from '../src/data/activities';
import { QUESTION_BANK, TEST_QUESTIONS } from '../src/data/questions';
import { TALENTS, TALENT_BY_ID } from '../src/data/talents';
import { checkQuestions } from '../src/lib/questionQuality';
import { scoreAnswers } from '../src/lib/scoring';
import { PERSONAS, answerAs, answerRandomly } from '../tests/personas';

const line = (s = '') => console.log(s);

line('=== 1. BANKA OTÁZOK ===');
const types = { pair: 0, situation: 0, energy: 0 };
for (const q of TEST_QUESTIONS) types[q.type]++;
line(`Banka: ${QUESTION_BANK.length} položiek | Test: ${TEST_QUESTIONS.length} otázok (páry ${types.pair}, situačné ${types.situation}, energia ${types.energy})`);
line(`Talenty: ${TALENTS.length} | Činnosti: ${ACTIVITIES.length}`);

const report = checkQuestions(QUESTION_BANK, TEST_QUESTIONS);
const c = report.coverage[0];
line(`Pokrytie každého talentu v teste: ${c.pair} páry + ${c.situation} situačné + ${c.energy} energia = ${c.pair + c.situation + c.energy} príležitostí, max. ${c.maxPoints} bodov`);
line(`Najvyšší počet stretnutí tej istej dvojice talentov: ${report.maxCooccurrence}`);
line(`Chyby: ${report.errors.length}`);
report.errors.forEach((e) => line('  ✗ ' + e));
line(`Upozornenia: ${report.warnings.length}`);
report.warnings.forEach((w) => line('  ! ' + w));

line();
line('=== 2. MODELOVÍ POUŽÍVATELIA ===');
let personasOk = true;
for (const p of PERSONAS) {
  const res = scoreAnswers(answerAs(p));
  const top = res.top5.map((r) => `${TALENT_BY_ID[r.talentId].name} ${r.percent}%`);
  const hits = p.expectedTop5.filter((id) => res.top5.some((r) => r.talentId === id)).length;
  const worst = Math.max(...p.expectedTop5.map((id) => res.ranking.find((r) => r.talentId === id)!.rank));
  const ok = hits >= 4 && worst <= 7 && res.top5[0].talentId === p.expectedTop5[0];
  personasOk &&= ok;
  line(`${ok ? '✓' : '✗'} ${p.label} – ${hits}/5 očakávaných v TOP 5, najhoršie umiestnenie očakávaného talentu: ${worst}.`);
  line(`    TOP 5: ${top.join(', ')}  [${res.differentiation}]`);
}

{
  let bt = 0, raw = 0, n = 0;
  for (const p of PERSONAS)
    for (let seed = 1; seed <= 300; seed++) {
      const res = scoreAnswers(answerAs(p, TEST_QUESTIONS, seed));
      bt += p.expectedTop5.filter((id) => res.top5.some((r) => r.talentId === id)).length;
      const rawTop = [...res.ranking].sort((a, b) => b.rawShare - a.rawShare || a.rank - b.rank).slice(0, 5);
      raw += p.expectedTop5.filter((id) => rawTop.some((r) => r.talentId === id)).length;
      n++;
    }
  line(`Robustnosť (${n} simulovaných osôb): priemerne ${(bt / n).toFixed(2)} z 5 očakávaných talentov v TOP 5 (samotný súčet bodov bez zohľadnenia súperov: ${(raw / n).toFixed(2)})`);
}

line();
line('=== 3. SIMULÁCIA NÁHODNÝCH ODPOVEDÍ (5 000 behov) ===');
const N = 5000;
const inTop = new Map(TALENTS.map((t) => [t.id, 0]));
const mean = new Map(TALENTS.map((t) => [t.id, 0]));
const diff = { vyrazny: 0, mierny: 0, vyrovnany: 0 };
for (let s = 1; s <= N; s++) {
  const res = scoreAnswers(answerRandomly(s));
  res.top5.forEach((r) => inTop.set(r.talentId, inTop.get(r.talentId)! + 1));
  res.ranking.forEach((r) => mean.set(r.talentId, mean.get(r.talentId)! + r.score / N));
  diff[res.differentiation]++;
}
const expected = (5 / TALENTS.length) * 100;
const shares = TALENTS.map((t) => ({ id: t.id, share: (inTop.get(t.id)! / N) * 100, mean: mean.get(t.id)! * 100 }));
shares.sort((a, b) => b.share - a.share);
line(`Očakávaný podiel v TOP 5 pri náhodných odpovediach: ${expected.toFixed(1)} %`);
line(`Najčastejší:  ${shares[0].id} ${shares[0].share.toFixed(1)} %`);
line(`Najzriedkavejší: ${shares.at(-1)!.id} ${shares.at(-1)!.share.toFixed(1)} %`);
const means = shares.map((s) => s.mean);
line(`Priemerné skóre talentov: ${Math.min(...means).toFixed(1)} – ${Math.max(...means).toFixed(1)} %`);
line(`Vyhranenosť náhodných profilov: výrazný ${((diff.vyrazny / N) * 100).toFixed(1)} %, mierny ${((diff.mierny / N) * 100).toFixed(1)} %, vyrovnaný ${((diff.vyrovnany / N) * 100).toFixed(1)} %`);

if (report.errors.length > 0 || !personasOk) process.exit(1);
