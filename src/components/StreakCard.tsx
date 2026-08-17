import type { Language } from '../lib/language';
import type { LearningStreak } from '../lib/progress';

type Props = { language:Language; streak:LearningStreak };

function activeStreak(streak: LearningStreak) {
  if (!streak.last_activity_date) return 0;
  const last = new Date(`${streak.last_activity_date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceActivity = Math.round((today.getTime() - last.getTime()) / 86_400_000);
  return daysSinceActivity <= 1 ? streak.current_streak : 0;
}

export function StreakCard({ language, streak }: Props) {
  const isRu = language === 'RU';
  const current = activeStreak(streak);

  return (
    <section className="streak-card">
      <span className="streak-card__fire" aria-hidden="true">🔥</span>
      <div>
        <small>{isRu ? 'УЧЕБНЫЙ СТРИК' : 'ОҚУ СТРИГІ'}</small>
        <strong>{current} {isRu ? 'дней подряд' : 'күн қатарынан'}</strong>
        <p>{current > 0
          ? (isRu ? 'Выполни задание завтра, чтобы продолжить серию.' : 'Серияны жалғастыру үшін ертең тапсырма орында.')
          : (isRu ? 'Выполни задание сегодня и начни серию!' : 'Бүгін тапсырма орындап, серияны баста!')}
        </p>
      </div>
      <div className="streak-card__best">
        <small>{isRu ? 'Рекорд' : 'Рекорд'}</small>
        <b>{streak.longest_streak}</b>
      </div>
    </section>
  );
}
