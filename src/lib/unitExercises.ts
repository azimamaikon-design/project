import type { CourseLevel } from './courseData';
import { getWrittenExamples } from './writtenExamples';

export type UnitExercise = {
  kind:'write';
  prompt:string;
  correct:string;
  model:string;
  free?:boolean;
};

export function getUnitExercises(level: CourseLevel, lessonIndex: number) {
  return getWrittenExamples(level, lessonIndex);
}
