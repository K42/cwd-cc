/**
 * Krok 6 - magia: tradycje, zaklęcia, komunikaty blokad.
 *
 * Nazwy i opisy tradycji oraz zaklęć to treść gry (data/pl/), nie interfejs.
 */

export default {
  noTraditionsYet: 'Jeszcze nie poznano żadnej tradycji.',
  knownTraditions: 'Znane tradycje:',
  noMagicAtThisLevel: 'Żadna z dotychczas wybranych ścieżek (ani pochodzenie) nie przyznaje magii na obecnym poziomie postaci - ten krok jest w pełni opcjonalny.',

  labelTradition: 'TRADYCJA',
  labelSpell: 'ZAKLĘCIE',
  chooseTradition: 'Wybierz tradycję',
  changeTradition: 'Zmień tradycję',
  chooseSpell: 'Wybierz zaklęcie',
  changeSpell: 'Zmień zaklęcie',
  chooseFreeSpell: 'Wybierz zaklęcie kręgu 0',
  changeFreeSpell: 'Zmień darmowe zaklęcie',
  removeChoice: 'Usuń wybór',
  unresolved: 'Nierozwiązane (opcjonalne)',

  newTradition: 'Nowa tradycja',
  newTraditionHint: 'poznaj całą szkołę magii',
  spellOption: 'Zaklęcie',
  spellLabel: 'Zaklęcie',
  d6Result: 'k6 = {roll}',
  corruptionGrantedShort: '→ +1 Splugawienie',
  circleFilterChip: 'Krąg {circle}',
  spellOptionHint: 'naucz się jednego czaru',

  searchSpell: 'Szukaj zaklęcia po nazwie lub opisie...',
  searchFreeSpell: 'Szukaj zaklęcia kręgu 0...',
  searchTradition: 'Szukaj tradycji...',

  /**
   * Komunikaty, gdy karty zaklęcia nie da się rozwiązać. Trzy osobne teksty,
   * bo trzy sytuacje mają trzy różne rozwiązania - patrz
   * docs/changes/2026-09-23-blokada-zaklecia-bez-tradycji.md.
   */
  blockade: {
    /** Tradycja jest do poznania w innej karcie tego samego kroku. */
    traditionFirst: 'Najpierw poznaj tradycję w karcie powyżej - zaklęć uczysz się wyłącznie z tradycji, które już znasz.',
    /** Ślepy zaułek: nic w tym kroku nie przyzna tradycji. */
    deadEnd: `<strong>Nie możesz nauczyć się zaklęcia</strong>, bo twoja postać nie zna żadnej tradycji magicznej, a zaklęcia poznaje się wyłącznie z tradycji już znanych. Nic tu nie wybierzesz, dopóki tego nie zmienisz:
      <ul>
        <li>w <strong>Kroku 2</strong> zmień korzyść z poziomu 4 z zaklęcia na talent, albo</li>
        <li>w <strong>Kroku 3</strong> wybierz ścieżkę, która przyznaje magię - wtedy poznasz tradycję i zaklęcie będzie z czego wybrać.</li>
      </ul>`,
    /** Tradycje znane, ale brak zaklęcia w zasięgu Mocy. */
    noSpellInPower: 'W znanych ci tradycjach nie ma już zaklęcia o kręgu nie wyższym niż twoja Moc ({power}) - albo znasz już je wszystkie.'
  },

  blackMagicWarning: 'To tradycja <strong>czarnej magii</strong> - jej poznanie oznacza 1 punkt Splugawienia.',
  corruptionGranted: 'Przyznano 1 Splugawienie (rzut k6: {roll}).',

  circle: 'Krąg {circle}',
  circleFilter: 'Krąg',
  traditionFilter: 'Tradycja',
  categoryFilter: 'Kategoria',
  categoryAttack: 'Atak',
  categoryUtility: 'Użytkowe',
  scrollCircleZero: 'zwój z zaklęciem kręgu 0',
  blackMagicShort: 'Czarna magia - poznanie przyznaje 1 Splugawienie',
  noTraditionsMatchSearch: 'Brak tradycji spełniających kryteria wyszukiwania.',
  blackMagicGrantsCorruption: '{tradition} to tradycja czarnej magii - poznanie przyznaje automatycznie',
  oneCorruptionPoint: '1 punkt Splugawienia',
  foundTraditions: 'Znaleziono {found} z {total} tradycji',
  circleN: 'Krąg {circle}',
  spellChip: '{name} ({tradition}, krąg {circle})',
  spellChipCircleZero: '{name} (krąg 0)',
  spellMetaCircle: '{tradition} · Krąg {circle} · {category}',
  spellMetaCircleZero: '{tradition} · Krąg 0 · {category}',
  traditionLabel: 'Tradycja',
  freeSpellCircleZero: 'Darmowe zaklęcie (krąg 0)',
  traditionNotKnownYet: 'Tradycja {tradition} nie jest jeszcze znana - zostanie automatycznie poznana.',
  rollD6: 'Rzuć k6',
  blackMagicRiskRoll: 'Zaklęcie czarnej magii. Rzut ryzyka:',
  blackMagicRiskHint: 'Zaklęcie czarnej magii - ryzyko Splugawienia (rzut k6 &lt; {known} już znanych zaklęć czarnej magii).',
  foundSpells: 'Znaleziono {found} z {total} zaklęć',
  foundSpellsCircleZero: 'Znaleziono {found} z {total} zaklęć kręgu 0',
  spellMeta: '({tradition}, krąg {circle}, {category})',
  categoryAttackLower: 'atak',
  categoryUtilityLower: 'użytkowe'
};
