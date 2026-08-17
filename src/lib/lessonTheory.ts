import type { CourseLevel } from './courseData';
import type { Language } from './language';
import { a1TheoryKz, defaultTheoryKz } from './lessonTheoryKz';
import { b2TheoryKz, b2TheoryRu } from './b2Theory';

export type Theory = {
  goal: string;
  explanation: string[];
  formula: string;
  examples: { english: string; translation: string }[];
  mistake: string;
  tip: string;
};

const a1Ru: Theory[] = [
  {
    goal: 'Научиться представляться и составлять предложения с глаголом to be.',
    explanation: ['To be означает «быть». В русском языке мы часто пропускаем его: «Я ученик». В английском глагол обязателен: I am a student.', 'Форма зависит от того, о ком мы говорим: после I ставим am, после he, she, it — is, после you, we, they — are.'],
    formula: 'I + am · He/She/It + is · You/We/They + are',
    examples: [{ english: 'I am Alex.', translation: 'Я Алекс.' }, { english: 'She is my friend.', translation: 'Она моя подруга.' }, { english: 'We are students.', translation: 'Мы ученики.' }],
    mistake: 'Нельзя говорить “I is” или пропускать am: “I a student”.',
    tip: 'Сначала найди подлежащее, затем выбери подходящую форму: am, is или are.',
  },
  {
    goal: 'Рассказать о себе, семье и вещах, которые у тебя есть.',
    explanation: ['Have got переводится как «иметь» или «у меня есть». После I, you, we, they используется have got.', 'После he, she, it форма меняется на has got. В вопросе have или has ставится в начало.'],
    formula: 'I/You/We/They + have got · He/She/It + has got',
    examples: [{ english: 'I have got a sister.', translation: 'У меня есть сестра.' }, { english: 'He has got a bike.', translation: 'У него есть велосипед.' }, { english: 'Have you got a pet?', translation: 'У тебя есть питомец?' }],
    mistake: 'После he или she нельзя использовать have got: правильно “She has got”.',
    tip: 'Свяжи has с he и she: все три слова начинаются со звука «х».',
  },
  {
    goal: 'Говорить о привычках, расписании и повторяющихся действиях.',
    explanation: ['Present Simple нужен для того, что происходит обычно: каждый день, часто или иногда.', 'После he, she, it к обычному глаголу добавляется -s. В отрицаниях используем do not или does not, а основной глагол остаётся без -s.'],
    formula: 'I/You/We/They + verb · He/She/It + verb-s',
    examples: [{ english: 'I study every day.', translation: 'Я учусь каждый день.' }, { english: 'She plays tennis.', translation: 'Она играет в теннис.' }, { english: 'He does not work on Sunday.', translation: 'Он не работает в воскресенье.' }],
    mistake: 'После does не добавляй -s к глаголу: “Does she play?”, а не “Does she plays?”.',
    tip: 'Ищи слова every day, usually, often и sometimes — они часто указывают на Present Simple.',
  },
  {
    goal: 'Описывать дом, город и расположение предметов.',
    explanation: ['There is и there are сообщают, что где-то что-то находится.', 'There is используется с одним предметом, there are — с несколькими. После них можно добавить место: in the room, on the table, near the school.'],
    formula: 'There is + один предмет · There are + несколько предметов',
    examples: [{ english: 'There is a book on the table.', translation: 'На столе лежит книга.' }, { english: 'There are two parks here.', translation: 'Здесь есть два парка.' }, { english: 'Is there a shop nearby?', translation: 'Рядом есть магазин?' }],
    mistake: 'Не используй there are с одним предметом: правильно “There is a house”.',
    tip: 'Сначала посчитай предметы: один — is, два и больше — are.',
  },
  {
    goal: 'Говорить о еде, количестве и покупках.',
    explanation: ['Some и any обозначают неопределённое количество. Some обычно встречается в утверждениях, any — в вопросах и отрицаниях.', 'Исчисляемые слова можно посчитать: an apple, two apples. Неисчисляемые обычно не считают поштучно: water, milk, bread.'],
    formula: 'Утверждение: some · Вопрос/отрицание: any',
    examples: [{ english: 'I have some apples.', translation: 'У меня есть несколько яблок.' }, { english: 'Do you have any water?', translation: 'У тебя есть вода?' }, { english: 'We do not have any bread.', translation: 'У нас нет хлеба.' }],
    mistake: 'Не говори “a water”. Используй “some water” или единицу: “a bottle of water”.',
    tip: 'Представь корзину: в ней что-то есть — some; спрашиваем, есть ли что-нибудь, — any.',
  },
  {
    goal: 'Описывать действия, которые происходят прямо сейчас.',
    explanation: ['Present Continuous показывает процесс в момент речи. Он состоит из формы to be и глагола с окончанием -ing.', 'Сравни: I play every day — привычка. I am playing now — действие происходит сейчас.'],
    formula: 'am/is/are + verb-ing',
    examples: [{ english: 'I am reading now.', translation: 'Я сейчас читаю.' }, { english: 'They are playing outside.', translation: 'Они сейчас играют на улице.' }, { english: 'She is not sleeping.', translation: 'Она сейчас не спит.' }],
    mistake: 'Нельзя пропускать to be: не “I reading”, а “I am reading”.',
    tip: 'Слова now и at the moment часто подсказывают Present Continuous.',
  },
  {
    goal: 'Рассказывать о завершённых событиях в прошлом.',
    explanation: ['Past Simple используется, когда действие закончилось в прошлом. Часто указано время: yesterday, last week, two days ago.', 'К правильным глаголам добавляем -ed. Неправильные глаголы меняют форму, и их нужно запоминать: go — went, see — saw.'],
    formula: 'Утверждение: verb-ed / V2 · Отрицание: did not + verb',
    examples: [{ english: 'I visited my friend yesterday.', translation: 'Я посетил друга вчера.' }, { english: 'We went to the park.', translation: 'Мы ходили в парк.' }, { english: 'She did not play.', translation: 'Она не играла.' }],
    mistake: 'После did используй начальную форму: “Did you go?”, а не “Did you went?”.',
    tip: 'Найди законченное время в прошлом, а затем проверь, правильный глагол или неправильный.',
  },
];

const defaults: Record<CourseLevel, Theory> = {
  A1: a1Ru[0],
  A2: { goal: 'Понять различия английских времён и применять их в тексте.', explanation: ['В английском выбор времени зависит не только от даты, но и от смысла: привычка, процесс, результат или завершённое событие.', 'Сначала определи, когда происходит действие, затем обрати внимание на его продолжительность и связь с настоящим.'], formula: 'Время действия + смысл действия → нужная форма глагола', examples: [{ english: 'I work every day.', translation: 'Я работаю каждый день.' }, { english: 'I am working now.', translation: 'Я сейчас работаю.' }], mistake: 'Не выбирай время только по одному слову-подсказке — прочитай всё предложение.', tip: 'Нарисуй короткую временную линию: прошлое — настоящее — будущее.' },
  B1: { goal: 'Использовать сложную грамматику в связной речи.', explanation: ['На B1 события часто связаны друг с другом: одно произошло раньше другого или прошлое влияет на настоящее.', 'Важно понимать не только форму, но и намерение говорящего.'], formula: 'Контекст + порядок событий + результат', examples: [{ english: 'I have already finished.', translation: 'Я уже закончил.' }, { english: 'If I had time, I would travel.', translation: 'Если бы у меня было время, я бы путешествовал.' }], mistake: 'Не переводи конструкцию слово в слово с русского.', tip: 'Объясни себе, почему выбрано это время, прежде чем отвечать.' },
  B2: { goal: 'Выражать сложные мысли естественно, точно и уместно.', explanation: ['На B2 одна мысль может быть выражена несколькими способами. Выбор зависит от контекста, стиля и нужного акцента.', 'Мы будем сравнивать конструкции, перефразировать и замечать оттенки значения.'], formula: 'Смысл + стиль + контекст → естественная конструкция', examples: [{ english: 'The project has been completed.', translation: 'Проект завершён.' }, { english: 'She said that she was ready.', translation: 'Она сказала, что готова.' }], mistake: 'Сложная форма не всегда лучше простой: выбирай самую естественную.', tip: 'Читай предложение целиком и представляй реальную ситуацию.' },
};

export function getLessonTheory(level: CourseLevel, lessonIndex: number, language: Language) {
  const theory = level === 'A1' ? a1Ru[lessonIndex] ?? defaults.A1 : level === 'B2' ? b2TheoryRu[lessonIndex] ?? defaults.B2 : defaults[level];
  if (language === 'RU') return theory;
  if (level === 'A1') return a1TheoryKz[lessonIndex] ?? a1TheoryKz[0];
  if (level === 'B2') return b2TheoryKz[lessonIndex] ?? defaultTheoryKz.B2;
  return defaultTheoryKz[level];
}
