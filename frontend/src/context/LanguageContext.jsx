import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export const LANGUAGES = [
  { code: 'en', label: 'English', country: 'GB', short: 'EN', flag: '🇬🇧' },
  { code: 'gu', label: 'ગુજરાતી', country: 'IN', short: 'GU', flag: '🇮🇳' },
  { code: 'hi', label: 'हिन्दी', country: 'IN', short: 'HI', flag: '🇮🇳' },
];

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('frolic_lang') || 'en';
  });

  const changeLang = (langCode) => {
    if (translations[langCode]) {
      setCurrentLang(langCode);
      localStorage.setItem('frolic_lang', langCode);
      document.documentElement.lang = langCode;
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Translation helper: resolves dot-paths like 'nav.home'
  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[currentLang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallbackVal = translations['en'];
        for (const fbKey of keys) {
          if (fallbackVal && fallbackVal[fbKey] !== undefined) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback || path;
          }
        }
        return fallbackVal;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLang,
        t,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
