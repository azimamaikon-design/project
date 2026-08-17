import { useEffect, useState } from 'react';
import type { CourseLevel } from './courseData';
import { countCompletedLessons, loadProgress } from './progress';
import { isSupabaseConfigured, supabase } from './supabase';

const prerequisite: Partial<Record<CourseLevel, CourseLevel>> = { A2:'A1', B1:'A2', B2:'B1' };

export function useLevelAccess(level:CourseLevel) {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [unlocked, setUnlocked] = useState(level === 'A1');
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!isSupabaseConfigured) { setLoading(false); return; }
      const { data } = await supabase.auth.getSession();
      setSignedIn(Boolean(data.session));
      const progress = await loadProgress();
      setCompletedLessons(countCompletedLessons(progress.lessonResults, level));
      setUnlocked(level === 'A1' || progress.levelResults.some((result) => result.level === prerequisite[level] && result.passed));
      setLoading(false);
    };
    void load();
  }, [level]);

  return { loading, signedIn, unlocked, completedLessons, canTakeTest:signedIn && completedLessons === 12 };
}
