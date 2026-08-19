import type { Language } from '../lib/language';
import type { CourseLevel } from '../lib/courseData';
import { getLessonTheory } from '../lib/lessonTheory';
import { getLessonDetails } from '../lib/lessonDetails';
import { VoiceControls } from './VoiceControls';

type Props = { language: Language; level: CourseLevel; lessonIndex: number; onContinue: () => void };

function theorySpeech(language: Language, theory: ReturnType<typeof getLessonTheory>) {
  const isRu = language === 'RU';
  return [
    isRu ? `Тема урока. ${theory.goal}` : `Бүгінгі сабақтың тақырыбы. ${theory.goal}`,
    ...theory.explanation,
    isRu ? `Значение примера. ${theory.examples[0].translation}` : `Мысалдың мағынасы. ${theory.examples[0].translation}`,
    isRu ? `Частая ошибка. ${theory.mistake}` : `Жиі кездесетін қате. ${theory.mistake}`,
    isRu ? `Совет Echo. ${theory.tip}` : `Echo кеңесі. ${theory.tip}`,
  ].join(' ');
}

export function LessonTheory({ language, level, lessonIndex, onContinue }: Props) {
  const theory = getLessonTheory(level, lessonIndex, language);
  const isRu = language === 'RU';
  const details = level === 'A1' ? getLessonDetails(level, lessonIndex, language) : {
    formulas: [{ label:isRu ? 'Основная схема' : 'Негізгі үлгі', value:theory.formula }],
    focus: {
      sentence:theory.examples[0].english,
      translation:theory.examples[0].translation,
      steps:theory.explanation,
      negative:'',
      question:'',
    },
  };
  const speech = theorySpeech(language, theory);

  return (
    <section className="theory-card">
      <div className="theory-card__echo"><span>E</span><div><small>ECHO {isRu ? 'ОБЪЯСНЯЕТ' : 'ТҮСІНДІРЕДІ'}</small><h2>{theory.goal}</h2></div></div>
      <VoiceControls language={language} text={speech} speechLanguage={isRu ? 'ru-RU' : 'kk-KZ'} />
      <div className="theory-explanation">{theory.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="formula-section">
        <small>{isRu ? 'ФОРМУЛЫ' : 'ФОРМУЛАЛАР'}</small>
        {details.formulas.map((formula) => <div className="formula-row" key={formula.label}><span>{formula.label}</span><strong>{formula.value}</strong></div>)}
      </div>
      <div className="focus-example">
        <small>{isRu ? 'РАЗБЕРЁМ ОДИН ПРИМЕР' : 'БІР МЫСАЛДЫ ТАЛДАЙЫҚ'}</small>
        <h3>{details.focus.sentence}</h3><p className="focus-example__translation">{details.focus.translation}</p>
        <ol>{details.focus.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        {details.focus.negative && <div className="transformations">
          <p><span>−</span><strong>{details.focus.negative}</strong></p>
          <p><span>?</span><strong>{details.focus.question}</strong></p>
        </div>}
      </div>
      <div className="example-list"><small>{isRu ? 'ПРИМЕРЫ' : 'МЫСАЛДАР'}</small>{theory.examples.map((example) => <p key={example.english}><span>✓</span><span><strong>{example.english}</strong><small>{example.translation}</small></span></p>)}</div>
      <div className="lesson-notes"><p><strong>{isRu ? 'Частая ошибка:' : 'Жиі қате:'}</strong> {theory.mistake}</p><p><strong>{isRu ? 'Совет Echo:' : 'Echo кеңесі:'}</strong> {theory.tip}</p></div>
      <button className="primary-button theory-card__continue" onClick={onContinue} type="button">{isRu ? 'Я понял, перейти к заданиям' : 'Түсіндім, тапсырмаларға өту'} <span>→</span></button>
    </section>
  );
}
