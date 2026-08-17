import { Link } from 'wouter';
import type { Language } from '../lib/language';

export function LockedLevel({ language, signedIn }: { language:Language; signedIn:boolean }) {
  const isRu = language === 'RU';
  return <main className="not-found"><span className="eyebrow">{isRu ? 'УРОВЕНЬ ЗАКРЫТ' : 'ДЕҢГЕЙ ЖАБЫҚ'}</span><h1>{signedIn ? (isRu ? 'Сначала сдай предыдущий уровень' : 'Алдымен алдыңғы деңгейді тапсыр') : (isRu ? 'Войди, чтобы открыть уровни' : 'Деңгейлерді ашу үшін кір')}</h1><Link className="primary-button" href={signedIn ? '/course' : '/auth'}>{signedIn ? (isRu ? 'К программе' : 'Бағдарламаға') : (isRu ? 'Войти' : 'Кіру')} →</Link></main>;
}
