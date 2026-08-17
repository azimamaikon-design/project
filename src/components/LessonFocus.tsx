import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';
import { getLessonFocus } from '../lib/lessonFocus';

export function LessonFocus({ level, lessonIndex, language }:{ level:CourseLevel; lessonIndex:number; language:Language }) {
  const isRu = language === 'RU';
  return <div className="lesson-focus"><small>{isRu ? 'ТЕМЫ УРОКА' : 'САБАҚ ТАҚЫРЫПТАРЫ'}</small><div>{getLessonFocus(level, lessonIndex, language).map((topic) => <span key={topic}>{topic}</span>)}</div></div>;
}
