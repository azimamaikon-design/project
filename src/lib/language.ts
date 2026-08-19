import { useEffect } from 'react';

export type Language = 'RU' | 'KZ';

export function useLanguage() {
  useEffect(() => {
    localStorage.setItem('echo-language', 'RU');
  }, []);

  return { language:'RU' as const, toggleLanguage:() => undefined };
}
