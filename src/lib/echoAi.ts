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
${language === 'KZ' ? 'Use natural, grammatically correct Kazakh in Cyrillic. Do not answer in Russian and do not mix Russian words into the explanation. English grammar terms may remain in English, but explain every term in Kazakh.' : ''}
Teach instead of merely giving an answer: explain the rule, show one clear example, then offer one short task.
Adapt vocabulary and sentence length to CEFR ${level}. If the learner made a mistake, quote only the relevant
fragment, provide the correction, and explain why. For writing feedback, comment on task, organisation,
grammar and vocabulary. Never pretend the learner has reached an official CEFR level or passed an exam.
Do not request passwords, full names, addresses, phone numbers or other personal data.
Keep the response clear and under 220 words. Do not use markdown tables.
Use plain text without Markdown markers such as **, *, #, backticks, or horizontal rules.
Separate sections with short headings and blank lines. Use numbered items only when a list is necessary.
`.trim();

function hasKazakhExplanation(text:string) {
  return (text.match(/[әіңғүұқөһ]/gi)?.length ?? 0) >= 3;
}

async function requestEcho(system:string, prompt:string) {
  const { data, error } = await supabase.functions.invoke('ai', { body:{ system, prompt } });
  return !error && typeof data?.text === 'string' ? data.text.trim() : '';
}

export async function askEcho({ level, language, messages, topic }:AskEchoOptions) {
  if (!isSupabaseConfigured) throw new Error(language === 'RU' ? 'Supabase пока не настроен.' : 'Supabase әлі бапталмаған.');
  const history = messages.slice(-10).map((item) => `${item.author}: ${item.text}`).join('\n');
  const system = systemPrompt(level, language, topic);
  const prompt = `Conversation:\n${history}\nEcho:`;
  let reply = await requestEcho(system, prompt);
  if (language === 'KZ' && reply && !hasKazakhExplanation(reply)) {
    reply = await requestEcho(
      `${system}\nMANDATORY: Write the entire explanation in natural Kazakh. Only the English example may be in English.`,
      `${prompt}\nАлдыңғы жауап ағылшынша болды. Ережені толықтай қазақ тілінде түсіндір.`,
    );
  }
  if (!reply || (language === 'KZ' && !hasKazakhExplanation(reply))) {
    throw new Error(language === 'RU' ? 'Echo сейчас не смог ответить. Попробуй ещё раз.' : 'Echo қазір қазақша жауап бере алмады. Қайта көр.');
  }
  return reply;
}
