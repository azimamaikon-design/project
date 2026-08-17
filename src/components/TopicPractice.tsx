import { useState } from 'react';
import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';
import { getTopicSpeaking } from '../lib/practiceData';
import { getUnitExercises } from '../lib/unitExercises';
import { SpeakingPractice } from './SpeakingPractice';
import { UnitPractice } from './UnitPractice';
import { ReadingPractice } from './ReadingPractice';
import { getFirstUnitReading } from '../lib/readingData';
import { getExpandedReading } from '../lib/readingExpansion';
import { saveLessonResult } from '../lib/progress';
import { ChallengePractice } from './ChallengePractice';
import { getChallengeExercises } from '../lib/challengeData';
import { WritingProject } from './WritingProject';

type Props = { level:CourseLevel; lessonIndex:number; language:Language };

export function TopicPractice({ level, lessonIndex, language }: Props) {
  const [part, setPart] = useState<'writing' | 'challenge' | 'project' | 'reading' | 'speaking'>('writing');
  const [writingScore, setWritingScore] = useState<number>();
  const [objectiveScore, setObjectiveScore] = useState<number>();
  const [projectComplete, setProjectComplete] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const isRu = language === 'RU';
  const hasReading = true;
  const reading = level === 'A1' && lessonIndex === 0 ? getFirstUnitReading(language) : getExpandedReading(level, lessonIndex);
  return (
    <div>
      <div className="practice-parts">
        <button className={part === 'writing' ? 'practice-part practice-part--active' : 'practice-part'} onClick={() => setPart('writing')} type="button"><span>10</span>{isRu ? 'письменных' : 'жазбаша'}</button>
        <button className={part === 'challenge' ? 'practice-part practice-part--active' : 'practice-part'} disabled={writingScore === undefined} onClick={() => setPart('challenge')} type="button"><span>10</span>{isRu ? 'дополнительных' : 'қосымша'}</button>
        <button className={part === 'project' ? 'practice-part practice-part--active' : 'practice-part'} disabled={objectiveScore === undefined} onClick={() => setPart('project')} type="button"><span>AI</span>Writing</button>
        {hasReading && <button className={part === 'reading' ? 'practice-part practice-part--active' : 'practice-part'} disabled={!projectComplete} onClick={() => setPart('reading')} type="button"><span>5+</span>Reading</button>}
        <button className={part === 'speaking' ? 'practice-part practice-part--active' : 'practice-part'} disabled={!readingComplete} onClick={() => setPart('speaking')} type="button"><span>5</span>Speaking</button>
      </div>
      {part === 'writing' ? <UnitPractice exercises={getUnitExercises(level, lessonIndex)} language={language} onComplete={(score) => { setWritingScore(score); setPart('challenge'); }} />
        : part === 'challenge' ? <ChallengePractice exercises={getChallengeExercises(level, lessonIndex)} language={language} onComplete={(score) => { setObjectiveScore((writingScore ?? 0) + score); setPart('project'); }} />
        : part === 'project' ? <WritingProject level={level} lessonIndex={lessonIndex} language={language} onComplete={(score) => { void saveLessonResult(level, lessonIndex + 1, 'writing', (objectiveScore ?? 0) + score, 40); setProjectComplete(true); setPart('reading'); }} />
        : part === 'reading' && hasReading ? <ReadingPractice texts={reading} language={language} onResult={(score,total) => { void saveLessonResult(level, lessonIndex + 1, 'reading', score, total); setReadingComplete(true); setPart('speaking'); }} />
          : <SpeakingPractice activity={getTopicSpeaking(level, lessonIndex)} language={language} level={level} onResult={(score,total) => void saveLessonResult(level, lessonIndex + 1, 'speaking', score, total)} />}
    </div>
  );
}
