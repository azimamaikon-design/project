import { Auth } from '../components/Auth';
import { SiteHeader } from '../components/SiteHeader';
import { useLanguage } from '../lib/language';

export function AuthPage() {
  const { language, toggleLanguage } = useLanguage();
  const isRu = language === 'RU';
  return <div className="page-shell"><SiteHeader language={language} onLanguageChange={toggleLanguage} /><main className="auth-page"><section className="auth-intro"><span className="eyebrow">ECHO’S SCHOOL</span><h1>{isRu ? 'Начни свой путь' : 'Өз жолыңды баста'}</h1><p>{isRu ? 'Создай бесплатный аккаунт, чтобы позже сохранять уроки, результаты и серию занятий.' : 'Сабақтарды, нәтижелерді және оқу сериясын сақтау үшін тегін аккаунт аш.'}</p><div className="auth-benefits"><span>✓ {isRu ? 'Бесплатно' : 'Тегін'}</span><span>✓ {isRu ? 'Объяснения на русском' : 'Орысша түсіндіру'}</span><span>✓ A1—B2</span></div></section><Auth language={language} /></main></div>;
}
