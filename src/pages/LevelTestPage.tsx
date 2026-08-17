import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { LockedLevel } from '../components/LockedLevel';
import { VoiceControls } from '../components/VoiceControls';
import { combineAssessment, getAssessmentSources, type AssessmentQuestion } from '../lib/assessmentData';
import { validLevels, type CourseLevel } from '../lib/courseData';
import { getLevelTest } from '../lib/exerciseData';
import { useLanguage } from '../lib/language';
import { saveLevelResult } from '../lib/progress';
import { useLevelAccess } from '../lib/useLevelAccess';

type SectionScores = Record<AssessmentQuestion['section'], number>;
const emptyScores: SectionScores = { grammar:0, reading:0, listening:0 };

export function LevelTestPage() {
  const { level = '' } = useParams<{ level:string }>();
  const normalized = level.toUpperCase() as CourseLevel;
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [sectionScores, setSectionScores] = useState(emptyScores);
  const [finished, setFinished] = useState(false);
  const isRu = language === 'RU';
  const access = useLevelAccess(normalized);

  if (!validLevels.includes(normalized)) return null;
  if (!access.loading && !access.unlocked) return <LockedLevel language={language} signedIn={access.signedIn} />;
  if (!access.loading && !access.canTakeTest) return <LockedTest level={level} completed={access.completedLessons} isRu={isRu} />;

  const questions = combineAssessment(getLevelTest(normalized), normalized);
  const sources = getAssessmentSources(normalized);
  const question = questions[index];
  const next = () => {
    const correct = answer === question.correct;
    const nextScore = score + (correct ? 1 : 0);
    setScore(nextScore);
    if (correct) setSectionScores((value) => ({ ...value, [question.section]:value[question.section] + 1 }));
    if (index === questions.length - 1) {
      setFinished(true);
      void saveLevelResult(normalized, nextScore, questions.length);
      return;
    }
    setIndex((value) => value + 1);
    setAnswer('');
  };

  if (finished) return <TestResult level={normalized} score={score} scores={sectionScores} isRu={isRu} />;

  const labels = isRu
    ? { grammar:'ГРАММАТИКА И СЛОВАРЬ', reading:'ЧТЕНИЕ', listening:'АУДИРОВАНИЕ' }
    : { grammar:'ГРАММАТИКА ЖӘНЕ СӨЗДІК', reading:'ОҚУ', listening:'ТЫҢДАУ' };

  return (
    <main className="test-page">
      <div className="lesson-top"><Link href={`/course/${level}`}>← {isRu ? 'Выйти из теста' : 'Тесттен шығу'}</Link><span>{normalized} · {index + 1}/{questions.length}</span></div>
      <div className="progress"><span style={{ width:`${(index + 1) / questions.length * 100}%` }} /></div>
      {question.section === 'reading' && <article className="exam-source"><small>READING</small><p>{sources.reading}</p></article>}
      {question.section === 'listening' && <article className="exam-source exam-source--audio"><small>LISTENING</small><h2>{isRu ? 'Прослушай запись и выбери ответ' : 'Жазбаны тыңдап, жауапты таңда'}</h2><VoiceControls language={language} text={sources.audio} speechLanguage="en-GB" /></article>}
      <section className="question-card">
        <div className="question-meta"><small>{labels[question.section]}</small><span>{index + 1}/{questions.length}</span></div>
        <h2>{question.prompt}</h2>
        <div className="answer-grid">{question.options.map((option, optionIndex) => <button className={answer === option ? 'answer answer--selected' : 'answer'} onClick={() => setAnswer(option)} type="button" key={option}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
        <button className="question-action" disabled={!answer} onClick={next} type="button">{index === questions.length - 1 ? (isRu ? 'Завершить тест' : 'Тестті аяқтау') : (isRu ? 'Следующий вопрос' : 'Келесі сұрақ')} →</button>
      </section>
      <p className="exam-note">{isRu ? 'Письмо и говорение уже проверяются в каждом из 12 уроков и обязательны для допуска.' : 'Жазу мен сөйлеу 12 сабақтың әрқайсысында тексеріледі және тестке жіберілу үшін міндетті.'}</p>
    </main>
  );
}

function LockedTest({ level, completed, isRu }:{ level:string; completed:number; isRu:boolean }) {
  return <main className="not-found"><span className="eyebrow">{isRu ? 'ТЕСТ ПОКА ЗАКРЫТ' : 'ТЕСТ ӘЗІРГЕ ЖАБЫҚ'}</span><h1>{isRu ? `Заверши все 12 уроков: ${completed}/12` : `12 сабақты аяқта: ${completed}/12`}</h1><Link className="primary-button" href={`/course/${level}`}>{isRu ? 'Вернуться к урокам' : 'Сабақтарға оралу'} →</Link></main>;
}

function TestResult({ level, score, scores, isRu }:{ level:CourseLevel; score:number; scores:SectionScores; isRu:boolean }) {
  const passed = score >= 16;
  return <main className="test-page"><Link className="back-link" href={`/course/${level}`}>← {isRu ? 'К уровню' : 'Деңгейге'}</Link><section className="lesson-result"><span className="lesson-result__score">{score}/20</span><h1>{passed ? (isRu ? `${level} сдан!` : `${level} тапсырылды!`) : (isRu ? 'Нужно повторить темы' : 'Тақырыптарды қайталау керек')}</h1><div className="exam-breakdown"><span>Grammar <b>{scores.grammar}/10</b></span><span>Reading <b>{scores.reading}/5</b></span><span>Listening <b>{scores.listening}/5</b></span></div><p>{passed ? (isRu ? 'Ты набрал проходной балл 80%.' : 'Сен 80% өту балын жинадың.') : (isRu ? 'Для сдачи требуется минимум 16 из 20.' : 'Өту үшін кемінде 16/20 керек.')}</p><Link className="primary-button" href={`/course/${level}`}>{isRu ? 'Вернуться к уровню' : 'Деңгейге оралу'}</Link></section></main>;
}
