/**
 * Zapisywanie postaci w pamięci przeglądarki (localStorage), niezależnie od
 * eksportu/importu plików JSON. Każdy zapis trzyma dokładnie te same dane,
 * co eksport (zob. zbudujDaneEksportu() w script.js), pod własnym id, żeby
 * dało się go później odnaleźć na liście i wczytać ponownie albo nadpisać
 * kolejnym zapisem tej samej postaci.
 */

const LOCALSTORAGE_KEY = 'kreatorPostaci.zapisanePostacie.v1';

/** Odczytuje wszystkie zapisane postacie jako obiekt {id: {id, savedAt, dane}}. Zwraca {} przy braku/uszkodzeniu danych. */
function getSavedCharacters() {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : {};
  } catch (e) {
    return {};
  }
}

/** Zapisuje (albo nadpisuje, jeśli `id` już istnieje) postać pod danym id. Zwraca true przy sukcesie. */
function saveCharacterToCache(id, data) {
  try {
    const all = getSavedCharacters();
    all[id] = { id, savedAt: new Date().toISOString(), data };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(all));
    return true;
  } catch (e) {
    return false;
  }
}

/** Generuje nowe, unikalne id zapisu (znacznik czasu + losowy sufiks). */
function generateSaveId() {
  return `postac-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Usuwa wszystkie postacie zapisane w pamięci przeglądarki. Zwraca true przy sukcesie. */
function clearSavedCharacters() {
  try {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

export { LOCALSTORAGE_KEY, getSavedCharacters, saveCharacterToCache, generateSaveId, clearSavedCharacters };
