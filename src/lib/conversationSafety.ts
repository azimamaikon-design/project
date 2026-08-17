import type { CourseLevel } from './courseData';
import type { Language } from './language';

const blockedWords = [
  'fuck', 'fucking', 'shit', 'bitch', 'asshole',
  'бля', 'бляд', 'сука', 'хуй', 'пизд', 'еба', 'ёба', 'мудак',
  'боқ', 'сiг', 'сіг', 'қотақ', 'көт', 'ақымақ',
];

const followUps: Record<CourseLevel, string[]> = {
  A1: ['What do you like about it?', 'Who do you usually do it with?', 'When do you usually do that?', 'Can you describe it in three words?', 'Where does it happen?', 'How does it make you feel?', 'What is your favourite part?', 'What would you like to try next?'],
  A2: ['Why is that important to you?', 'What happened the last time you did that?', 'What are you going to do next?', 'How is it different from before?', 'Who could help you with that?', 'What was the best part?', 'Would you recommend it to a friend?', 'What could make it better?'],
  B1: ['What might happen if you changed your plan?', 'What advice would you give a friend?', 'Can you explain one advantage?', 'How has your opinion changed?', 'What is the biggest disadvantage?', 'How would another person see this?', 'What have you learned from this?', 'What decision would you make now?'],
  B2: ['What evidence supports your position?', 'Could there be a strong counterargument?', 'How might this affect society in the long term?', 'Under what conditions would you change your view?', 'Whose perspective is missing here?', 'What unintended consequence could arise?', 'How would you respond to a critic?', 'What practical solution would you propose?'],
};

const normalize = (text: string) => text.toLowerCase().replace(/[^a-zа-яёәіңғүұқөһ0-9]+/gi, ' ').trim();

export function containsProfanity(text: string) {
  const normalized = normalize(text);
  return blockedWords.some((word) => normalized.includes(word));
}

export function warningMessage(language: Language) {
  return language === 'RU'
    ? 'Так разговаривать нельзя. В Echo’s School мы общаемся уважительно. Переформулируй ответ без нецензурных слов.'
    : 'Бұлай сөйлеуге болмайды. Echo’s School мектебінде бір-бірімізбен құрметпен сөйлесеміз. Жауабыңды әдепті сөздермен қайта айт.';
}

export function nextUniqueQuestion(level: CourseLevel, previousEchoMessages: string[]) {
  const used = previousEchoMessages.map(normalize);
  return followUps[level].find((question) => !used.includes(normalize(question)))
    ?? `Can you give me another new example? Question ${previousEchoMessages.length + 1}.`;
}

export function contextualFallbackQuestion(level: CourseLevel, answer: string, previousEchoMessages: string[]) {
  const usefulWords = normalize(answer).split(' ').filter((word) => word.length > 3);
  const focus = usefulWords[usefulWords.length - 1];
  const contextual = focus
    ? (level === 'A1' ? `You mentioned ${focus}. What do you like about it?`
      : level === 'A2' ? `You mentioned ${focus}. When did it first become important to you?`
      : level === 'B1' ? `How has ${focus} influenced your experience?`
      : `What evidence from your experience supports your point about ${focus}?`)
    : nextUniqueQuestion(level, previousEchoMessages);
  return isRepeatedReply(contextual, previousEchoMessages) ? nextUniqueQuestion(level, previousEchoMessages) : contextual;
}

export function isRepeatedReply(reply: string, previousEchoMessages: string[]) {
  const normalized = normalize(reply);
  return previousEchoMessages.some((message) => normalize(message) === normalized);
}
