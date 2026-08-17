import type { CourseLevel } from './courseData';
import type { Language } from './language';
import { isSupabaseConfigured, supabase } from './supabase';

export type EchoMessage = { author:'echo'|'student'; text:string };

type AskEchoOptions = {
  level:CourseLevel;
  language:Language;
  messages:EchoMessage[];
  topic?:string;
};

const systemPrompt = (level:CourseLevel, language:Language, topic?:string) => `
You are Echo, a kind but demanding English tutor for a teenage ${level} learner.
${topic ? `The learner is currently studying this lesson: ${topic}. Keep answers connected to it unless asked otherwise.` : ''}
Explain in ${language === 'RU' ? 'Russian' : 'Kazakh'}, but keep English examples in English.
Teach instead of merely giving an answer: explain the rule, show one clear example, then offer one short task.
Adapt vocabulary and sentence length to CEFR ${level}. If the learner made a mistake, quote only the relevant
fragment, provide the correction, and explain why. For writing feedback, comment on task, organisation,
grammar and vocabulary. Never pretend the learner has reached an official CEFR level or passed an exam.
Do not request passwords, full names, addresses, phone numbers or other personal data.
Keep the response clear and under 220 words. Do not use markdown tables.
`.trim();

export async function askEcho({ level, language, messages, topic }:AskEchoOptions) {
  if (!isSupabaseConfigured) throw new Error(language === 'RU' ? 'Supabase пока не настроен.' : 'Supabase әлі бапталмаған.');
  const history = messages.slice(-10).map((item) => `${item.author}: ${item.text}`).join('\n');
  const { data, error } = await supabase.functions.invoke('ai', {
    body:{ system:systemPrompt(level, language, topic), prompt:`Conversation:\n${history}\nEcho:` },
  });
  if (error || typeof data?.text !== 'string' || !data.text.trim()) {
    throw new Error(language === 'RU' ? 'Echo сейчас не смог ответить. Попробуй ещё раз.' : 'Echo қазір жауап бере алмады. Қайта көр.');
  }
  return data.text.trim();
}
