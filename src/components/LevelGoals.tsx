import { getCefrGoals } from '../lib/cefrGoals';
import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';

type Props = { level: CourseLevel; language: Language };

const icons = { listening:'♪', reading:'Aa', speaking:'●', writing:'✎', vocabulary:'+' };

export function LevelGoals({ level, language }: Props) {
  const goals = getCefrGoals(level, language);
  const isRu = language === 'RU';

  return (
    <section className="level-goals">
      <div className="level-goals__intro">
        <span className="eyebrow">{isRu ? 'ЦЕЛЬ ПО CEFR' : 'CEFR БОЙЫНША МАҚСАТ'}</span>
        <h2>{isRu ? `Что ученик сможет после ${level}` : `${level} аяқталғаннан кейін оқушы не істей алады`}</h2>
        <p>{goals.outcome}</p><strong>{goals.writingTarget}</strong>
      </div>
      <div className="skill-goals">
        {goals.skills.map((item) => <article key={item.skill}><span>{icons[item.skill]}</span><div><h3>{item.title}</h3><p>{item.goal}</p></div></article>)}
      </div>
    </section>
  );
}
