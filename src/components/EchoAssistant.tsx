import { FormEvent, useEffect, useRef, useState } from 'react';
import { askEcho, type EchoMessage } from '../lib/echoAi';
import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';
import { containsProfanity, warningMessage } from '../lib/conversationSafety';
import { VoiceControls } from './VoiceControls';
import { AiMessageContent } from './AiMessageContent';
import { cleanAiText } from '../lib/aiText';

type Props = { language:Language; initialLevel?:CourseLevel; topic?:string };
const levels: CourseLevel[] = ['A1','A2','B1','B2'];

const starter = (language:Language): EchoMessage => ({ author:'echo', text:language === 'RU'
  ? 'Привет! Я Echo. Спроси меня о грамматике, пришли английское предложение на проверку или попроси новые задания.'
  : 'Сәлем! Мен Echo. Грамматика туралы сұра, ағылшын сөйлеміңді тексеруге жібер немесе жаңа тапсырма сұра.' });

export function EchoAssistant({ language, initialLevel = 'A1', topic }:Props) {
  const [level, setLevel] = useState<CourseLevel>(initialLevel);
  const [messages, setMessages] = useState<EchoMessage[]>([topic ? { author:'echo', text:language === 'RU' ? `Я вижу, что ты изучаешь «${topic}». Что объяснить подробнее?` : `Сен «${topic}» тақырыбын оқып жатқаныңды көріп тұрмын. Нені толығырақ түсіндірейін?` } : starter(language)]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);
  const isRu = language === 'RU';
  const suggestions = isRu
    ? ['Объясни разницу времён на одном примере','Проверь моё английское предложение','Создай персональный мини-урок по моей слабой теме: объяснение, пример и 3 задания без ответов']
    : ['Шақтардың айырмасын бір мысалмен түсіндір','Ағылшын сөйлемімді тексер','Менің тақырыбыма 5 тапсырма құрастыр'];

  useEffect(() => {
    const conversation = conversationRef.current;
    if (!conversation) return;
    requestAnimationFrame(() => conversation.scrollTo({ top:conversation.scrollHeight, behavior:'smooth' }));
  }, [messages, busy, error]);

  const send = async (event?:FormEvent, suggested?:string) => {
    event?.preventDefault();
    const text = (suggested ?? input).trim();
    if (!text || busy) return;
    if (containsProfanity(text)) {
      setMessages((items) => [...items, {author:'student',text}, {author:'echo',text:warningMessage(language)}]);
      setInput(''); return;
    }
    const nextMessages: EchoMessage[] = [...messages, {author:'student',text}];
    setMessages(nextMessages); setInput(''); setError(''); setBusy(true);
    try {
      const reply = await askEcho({ level, language, messages:nextMessages, topic });
      setMessages((items) => [...items, {author:'echo',text:reply}]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : (isRu ? 'Неизвестная ошибка.' : 'Белгісіз қате.'));
    } finally { setBusy(false); }
  };

  return (
    <section className="assistant-card">
      <div className="assistant-settings"><label>{isRu ? 'Твой уровень' : 'Сенің деңгейің'}<select value={level} onChange={(event) => setLevel(event.target.value as CourseLevel)}>{levels.map((item) => <option key={item}>{item}</option>)}</select></label><span>{topic ? `${isRu ? 'Тема' : 'Тақырып'}: ${topic}` : (isRu ? 'Echo подстроит сложность ответа' : 'Echo жауап күрделілігін бейімдейді')}</span></div>
      <div className="assistant-suggestions">{suggestions.map((item) => <button disabled={busy} onClick={() => void send(undefined, item)} type="button" key={item}>{item}</button>)}</div>
      <div className="assistant-conversation" aria-live="polite" ref={conversationRef}>
        {messages.map((message, index) => <article className={`assistant-message assistant-message--${message.author}`} key={`${index}-${message.text}`}><small>{message.author === 'echo' ? 'Echo AI' : (isRu ? 'Ты' : 'Сен')}</small><AiMessageContent text={message.text} />{message.author === 'echo' && <VoiceControls language={language} text={cleanAiText(message.text)} speechLanguage={isRu ? 'ru-RU' : 'kk-KZ'} />}</article>)}
        {busy && <p className="typing">Echo {isRu ? 'готовит объяснение' : 'түсіндірме дайындап жатыр'}…</p>}
      </div>
      {error && <p className="mic-error">{error}</p>}
      <form className="assistant-form" onSubmit={(event) => void send(event)}><label htmlFor="echo-question">{isRu ? 'Сообщение Echo' : 'Echo-ға хабарлама'}</label><textarea id="echo-question" maxLength={1500} placeholder={isRu ? 'Например: почему здесь нужен Present Perfect?' : 'Мысалы: мұнда Present Perfect неге керек?'} value={input} onChange={(event) => setInput(event.target.value)} /><div><small>{input.length}/1500 · {isRu ? 'Не отправляй личные данные' : 'Жеке деректерді жіберме'}</small><button disabled={busy || !input.trim()} type="submit">{isRu ? 'Отправить' : 'Жіберу'} →</button></div></form>
    </section>
  );
}
