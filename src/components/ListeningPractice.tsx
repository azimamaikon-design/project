import { useState } from 'react';
import type { ListeningActivity } from '../lib/practiceData';
import type { Language } from '../lib/language';
import { VoiceControls } from './VoiceControls';

type Props = { activity: ListeningActivity; language: Language; onResult?:(score:number,total:number)=>void };

export function ListeningPractice({ activity, language, onResult }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const isRu = language === 'RU';
  const question = activity.questions[questionIndex];

  const check = () => {
    if (!selected) return;
    if (selected === question.correct) setScore((value) => value + 1);
    setSubmitted(true);
  };

  const next = () => {
    if (questionIndex === activity.questions.length - 1) { setFinished(true); onResult?.(score, activity.questions.length); return; }
    setQuestionIndex((value) => value + 1); setSelected(undefined); setSubmitted(false);
  };

  if (finished) return (
    <section className="lesson-result">
      <span className="lesson-result__score">{score}/{activity.questions.length}</span>
      <h2>{isRu ? 'Listening завершён' : 'Listening аяқталды'}</h2>
      <p>{isRu ? 'Теперь можно открыть расшифровку и проверить, всё ли ты услышал.' : 'Енді мәтінді ашып, нені естігеніңді тексер.'}</p>
      <details className="transcript"><summary>{isRu ? 'Показать текст аудио' : 'Аудио мәтінін көрсету'}</summary><p>{activity.audio}</p></details>
    </section>
  );

  return (
    <section className="listening-practice">
      <div className="listening-audio"><span className="listening-audio__icon">♪</span><div><small>LISTENING · {activity.title}</small><h2>{isRu ? 'Сначала прослушай аудио' : 'Алдымен аудионы тыңда'}</h2></div></div>
      <VoiceControls language={language} text={activity.audio} />
      <p className="listening-hint">{isRu ? 'Текст откроется только после всех вопросов. Аудио можно повторить.' : 'Мәтін барлық сұрақтан кейін ғана ашылады. Аудионы қайталап тыңдауға болады.'}</p>
      <div className="question-card">
        <div className="question-meta"><small>{isRu ? 'ВОПРОС ПО АУДИО' : 'АУДИО БОЙЫНША СҰРАҚ'}</small><span>{questionIndex + 1}/{activity.questions.length}</span></div>
        <h2>{question.prompt}</h2>
        <div className="answer-grid">{question.options.map((answer, index) => <button className={`answer ${selected === answer ? 'answer--selected' : ''} ${submitted && answer === question.correct ? 'answer--correct' : ''} ${submitted && selected === answer && answer !== question.correct ? 'answer--wrong' : ''}`} disabled={submitted} onClick={() => setSelected(answer)} type="button" key={answer}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>)}</div>
        {submitted && <p className={selected === question.correct ? 'result result--good' : 'result'}>{selected === question.correct ? (isRu ? 'Правильно!' : 'Дұрыс!') : `${isRu ? 'Правильный ответ' : 'Дұрыс жауап'}: ${question.correct}`}</p>}
        <button className="question-action" disabled={!selected} onClick={submitted ? next : check} type="button">{submitted ? (isRu ? 'Дальше' : 'Келесі') : (isRu ? 'Проверить' : 'Тексеру')} →</button>
      </div>
    </section>
  );
}
