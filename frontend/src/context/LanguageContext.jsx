import { createContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'oxu-kids-locale';
const DEFAULT_LOCALE = 'uz';

export const LanguageContext = createContext(null);

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'ENG' },
  { code: 'uz', label: 'UZB' },
  { code: 'ru', label: 'RUS' },
];

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['en', 'uz', 'ru'].includes(stored)) {
      return stored;
    }
    return DEFAULT_LOCALE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      languages: LANGUAGE_OPTIONS,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
