import { Link, useLocation } from 'wouter';
import { useLanguage } from '../lib/language';

type MobileLink = {
  href: string;
  icon: string;
  labelRu: string;
  labelKz: string;
  matches: (path: string) => boolean;
};

const links: MobileLink[] = [
  { href: '/', icon: '⌂', labelRu: 'Главная', labelKz: 'Басты', matches: (path) => path === '/' },
  { href: '/course', icon: '▤', labelRu: 'Уроки', labelKz: 'Сабақтар', matches: (path) => path.startsWith('/course') },
  { href: '/assistant', icon: 'E', labelRu: 'Echo', labelKz: 'Echo', matches: (path) => path === '/assistant' },
  { href: '/results', icon: '✓', labelRu: 'Прогресс', labelKz: 'Нәтиже', matches: (path) => path === '/results' },
];

export function MobileNavigation() {
  const [location] = useLocation();
  const { language } = useLanguage();

  if (location === '/auth' || location === '/reset-password' || location.endsWith('/test')) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label={language === 'RU' ? 'Мобильное меню' : 'Мобильді мәзір'}>
      {links.map((link) => (
        <Link
          className={link.matches(location) ? 'mobile-bottom-nav__link mobile-bottom-nav__link--active' : 'mobile-bottom-nav__link'}
          href={link.href}
          key={link.href}
        >
          <span aria-hidden="true">{link.icon}</span>
          <small>{language === 'RU' ? link.labelRu : link.labelKz}</small>
        </Link>
      ))}
    </nav>
  );
}
