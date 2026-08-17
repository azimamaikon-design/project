import { useState } from 'react';
import type { ChallengeExercise } from '../lib/challengeData';
import type { Language } from '../lib/language';

type Props = { exercises:ChallengeExercise[]; language:Language; onComplete:(score:number)=>void };

export function ChallengePractice({ exercises, language, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const isRu = language === 'RU';
  const exercise = exercises[index];

  const next = () => {
    const nextScore = score + (answer === exercise.correct ? 1 : 0);
    if (index === exercises.length - 1) { onComplete(nextScore); return; }
    setScore(nextScore); setIndex((value) => value + 1); setAnswer(''); setSubmitted(false);
  };

  return (
    <section className="question-card">
      <div className="question-meta"><small>{isRu ? 'ДОПОЛНИТЕЛЬНАЯ ПРАКТИКА' : 'ҚОСЫМША ТӘЖІРИБЕ'}</small><span>{index + 1}/{exercises.length}</span></div>
      <h2>{exercise.prompt}</h2>
      <div className="answer-grid">{exercise.options.map((option, optionIndex) => <button className={`answer ${answer === option ? 'answer--selected' : ''} ${submitted && option === exercise.correct ? 'answer--correct' : ''} ${submitted && answer === option && option !== exercise.correct ? 'answer--wrong' : ''}`} disabled={submitted} onClick={() => setAnswer(option)} type="button" key={option}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
      {submitted && <p className={answer === exercise.correct ? 'result result--good' : 'result'}>{answer === exercise.correct ? (isRu ? 'Правильно!' : 'Дұрыс!') : `${isRu ? 'Правильный ответ' : 'Дұрыс жауап'}: ${exercise.correct}`}</p>}
      <button className="question-action" disabled={!answer} onClick={submitted ? next : () => setSubmitted(true)} type="button">{submitted ? (index === exercises.length - 1 ? (isRu ? 'Завершить блок' : 'Бөлімді аяқтау') : (isRu ? 'Следующее задание' : 'Келесі тапсырма')) : (isRu ? 'Проверить' : 'Тексеру')} →</button>
    </section>
  );
}
