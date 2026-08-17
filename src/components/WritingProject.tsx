import { useState } from 'react';
import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';
import { evaluateWriting, type WritingEvaluation } from '../lib/writingEvaluation';
import { getWritingTask } from '../lib/writingTasks';

type Props = { level:CourseLevel; lessonIndex:number; language:Language; onComplete:(score:number)=>void };

export function WritingProject({ level, lessonIndex, language, onComplete }:Props) {
  const task = getWritingTask(level, lessonIndex, language);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<WritingEvaluation>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const isRu = language === 'RU';
  const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const check = async () => {
    setBusy(true); setError('');
    try { setEvaluation(await evaluateWriting(level, language, task, answer)); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : (isRu ? 'Ошибка проверки.' : 'Тексеру қатесі.')); }
    finally { setBusy(false); }
  };

  if (evaluation) return <section className="writing-result">
    <div className="writing-result__score"><strong>{evaluation.total}/20</strong><span>{isRu ? 'оценка Echo' : 'Echo бағасы'}</span></div>
    <div className="writing-rubric"><span>{isRu ? 'Задание' : 'Тапсырма'} <b>{evaluation.scores.task}/5</b></span><span>{isRu ? 'Структура' : 'Құрылым'} <b>{evaluation.scores.organisation}/5</b></span><span>{isRu ? 'Грамматика' : 'Грамматика'} <b>{evaluation.scores.grammar}/5</b></span><span>{isRu ? 'Словарь' : 'Сөздік'} <b>{evaluation.scores.vocabulary}/5</b></span></div>
    <article><small>ECHO FEEDBACK</small><p>{evaluation.feedback}</p></article>
    <details><summary>{isRu ? 'Показать улучшенный вариант' : 'Жақсартылған нұсқаны көрсету'}</summary><p>{evaluation.improvedVersion}</p></details>
    <div className="writing-actions"><button className="primary-button" onClick={() => onComplete(evaluation.total)} type="button">{isRu ? 'Сохранить и перейти к Reading' : 'Сақтап, Reading-ке өту'} →</button><button className="text-button reset-button" onClick={() => setEvaluation(undefined)} type="button">{isRu ? 'Исправить текст' : 'Мәтінді түзету'}</button></div>
  </section>;

  return <section className="writing-project">
    <div className="writing-project__heading"><div><small>WRITING PROJECT · {task.type}</small><h2>{task.prompt}</h2></div><strong className={words > task.maxWords ? 'word-count word-count--warning' : 'word-count'}>{words}/{task.minWords}–{task.maxWords}</strong></div>
    <ul>{task.points.map((point) => <li key={point}>{point}</li>)}</ul>
    <textarea maxLength={2500} onChange={(event) => setAnswer(event.target.value)} placeholder={isRu ? 'Пиши на английском языке…' : 'Ағылшын тілінде жаз…'} value={answer} />
    <p className="writing-note">{isRu ? 'Не указывай настоящее полное имя, адрес, телефон или пароли.' : 'Нақты толық атыңды, мекенжайыңды, телефоныңды немесе құпиясөздерді жазба.'}</p>
    {error && <p className="mic-error">{error}</p>}
    <button className="question-action" disabled={busy || words < task.minWords || words > task.maxWords} onClick={() => void check()} type="button">{busy ? (isRu ? 'Echo проверяет…' : 'Echo тексеріп жатыр…') : (isRu ? 'Отправить на проверку Echo' : 'Echo тексеруіне жіберу')} →</button>
  </section>;
}
