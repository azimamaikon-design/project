import type { Language } from './language';

const coreTopicsRu = {
  A1: ['Hello!', 'About me', 'My day', 'Home & city', 'Food & shopping', 'Free time', 'My first stories'],
  A2: ['Articles & quantity', 'Present tenses', 'Past stories', 'Life experience', 'Future plans', 'Modals & conditionals', 'Connected texts'],
  B1: ['Narrative tenses', 'Perfect tenses', 'Passive voice', 'Reported speech', 'Relative clauses', 'Second & third conditionals', 'Opinion & text analysis'],
  B2: ['Advanced tenses', 'Passive & causative', 'Reported speech', 'Advanced conditionals', 'Past modals', 'Gerunds, infinitives & collocations', 'Complex clauses & cohesion'],
};

const coreTopicsKz: typeof coreTopicsRu = {
  A1: ['Сәлем!', 'Мен туралы', 'Менің күнім', 'Үй және қала', 'Тамақ және сауда', 'Бос уақыт', 'Алғашқы әңгімелерім'],
  A2: ['Адамдар және мінез', 'Қазіргі өмір', 'Әңгімелер мен естеліктер', 'Өмірлік тәжірибе', 'Жоспарлар мен болжамдар', 'Саяхат', 'Байланысты ағылшын тілі'],
  B1: ['Мәтіндегі артикльдер', 'Perfect шақтары', 'Perfect Continuous', 'Second Conditional', 'Third Conditional', 'Mixed Conditionals', 'Мәтіндегі грамматика'],
  B2: ['Күрделі шақтар', 'Passive Voice', 'Reported Speech', 'Күрделі шарттар', 'Өткен шақ модальдары', 'Gerunds & Infinitives', 'Күрделі ағылшын тілі'],
};

const practiceRu = ['Диалоги на слух', 'История и пересказ', 'Реальная ситуация', 'Мнение и аргументы', 'Итоговая устная практика'];
const practiceKz = ['Диалогты тыңдау', 'Әңгіме және мазмұндау', 'Шынайы жағдай', 'Пікір мен дәлелдер', 'Қорытынды ауызша тәжірибе'];

export type CourseLevel = keyof typeof coreTopicsRu;
export const validLevels = Object.keys(coreTopicsRu) as CourseLevel[];

export function getLessons(level: CourseLevel, language: Language) {
  const topics = language === 'RU' ? coreTopicsRu : coreTopicsKz;
  const core = topics[level].map((title, index) => ({
    title,
    type: language === 'RU' ? `Основной урок ${index + 1}` : `${index + 1}-негізгі сабақ`,
  }));
  return [...core, ...(language === 'RU' ? practiceRu : practiceKz).map((title) => ({
    title,
    type: language === 'RU' ? 'Говорение и аудирование' : 'Сөйлеу және тыңдау',
  }))];
}
