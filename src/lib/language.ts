import { useEffect, useState } from 'react';

export type Language = 'RU' | 'KZ';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('echo-language');
    return saved === 'KZ' ? 'KZ' : 'RU';
  });

  useEffect(() => {
    const syncLanguage = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === 'RU' || next === 'KZ') setLanguage(next);
    };

    window.addEventListener('echo-language-change', syncLanguage);
    return () => window.removeEventListener('echo-language-change', syncLanguage);
  }, []);

  const toggleLanguage = () => {
    const next = language === 'RU' ? 'KZ' : 'RU';
    localStorage.setItem('echo-language', next);
    setLanguage(next);
    window.dispatchEvent(new CustomEvent<Language>('echo-language-change', { detail: next }));
  };

  return { language, toggleLanguage };
}
