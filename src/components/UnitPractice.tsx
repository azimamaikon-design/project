import { useState } from 'react';
import type { Language } from '../lib/language';
import type { UnitExercise } from '../lib/unitExercises';
import { VoiceControls } from './VoiceControls';

type Props = { exercises:UnitExercise[]; language:Language; onComplete:(score:number)=>void };
const normalize = (value:string) => value.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

export function UnitPractice({ exercises, language, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const isRu = language === 'RU';
  const exercise = exercises[index];
  const isCorrect = exercise.free
    ? answer.trim().split(/\s+/).length >= 3 && /[a-z]/i.test(answer)
    : normalize(answer) === normalize(exercise.correct);
  const prompt = exercise.prompt
    .replace('Type the missing word:', isRu ? 'Напиши пропущенное слово:' : 'Жетіспейтін сөзді жаз:')
    .replace('Write the complete sentence:', isRu ? 'Напиши полное предложение:' : 'Толық сөйлемді жаз:')
    .replace('Put the words in the correct order:', isRu ? 'Расставь слова в правильном порядке:' : 'Сөздерді дұрыс ретпен орналастыр:')
    .replace('Write your own English sentence using today’s grammar.', isRu ? 'Напиши собственное английское предложение по теме урока.' : 'Бүгінгі грамматикамен өз ағылшын сөйлеміңді жаз.');

  const check = () => { if (!answer.trim()) return; if (isCorrect) setScore((value) => value + 1); setSubmitted(true); };
  const next = () => {
    if (index === exercises.length - 1) { setFinished(true); return; }
    setIndex((value) => value + 1); setAnswer(''); setSubmitted(false);
  };

  if (finished) return <section className="lesson-result"><span className="lesson-result__score">{score}/10</span><h2>{isRu ? 'Первый блок готов!' : 'Бірінші бөлім дайын!'}</h2><p>{isRu ? 'Теперь выполни ещё 10 заданий на закрепление темы.' : 'Енді тақырыпты бекіту үшін тағы 10 тапсырма орында.'}</p><div><button className="primary-button" onClick={() => onComplete(score)} type="button">{isRu ? 'Дополнительная практика' : 'Қосымша тәжірибе'} →</button><button className="text-button reset-button" onClick={() => { setIndex(0); setScore(0); setAnswer(''); setSubmitted(false); setFinished(false); }} type="button">{isRu ? 'Повторить задания' : 'Тапсырмаларды қайталау'}</button></div></section>;

  return (
    <section className="question-card">
      <div className="question-meta"><small>{isRu ? 'НАПИШИ ОТВЕТ' : 'ЖАУАПТЫ ЖАЗ'}</small><span>{index + 1}/10</span></div>
      <h2>{prompt}</h2>
      <div className="write-answer"><input autoComplete="off" disabled={submitted} onChange={(event) => setAnswer(event.target.value)} placeholder={isRu ? 'Напиши по-английски…' : 'Ағылшынша жаз…'} value={answer} /><p>{exercise.free ? (isRu ? 'Минимум три слова.' : 'Кемінде үш сөз.') : (isRu ? 'Обрати внимание на порядок слов.' : 'Сөздердің ретіне назар аудар.')}</p></div>
      {submitted && <><p className={isCorrect ? 'result result--good' : 'result'}>{isCorrect ? (isRu ? 'Правильно!' : 'Дұрыс!') : `${isRu ? 'Правильный вариант' : 'Дұрыс нұсқа'}: ${exercise.model}`}</p>{!exercise.free && <div className="answer-review"><strong>{exercise.model}</strong><VoiceControls language={language} text={exercise.model} /></div>}</>}
      <button className="question-action" disabled={!answer.trim()} onClick={submitted ? next : check} type="button">{submitted ? (index === 9 ? (isRu ? 'Завершить' : 'Аяқтау') : (isRu ? 'Следующее задание' : 'Келесі тапсырма')) : (isRu ? 'Проверить' : 'Тексеру')} →</button>
    </section>
  );
}
