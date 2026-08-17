import { useState } from 'react';
import type { Language } from '../lib/language';
import type { ReadingText } from '../lib/readingData';

type Props = { texts:ReadingText[]; language:Language; onResult?:(score:number,total:number)=>void };

export function ReadingPractice({ texts, language, onResult }: Props) {
  const [textIndex, setTextIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const isRu = language === 'RU';
  const reading = texts[textIndex];
  const question = reading.questions[questionIndex];
  const total = texts.reduce((sum, item) => sum + item.questions.length, 0);
  const completedBefore = texts.slice(0, textIndex).reduce((sum, item) => sum + item.questions.length, 0);

  const next = () => {
    const nextScore = score + (answer === question.correct ? 1 : 0);
    setScore(nextScore);
    if (questionIndex < reading.questions.length - 1) { setQuestionIndex((value) => value + 1); }
    else if (textIndex < texts.length - 1) { setTextIndex((value) => value + 1); setQuestionIndex(0); }
    else { setFinished(true); onResult?.(nextScore, total); }
    setAnswer(''); setSubmitted(false);
  };

  if (finished) return <section className="lesson-result"><span className="lesson-result__score">{score}/{total}</span><h2>{isRu ? 'Reading завершён!' : 'Reading аяқталды!'}</h2><p>{isRu ? `Ты прочитал материал и ответил на ${total} вопросов.` : `Мәтінді оқып, ${total} сұраққа жауап бердің.`}</p></section>;

  return <section className="reading-practice">
    <article className="reading-text"><small>TEXT {textIndex + 1}/{texts.length}</small><h2>{reading.title}</h2><p>{reading.text}</p></article>
    <div className="question-card"><div className="question-meta"><small>{isRu ? 'ВОПРОС ПО ТЕКСТУ' : 'МӘТІН БОЙЫНША СҰРАҚ'}</small><span>{completedBefore + questionIndex + 1}/{total}</span></div><h2>{question.prompt}</h2><div className="answer-grid">{question.options.map((option, index) => <button className={`answer ${answer === option ? 'answer--selected' : ''} ${submitted && option === question.correct ? 'answer--correct' : ''} ${submitted && answer === option && option !== question.correct ? 'answer--wrong' : ''}`} disabled={submitted} onClick={() => setAnswer(option)} type="button" key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{submitted && <p className={answer === question.correct ? 'result result--good' : 'result'}>{answer === question.correct ? (isRu ? 'Правильно!' : 'Дұрыс!') : `${isRu ? 'Правильный ответ' : 'Дұрыс жауап'}: ${question.correct}`}</p>}<button className="question-action" disabled={!answer} onClick={submitted ? next : () => setSubmitted(true)} type="button">{submitted ? (isRu ? 'Следующий вопрос' : 'Келесі сұрақ') : (isRu ? 'Проверить' : 'Тексеру')} →</button></div>
  </section>;
}
