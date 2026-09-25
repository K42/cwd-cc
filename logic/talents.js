/**
 * Dostęp do opisów talentów.
 *
 * Same opisy to treść gry i mieszkają w data/<język>/talents.js - tutaj
 * zostaje wyłącznie odczyt, wspólny dla wszystkich języków.
 */

import CONTENT from '../data/content.js';
import { t } from '../i18n/index.js';

const TALENT_DESCRIPTIONS = CONTENT.TALENTS;

/**
 * Pobiera opis talentu.
 * @param {string} talentName - Nazwa talentu dokładnie jak w danych ścieżek/pochodzeń
 * @returns {string} Opis talentu albo informacja o jego braku
 */
function getTalentDescription(talentName) {
  return TALENT_DESCRIPTIONS[talentName] || t('summary.talentDescriptionMissing');
}

export { getTalentDescription, TALENT_DESCRIPTIONS };
