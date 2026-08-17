import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SiteHeader } from '../components/SiteHeader';
import { StreakCard } from '../components/StreakCard';
import { useLanguage } from '../lib/language';
import { emptyStreak, loadProgress, type LearningStreak, type LessonResult, type LevelResult } from '../lib/progress';
import { supabase } from '../lib/supabase';

export function ResultsPage() {
  const { language, toggleLanguage } = useLanguage();
  const [lessons, setLessons] = useState<LessonResult[]>([]);
  const [levels, setLevels] = useState<LevelResult[]>([]);
  const [streak, setStreak] = useState<LearningStreak>(emptyStreak);
  const [signedIn, setSignedIn] = useState<boolean>();
  const isRu = language === 'RU';

  useEffect(() => {
    void supabase.auth.getSession().then(async ({ data }) => {
      setSignedIn(Boolean(data.session));
      if (!data.session) return;
      const progress = await loadProgress();
      setLessons(progress.lessonResults);
      setLevels(progress.levelResults);
      setStreak(progress.streak);
    });
  }, []);

  if (signedIn === false) {
    return <main className="not-found"><h1>{isRu ? 'Сначала войди в аккаунт' : 'Алдымен аккаунтқа кір'}</h1><Link className="primary-button" href="/auth">{isRu ? 'Войти' : 'Кіру'} →</Link></main>;
  }

  return (
    <div className="page-shell">
      <SiteHeader language={language} onLanguageChange={toggleLanguage} />
      <main className="results-page">
        <span className="eyebrow">{isRu ? 'ЛИЧНЫЙ ПРОГРЕСС' : 'ЖЕКЕ ПРОГРЕСС'}</span>
        <h1>{isRu ? 'Мои результаты' : 'Менің нәтижелерім'}</h1>
        <StreakCard language={language} streak={streak} />
        <div className="result-levels">{(['A1','A2','B1','B2'] as const).map((level) => {
          const test = levels.find((item) => item.level === level);
          const completed = lessons.filter((item) => item.level === level && item.completed).length;
          return <article key={level}><strong>{level}</strong><h2>{test ? `${test.score}/${test.total}` : '—'}</h2><p>{isRu ? 'Завершено частей' : 'Аяқталған бөлім'}: {completed}</p><span>{test?.passed ? `✓ ${isRu ? 'Сдан' : 'Тапсырылды'}` : (isRu ? 'Не сдан' : 'Тапсырылмады')}</span></article>;
        })}</div>
        <section className="result-table">
          <h2>{isRu ? 'Результаты уроков' : 'Сабақ нәтижелері'}</h2>
          {lessons.length === 0
            ? <p>{isRu ? 'Пройди первое задание — результат появится здесь.' : 'Алғашқы тапсырманы орында — нәтиже осында шығады.'}</p>
            : lessons.map((item) => <div key={`${item.level}-${item.lesson_number}-${item.section}`}><span>{item.level} · {isRu ? 'урок' : 'сабақ'} {item.lesson_number}</span><strong>{item.section}</strong><b>{item.score}/{item.total}</b></div>)}
        </section>
      </main>
    </div>
  );
}
