import type { CourseLevel } from './courseData';

export type DifficultyRules = {
  mastery:number;
  speakingWords:number;
  writingWords:number;
};

export const difficultyRules: Record<CourseLevel, DifficultyRules> = {
  A1:{ mastery:0.7, speakingWords:3, writingWords:5 },
  A2:{ mastery:0.75, speakingWords:6, writingWords:8 },
  B1:{ mastery:0.8, speakingWords:10, writingWords:12 },
  B2:{ mastery:0.85, speakingWords:15, writingWords:18 },
};
