import type { CourseLevel } from './courseData';
import { getWrittenExamples } from './writtenExamples';

export type ChallengeExercise = { prompt:string; options:string[]; correct:string };

const fallback: Record<CourseLevel, string[]> = {
  A1:['am','is','are','have','has','do','does','did'],
  A2:['a','an','the','—','was','were','has','have','will','would'],
  B1:['would','had','have','has','been','being','which','who','where','—'],
  B2:['been','being','have','had','would','should','to','—','which','that'],
};

export function getChallengeExercises(level: CourseLevel, lessonIndex: number): ChallengeExercise[] {
  const source = getWrittenExamples(level, lessonIndex);
  const lessonAnswers = source.map((item) => item.correct);

  return source.map((item, index) => {
    const choices = [...new Set([item.correct, ...lessonAnswers.slice(index + 1), ...lessonAnswers, ...fallback[level]])].slice(0, 4);
    const shift = index % choices.length;
    return {
      prompt:item.prompt.replace('Type the missing word: ', ''),
      options:[...choices.slice(shift), ...choices.slice(0, shift)],
      correct:item.correct,
    };
  });
}
