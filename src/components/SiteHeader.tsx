import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import type { Language } from '../lib/language';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type SiteHeaderProps = { language: Language; onLanguageChange: () => void };

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  const [email, setEmail] = useState<string>();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRu = language === 'RU';

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    void supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setEmail(session?.user.email));
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand__mark">E</span><span>Echo’s School</span></Link>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? (isRu ? 'Закрыть меню' : 'Мәзірді жабу') : (isRu ? 'Открыть меню' : 'Мәзірді ашу')}
        className={menuOpen ? 'menu-button menu-button--open' : 'menu-button'}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'} aria-label={language === 'RU' ? 'Главное меню' : 'Негізгі мәзір'}>
        <Link href="/course" onClick={closeMenu}>{language === 'RU' ? 'Программа' : 'Бағдарлама'}</Link>
        <Link href="/assistant" onClick={closeMenu}>Echo AI</Link>
        {email ? <div className="account-menu"><Link href="/results" onClick={closeMenu}>{isRu ? 'Результаты' : 'Нәтижелер'}</Link><span title={email}>{email}</span><button onClick={signOut} type="button">{isRu ? 'Выйти' : 'Шығу'}</button></div> : <Link className="login-link" href="/auth" onClick={closeMenu}>{isRu ? 'Войти' : 'Кіру'}</Link>}
        <button className="language-button" onClick={onLanguageChange} type="button">{language} <span>⌄</span></button>
      </nav>
    </header>
  );
}
