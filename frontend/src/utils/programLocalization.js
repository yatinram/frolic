import { PROGRAM_TRANSLATIONS } from '../i18n/programTranslations';
import { useLanguage } from '../context/LanguageContext';
import { useMemo } from 'react';

/**
 * Normalizes slug/id to match keys in PROGRAM_TRANSLATIONS
 */
function findTranslationKey(program) {
  if (!program) return null;
  const slug = (program.slug || program.id || '').toLowerCase();
  
  if (PROGRAM_TRANSLATIONS[slug]) return slug;
  if (slug.includes('play')) return 'play-group';
  if (slug.includes('nursery')) return 'nursery';
  if (slug.includes('lkg') || slug.includes('lower')) return 'lkg';
  if (slug.includes('ukg') || slug.includes('upper')) return 'ukg';
  if (slug.includes('english') || slug.includes('diel')) return 'english-lab';
  if (slug.includes('math') || slug.includes('abacus')) return 'maths-lab';
  if (slug.includes('teacher') || slug.includes('training') || slug.includes('academy')) return 'teacher-training';

  return null;
}

/**
 * Resolves a single program object with translations for the given language.
 * Follows priority:
 * 1. Database-saved custom translations: program.translations?.[lang]
 * 2. Static i18n dictionary: PROGRAM_TRANSLATIONS[key]?.[lang]
 * 3. Original program properties (English fallback)
 */
export function getLocalizedProgram(program, currentLang = 'en') {
  if (!program || currentLang === 'en') {
    return program;
  }

  const dbTrans = (program.translations && program.translations[currentLang]) || {};
  const transKey = findTranslationKey(program);
  const dictTrans = (transKey && PROGRAM_TRANSLATIONS[transKey]?.[currentLang]) || {};

  // If no translations exist in DB or dictionary, return original
  if (Object.keys(dbTrans).length === 0 && Object.keys(dictTrans).length === 0) {
    return program;
  }

  // Merge quickSpecs
  const quickSpecs = {
    ...(program.quickSpecs || {}),
    ...(dictTrans.quickSpecs || {}),
    ...(dbTrans.quickSpecs || {}),
  };

  // Merge pillars
  let pillars = program.pillars;
  if (Array.isArray(dbTrans.pillars) && dbTrans.pillars.length > 0) {
    pillars = dbTrans.pillars;
  } else if (Array.isArray(dictTrans.pillars) && dictTrans.pillars.length > 0) {
    pillars = (program.pillars || []).map((p, idx) => {
      const match = dictTrans.pillars[idx] || {};
      return {
        ...p,
        title: match.title || p.title,
        desc: match.desc || p.desc,
      };
    });
  }

  // Merge curriculum
  let curriculum = program.curriculum;
  if (Array.isArray(dbTrans.curriculum) && dbTrans.curriculum.length > 0) {
    curriculum = dbTrans.curriculum;
  } else if (Array.isArray(dictTrans.curriculum) && dictTrans.curriculum.length > 0) {
    curriculum = (program.curriculum || []).map((c, idx) => {
      const match = dictTrans.curriculum[idx] || {};
      return {
        ...c,
        step: match.step || c.step,
        details: match.details || c.details,
      };
    });
  }

  // Merge milestones
  const milestones =
    dbTrans.milestones || dictTrans.milestones || program.milestones;

  // Merge keyHighlights
  const keyHighlights =
    dbTrans.keyHighlights || dictTrans.keyHighlights || program.keyHighlights;

  // Merge dailyRoutine
  let dailyRoutine = program.dailyRoutine;
  if (Array.isArray(dbTrans.dailyRoutine) && dbTrans.dailyRoutine.length > 0) {
    dailyRoutine = dbTrans.dailyRoutine;
  } else if (Array.isArray(dictTrans.dailyRoutine) && dictTrans.dailyRoutine.length > 0) {
    dailyRoutine = (program.dailyRoutine || []).map((r, idx) => {
      const match = dictTrans.dailyRoutine[idx] || {};
      return {
        ...r,
        title: match.title || r.title,
        desc: match.desc || r.desc,
      };
    });
  }

  return {
    ...program,
    title: dbTrans.title || dictTrans.title || program.title || program.name,
    name: dbTrans.name || dictTrans.name || dictTrans.title || program.name || program.title,
    categoryLabel: dbTrans.categoryLabel || dictTrans.categoryLabel || program.categoryLabel,
    ageGroup: dbTrans.ageGroup || dictTrans.ageGroup || program.ageGroup,
    badgeText: dbTrans.badgeText || dictTrans.badgeText || program.badgeText,
    tagline: dbTrans.tagline || dictTrans.tagline || program.tagline,
    shortDescription: dbTrans.shortDescription || dictTrans.shortDescription || program.shortDescription,
    overview: dbTrans.overview || dictTrans.overview || program.overview,
    quickSpecs,
    keyHighlights,
    pillars,
    curriculum,
    milestones,
    dailyRoutine,
  };
}

/**
 * React Hook to localize a single program based on active language
 */
export function useLocalizedProgram(program) {
  const { currentLang } = useLanguage();
  return useMemo(() => getLocalizedProgram(program, currentLang), [program, currentLang]);
}

/**
 * React Hook to localize a list of programs based on active language
 */
export function useLocalizedPrograms(programs = []) {
  const { currentLang } = useLanguage();
  return useMemo(() => {
    if (!Array.isArray(programs)) return [];
    return programs.map((p) => getLocalizedProgram(p, currentLang));
  }, [programs, currentLang]);
}
