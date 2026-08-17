import { Link } from 'wouter';
import type { Language } from '../lib/language';

const levels = {
  RU: [
    ['A1', 'Начинаю', '30 слов · основы грамматики', 'sky'],
    ['A2', 'Понимаю', '40 слов · времена и тексты', 'gold'],
    ['B1', 'Общаюсь', '50 слов · уверенная речь', 'blue'],
    ['B2', 'Говорю свободно', '60 слов · сложные темы', 'navy'],
  ],
  KZ: [
    ['A1', 'Бастаймын', '30 сөз · грамматика негіздері', 'sky'],
    ['A2', 'Түсінемін', '40 сөз · шақтар мен мәтіндер', 'gold'],
    ['B1', 'Сөйлесемін', '50 сөз · сенімді сөйлеу', 'blue'],
    ['B2', 'Еркін сөйлеймін', '60 сөз · күрделі тақырыптар', 'navy'],
  ],
};

export function CoursePreview({ language }: { language: Language }) {
  const isRu = language === 'RU';
  return (
    <section className="course-preview">
      <div className="section-heading">
        <span className="eyebrow">{isRu ? 'ТВОЙ ПУТЬ' : 'СЕНІҢ ЖОЛЫҢ'}</span>
        <h2>{isRu ? 'От первого слова до уверенного общения' : 'Алғашқы сөзден еркін әңгімеге дейін'}</h2>
        <p>{isRu ? '48 уроков, которые развивают все навыки вместе.' : 'Барлық дағдыны бірге дамытатын 48 сабақ.'}</p>
      </div>
      <div className="level-grid">
        {levels[language].map(([name, title, detail, tone], index) => (
          <Link className={`level-card level-card--${tone}`} href={`/course/${name.toLowerCase()}`} key={name}>
            <div className="level-card__top"><span className="level-card__number">{String(index + 1).padStart(2, '0')}</span><span className="level-card__badge">{name}</span></div>
            <h3>{title}</h3><p>{detail}</p><span className="level-card__lessons">12 {isRu ? 'уроков' : 'сабақ'} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
