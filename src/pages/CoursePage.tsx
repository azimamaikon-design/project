import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SiteHeader } from '../components/SiteHeader';
import type { CourseLevel } from '../lib/courseData';
import { useLanguage } from '../lib/language';
import { loadProgress, type LevelResult } from '../lib/progress';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const levels: CourseLevel[] = ['A1','A2','B1','B2'];
const titles = {
  RU:['Основы','Связная речь','Уверенное общение','Свободный английский'],
  KZ:['Негіздер','Байланысты сөйлеу','Сенімді қарым-қатынас','Еркін ағылшын тілі'],
};

export function CoursePage() {
  const { language, toggleLanguage } = useLanguage();
  const [results, setResults] = useState<LevelResult[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const isRu = language === 'RU';

  useEffect(() => {
    const load = async () => {
      if (!isSupabaseConfigured) return;
      const { data } = await supabase.auth.getSession();
      setSignedIn(Boolean(data.session));
      if (data.session) setResults((await loadProgress()).levelResults);
    };
    void load();
  }, []);

  const isUnlocked = (index:number) => index === 0 || results.some((result) => result.level === levels[index - 1] && result.passed);

  return <div className="page-shell"><SiteHeader language={language} onLanguageChange={toggleLanguage} /><main className="course-page">
    <Link className="back-link" href="/">← {isRu ? 'На главную' : 'Басты бетке'}</Link>
    <span className="eyebrow">ECHO’S SCHOOL</span><h1>{isRu ? 'Твой путь к уровню B2' : 'B2 деңгейіне апарар жолың'}</h1>
    <p className="course-page__intro">{signedIn ? (isRu ? 'Следующий уровень открывается после успешного итогового теста.' : 'Келесі деңгей қорытынды тесттен кейін ашылады.') : (isRu ? 'Войди, чтобы сохранять результаты и открывать следующие уровни.' : 'Нәтижелерді сақтау және деңгейлерді ашу үшін кір.')}</p>
    <div className="course-list">{levels.map((level,index) => {
      const unlocked = isUnlocked(index);
      const result = results.find((item) => item.level === level);
      const content = <><span className="course-row__index">{unlocked ? index + 1 : '🔒'}</span><div><strong>{level} · {titles[language][index]}</strong><p>{result ? `${isRu ? 'Тест' : 'Тест'}: ${result.score}/${result.total}` : unlocked ? (isRu ? '12 уроков доступны' : '12 сабақ қолжетімді') : (isRu ? `Сначала сдай ${levels[index - 1]}` : `Алдымен ${levels[index - 1]} тапсыр`)}</p></div><span className="course-row__count">{result?.passed ? '✓' : unlocked ? '→' : '🔒'}</span></>;
      return unlocked ? <Link className="course-row" href={`/course/${level.toLowerCase()}`} key={level}>{content}</Link> : <article className="course-row course-row--locked" key={level}>{content}</article>;
    })}</div>
    <section className="course-ai-banner"><div><span>E</span><div><strong>{isRu ? 'Echo AI всегда рядом' : 'Echo AI әрқашан қасыңда'}</strong><p>{isRu ? 'Попроси объяснить тему, проверить предложение или создать практику.' : 'Тақырыпты түсіндіруді, сөйлемді тексеруді немесе тапсырма құруды сұра.'}</p></div></div><Link className="primary-button" href="/assistant">{isRu ? 'Открыть помощника' : 'Көмекшіні ашу'} →</Link></section>
    {!signedIn && <Link className="primary-button" href="/auth">{isRu ? 'Войти и сохранять прогресс' : 'Кіру және прогресті сақтау'} →</Link>}
  </main></div>;
}
