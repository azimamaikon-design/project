import { Link, useParams } from 'wouter';
import { SiteHeader } from '../components/SiteHeader';
import { getLessons, validLevels, type CourseLevel } from '../lib/courseData';
import { useLanguage } from '../lib/language';
import { getVocabularyTarget } from '../lib/vocabularyData';
import { useLevelAccess } from '../lib/useLevelAccess';
import { LockedLevel } from '../components/LockedLevel';
import { LevelGoals } from '../components/LevelGoals';

export function LevelPage() {
  const { level = '' } = useParams<{ level: string }>();
  const normalized = level.toUpperCase() as CourseLevel;
  const { language, toggleLanguage } = useLanguage();
  const isRu = language === 'RU';
  const access = useLevelAccess(normalized);

  if (!validLevels.includes(normalized)) {
    return <main className="not-found"><h1>{isRu ? 'Уровень не найден' : 'Деңгей табылмады'}</h1><Link className="primary-button" href="/course">← {isRu ? 'К программе' : 'Бағдарламаға'}</Link></main>;
  }
  if (!access.loading && !access.unlocked) return <LockedLevel language={language} signedIn={access.signedIn} />;

  const lessons = getLessons(normalized, language);
  return (
    <div className="page-shell">
      <SiteHeader language={language} onLanguageChange={toggleLanguage} />
      <main className="level-page">
        <Link className="back-link" href="/course">← {isRu ? 'Все уровни' : 'Барлық деңгей'}</Link>
        <div className="level-title"><span>{normalized}</span><div><p className="eyebrow">{isRu ? '12 БЕСПЛАТНЫХ УРОКОВ' : '12 ТЕГІН САБАҚ'}</p><h1>{isRu ? `Программа уровня ${normalized}` : `${normalized} деңгейінің бағдарламасы`}</h1></div></div>
        <LevelGoals level={normalized} language={language} />
        <div className="lesson-grid">
          {lessons.map((lesson, index) => (
            <Link className="lesson-card" href={`/course/${level}/lesson/${index + 1}`} key={`${lesson.title}-${index}`}>
              <span className="lesson-card__number">{String(index + 1).padStart(2, '0')}</span><small>{lesson.type}</small><h2>{lesson.title}</h2><p className="lesson-card__words">{getVocabularyTarget(normalized)} {isRu ? 'слов' : 'сөз'}</p><span className="lesson-card__start">{isRu ? 'Открыть урок' : 'Сабақты ашу'} →</span>
            </Link>
          ))}
        </div>
        <section className={access.canTakeTest ? 'test-banner' : 'test-banner test-banner--locked'}><div><span className="eyebrow">{isRu ? 'ПОСЛЕ ВСЕХ УРОКОВ' : 'БАРЛЫҚ САБАҚТАН КЕЙІН'}</span><h2>{isRu ? `Итоговый тест ${normalized}` : `${normalized} қорытынды тесті`}</h2><p>{access.canTakeTest ? (isRu ? '20 вопросов: grammar, reading, listening · проходной балл 16/20' : '20 сұрақ: grammar, reading, listening · өту балы 16/20') : `${isRu ? 'Завершено уроков' : 'Аяқталған сабақ'}: ${access.completedLessons}/12`}</p></div>{access.canTakeTest ? <Link className="primary-button" href={`/course/${level}/test`}>{isRu ? 'Начать тест' : 'Тестті бастау'} →</Link> : <span className="test-lock">🔒</span>}</section>
      </main>
    </div>
  );
}
