import { useState } from 'react';
import type { CourseLevel } from '../lib/courseData';
import type { Language } from '../lib/language';
import type { SpeakingActivity } from '../lib/practiceData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useSpeechRecognition } from '../lib/useSpeechRecognition';
import { VoiceControls } from './VoiceControls';
import { containsProfanity, contextualFallbackQuestion, isRepeatedReply, warningMessage } from '../lib/conversationSafety';
import { difficultyRules } from '../lib/courseDifficulty';

type Props = { activity: SpeakingActivity; language: Language; level: CourseLevel; onResult?:(score:number,total:number)=>void };
type Message = { author: 'echo' | 'student'; text: string };

function messageLanguage(text: string) {
  if (/[әіңғүұқөһ]/i.test(text)) return 'kk-KZ';
  if (/[а-яё]/i.test(text)) return 'ru-RU';
  return 'en-US';
}

export function SpeakingPractice({ activity, language, level, onResult }: Props) {
  const [messages, setMessages] = useState<Message[]>([{ author:'echo', text:activity.firstMessage }]);
  const [isReplying, setIsReplying] = useState(false);
  const [turns, setTurns] = useState(0);
  const speech = useSpeechRecognition();
  const isRu = language === 'RU';
  const minimumWords = difficultyRules[level].speakingWords;

  const send = async () => {
    const answer = speech.transcript.trim();
    if (!answer || isReplying) return;
    const previousEchoMessages = messages.filter((message) => message.author === 'echo').map((message) => message.text);
    if (containsProfanity(answer)) {
      setMessages((items) => [...items, { author:'student', text:answer }, { author:'echo', text:warningMessage(language) }]);
      speech.setTranscript(''); return;
    }
    if (answer.split(/\s+/).filter(Boolean).length < minimumWords) {
      const request = isRu
        ? `Ответ слишком короткий. Скажи минимум ${minimumWords} английских слов и добавь причину или пример.`
        : `Жауап тым қысқа. Кемінде ${minimumWords} ағылшын сөзін айтып, себеп немесе мысал қос.`;
      setMessages((items) => [...items, { author:'student', text:answer }, { author:'echo', text:request }]);
      speech.setTranscript(''); return;
    }
    const nextTurn = Math.min(turns + 1, 5);
    setMessages((items) => [...items, { author:'student', text:answer }]);
    setTurns(nextTurn);
    speech.setTranscript('');
    if (nextTurn === 5) { onResult?.(5, 5); return; }
    setIsReplying(true);
    const history = messages.map((message) => `${message.author}: ${message.text}`).join('\n');
    if (!isSupabaseConfigured) {
      setMessages((items) => [...items, { author:'echo', text:contextualFallbackQuestion(level, answer, previousEchoMessages) }]); setIsReplying(false); return;
    }
    const { data, error } = await supabase.functions.invoke('ai', { body: {
      system: `You are Echo, a firm but kind English tutor speaking with a ${level} learner. Your task is to ask exactly one new question based directly on the learner's latest answer. Mention or refer to a detail from that answer. Use simple English at ${level} level. You may first correct one important mistake in one short sentence. Read the full history and NEVER repeat, paraphrase, or reuse an earlier question. Do not give a generic unrelated question. If the learner uses profanity, require respectful language.`,
      prompt: `${activity.situation}\nConversation:\n${history}\nstudent: ${answer}\nEcho:`,
    } });
    const aiReply = !error && typeof data?.text === 'string' ? data.text.trim() : '';
    const reply = !aiReply || isRepeatedReply(aiReply, previousEchoMessages)
      ? contextualFallbackQuestion(level, answer, previousEchoMessages)
      : aiReply;
    setMessages((items) => [...items, { author:'echo', text:reply }]); setIsReplying(false);
  };

  return (
    <section className="speaking-practice">
      <div className="speaking-heading"><span className="listening-audio__icon">◉</span><div><small>SPEAKING · {activity.title}</small><h2>{activity.situation}</h2></div></div>
      <div className="speaking-progress"><span style={{ width:`${turns / 5 * 100}%` }} /><strong>{turns}/5</strong></div>
      <div className="prompt-chips">{activity.prompts.map((prompt) => <span key={prompt}>{prompt}</span>)}</div>
      <p className="speaking-requirement">{isRu ? `Каждый ответ: минимум ${minimumWords} английских слов.` : `Әр жауапта кемінде ${minimumWords} ағылшын сөзі болуы керек.`}</p>
      <div className="conversation">
        {messages.map((message, index) => <div className={`message-bubble message-bubble--${message.author}`} key={`${message.text}-${index}`}><small>{message.author === 'echo' ? 'Echo' : (isRu ? 'Ты' : 'Сен')}</small><p>{message.text}</p>{message.author === 'echo' && <VoiceControls language={language} text={message.text} speechLanguage={messageLanguage(message.text)} />}</div>)}
        {isReplying && <p className="typing">Echo {isRu ? 'думает' : 'ойланып жатыр'}…</p>}
      </div>
      {turns < 5 && (!speech.isSupported ? <p className="mic-error">{isRu ? 'Распознавание речи недоступно. Открой сайт в Chrome или Edge.' : 'Сөйлеуді тану қолжетімсіз. Сайтты Chrome немесе Edge браузерінде аш.'}</p> : (
        <div className="mic-panel">
          <button className={speech.isListening ? 'mic-button mic-button--active' : 'mic-button'} onClick={speech.isListening ? speech.stop : speech.start} type="button"><span>●</span>{speech.isListening ? (isRu ? 'Остановить запись' : 'Жазуды тоқтату') : (isRu ? 'Ответить голосом' : 'Дауыспен жауап беру')}</button>
          {speech.transcript && <div className="transcript-input"><label>{isRu ? 'Echo услышал:' : 'Echo естіді:'}</label><textarea value={speech.transcript} onChange={(event) => speech.setTranscript(event.target.value)} /><button onClick={send} type="button">{isRu ? 'Отправить' : 'Жіберу'} →</button></div>}
          {speech.error && <p className="mic-error">{isRu ? 'Не удалось услышать ответ. Разреши доступ к микрофону и попробуй снова.' : 'Жауап естілмеді. Микрофонға рұқсат беріп, қайта көр.'}</p>}
        </div>
      ))}
      {turns === 5 && <div className="speaking-complete"><strong>{isRu ? 'Speaking выполнен!' : 'Speaking аяқталды!'}</strong><p>{isRu ? 'Ты дал пять голосовых ответов и завершил практику.' : 'Бес ауызша жауап беріп, тәжірибені аяқтадың.'}</p></div>}
    </section>
  );
}
