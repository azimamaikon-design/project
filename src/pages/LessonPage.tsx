import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { LessonTheory } from '../components/LessonTheory';
import { ListeningPractice } from '../components/ListeningPractice';
import { SpeakingPractice } from '../components/SpeakingPractice';
import { TopicPractice } from '../components/TopicPractice';
import { VocabularyStep } from '../components/VocabularyStep';
import { getLessons, validLevels, type CourseLevel } from '../lib/courseData';
import { useLanguage } from '../lib/language';
import { getListening, getSpeaking } from '../lib/practiceData';
import { getVocabulary } from '../lib/vocabularyData';
import { saveLessonResult } from '../lib/progress';
import { useLevelAccess } from '../lib/useLevelAccess';
import { LockedLevel } from '../components/LockedLevel';
import { LessonFocus } from '../components/LessonFocus';
import { EchoAssistant } from '../components/EchoAssistant';

export function LessonPage() {
  const { level = '', number = '1' } = useParams<{ level:string; number:string }>();
  const normalized = level.toUpperCase() as CourseLevel;
  const { language } = useLanguage();
  const [stage, setStage] = useState<'vocabulary' | 'theory' | 'practice' | 'assistant'>('vocabulary');
  const lessonNumber = Number(number);
  const lessonIndex = lessonNumber - 1;
  const isRu = language === 'RU';
  const access = useLevelAccess(normalized);

  if (!validLevels.includes(normalized)) return null;
  if (!access.loading && !access.unlocked) return <LockedLevel language={language} signedIn={access.signedIn} />;
  const lesson = getLessons(normalized, language)[lessonIndex];
  if (!lesson) return null;

  const practice = lessonIndex >= 10
    ? <SpeakingPractice activity={getSpeaking(normalized, lessonIndex, language)} language={language} level={normalized} onResult={(score,total) => void saveLessonResult(normalized, lessonNumber, 'speaking', score, total)} />
    : lessonIndex >= 7
      ? <ListeningPractice activity={getListening(normalized, lessonIndex)} language={language} onResult={(score,total) => void saveLessonResult(normalized, lessonNumber, 'listening', score, total)} />
      : <TopicPractice level={normalized} lessonIndex={lessonIndex} language={language} />;

  return (
    <main className="lesson-page">
      <div className="lesson-top"><Link href={`/course/${level}`}>← {isRu ? 'К урокам' : 'Сабақтарға'}</Link><span>{normalized} · {lessonNumber}/12</span></div>
      <div className="progress"><span style={{ width:`${lessonNumber / 12 * 100}%` }} /></div>
      <section className="lesson-content">
        <span className="eyebrow">{lesson.type}</span><h1>{lesson.title}</h1>
        <LessonFocus level={normalized} lessonIndex={lessonIndex} language={language} />
        <div className="lesson-stages">
          <button className={stage === 'vocabulary' ? 'stage stage--active' : 'stage'} onClick={() => setStage('vocabulary')} type="button">1. {isRu ? 'Слова' : 'Сөздер'}</button>
          <button className={stage === 'theory' ? 'stage stage--active' : 'stage'} onClick={() => setStage('theory')} type="button">2. {isRu ? 'Объяснение' : 'Түсіндіру'}</button>
          <button className={stage === 'practice' ? 'stage stage--active' : 'stage'} onClick={() => setStage('practice')} type="button">3. {isRu ? 'Практика' : 'Тәжірибе'}</button>
          <button className={stage === 'assistant' ? 'stage stage--active' : 'stage'} onClick={() => setStage('assistant')} type="button">4. Echo AI</button>
        </div>
        {stage === 'vocabulary'
          ? <VocabularyStep words={getVocabulary(normalized, lessonIndex)} language={language} onContinue={(score) => { void saveLessonResult(normalized, lessonNumber, 'vocabulary', score, getVocabulary(normalized, lessonIndex).length); setStage('theory'); }} />
          : stage === 'theory'
          ? <LessonTheory language={language} level={normalized} lessonIndex={lessonIndex} onContinue={() => setStage('practice')} />
          : stage === 'practice' ? practice
          : <EchoAssistant language={language} initialLevel={normalized} topic={lesson.title} />}
      </section>
    </main>
  );
}
