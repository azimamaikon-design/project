import type { CourseLevel } from './courseData';
import { isSupabaseConfigured, supabase } from './supabase';
import { difficultyRules } from './courseDifficulty';

export type LessonSection = 'vocabulary' | 'writing' | 'reading' | 'listening' | 'speaking';
export type LessonResult = { level:CourseLevel; lesson_number:number; section:LessonSection; score:number; total:number; completed:boolean };
export type LevelResult = { level:CourseLevel; score:number; total:number; passed:boolean; attempts:number };
export type LearningStreak = { current_streak:number; longest_streak:number; last_activity_date:string | null };

export const emptyStreak: LearningStreak = { current_streak:0, longest_streak:0, last_activity_date:null };

async function currentUserId() {
  if (!isSupabaseConfigured) return undefined;
  const { data } = await supabase.auth.getUser();
  return data.user?.id;
}

async function recordLearningActivity() {
  await supabase.rpc('record_learning_activity');
}

export async function saveLessonResult(level:CourseLevel, lessonNumber:number, section:LessonSection, score:number, total:number) {
  const userId = await currentUserId();
  if (!userId) return false;
  const { data:previous } = await supabase.from('lesson_results').select('score').eq('user_id', userId).eq('level', level).eq('lesson_number', lessonNumber).eq('section', section).maybeSingle();
  const bestScore = Math.max(score, previous?.score ?? 0);
  const { error } = await supabase.from('lesson_results').upsert({
    user_id:userId, level, lesson_number:lessonNumber, section, score:bestScore, total,
    completed:bestScore >= Math.ceil(total * difficultyRules[level].mastery), updated_at:new Date().toISOString(),
  }, { onConflict:'user_id,level,lesson_number,section' });
  if (!error) await recordLearningActivity();
  return !error;
}

export async function saveLevelResult(level:CourseLevel, score:number, total:number) {
  const userId = await currentUserId();
  if (!userId) return false;
  const { data:previous } = await supabase.from('level_results').select('score,attempts,passed').eq('user_id', userId).eq('level', level).maybeSingle();
  const bestScore = Math.max(score, previous?.score ?? 0);
  const { error } = await supabase.from('level_results').upsert({
    user_id:userId, level, score:bestScore, total, passed:bestScore / total >= 0.8,
    attempts:(previous?.attempts ?? 0) + 1, updated_at:new Date().toISOString(),
  }, { onConflict:'user_id,level' });
  if (!error) await recordLearningActivity();
  return !error;
}

export async function loadProgress() {
  const userId = await currentUserId();
  if (!userId) return { lessonResults:[] as LessonResult[], levelResults:[] as LevelResult[], streak:emptyStreak };
  const [lessons, levels, streak] = await Promise.all([
    supabase.from('lesson_results').select('level,lesson_number,section,score,total,completed').eq('user_id', userId),
    supabase.from('level_results').select('level,score,total,passed,attempts').eq('user_id', userId),
    supabase.from('learning_streaks').select('current_streak,longest_streak,last_activity_date').eq('user_id', userId).maybeSingle(),
  ]);
  return {
    lessonResults:(lessons.data ?? []) as LessonResult[],
    levelResults:(levels.data ?? []) as LevelResult[],
    streak:(streak.data ?? emptyStreak) as LearningStreak,
  };
}

export function countCompletedLessons(results:LessonResult[], level:CourseLevel) {
  return Array.from({ length:12 }, (_, index) => index + 1).filter((lessonNumber) => {
    const required: LessonSection[] = lessonNumber <= 7
      ? ['vocabulary','writing','reading','speaking']
      : lessonNumber <= 10 ? ['vocabulary','listening'] : ['vocabulary','speaking'];
    return required.every((section) => results.some((result) =>
      result.level === level && result.lesson_number === lessonNumber && result.section === section && result.completed,
    ));
  }).length;
}
