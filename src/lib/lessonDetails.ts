import type { CourseLevel } from './courseData';
import type { Language } from './language';

type Details = {
  formulas: { label: string; value: string }[];
  focus: { sentence: string; translation: string; steps: string[]; negative: string; question: string };
};

const ru: Details[] = [
  { formulas: [{ label: 'Утверждение', value: 'подлежащее + am/is/are + остальное' }, { label: 'Отрицание', value: 'подлежащее + am/is/are + not + остальное' }, { label: 'Вопрос', value: 'Am/Is/Are + подлежащее + остальное?' }], focus: { sentence: 'I am a student.', translation: 'Я ученик.', steps: ['I — тот, о ком мы говорим.', 'С I всегда используется форма am.', 'A student сообщает, кем является человек.'], negative: 'I am not a student.', question: 'Am I a student?' } },
  { formulas: [{ label: 'Утверждение', value: 'подлежащее + have/has got + предмет' }, { label: 'Отрицание', value: 'подлежащее + have/has not got + предмет' }, { label: 'Вопрос', value: 'Have/Has + подлежащее + got + предмет?' }], focus: { sentence: 'She has got a brother.', translation: 'У неё есть брат.', steps: ['She означает «она».', 'После she выбираем has, а не have.', 'Got остаётся на месте во всех формах.'], negative: 'She has not got a brother.', question: 'Has she got a brother?' } },
  { formulas: [{ label: 'Утверждение', value: 'I/you/we/they + verb · he/she/it + verb-s' }, { label: 'Отрицание', value: 'подлежащее + do/does not + verb' }, { label: 'Вопрос', value: 'Do/Does + подлежащее + verb?' }], focus: { sentence: 'She plays tennis every Saturday.', translation: 'Она играет в теннис каждую субботу.', steps: ['Every Saturday показывает регулярное действие.', 'She требует окончания -s у глагола.', 'Поэтому play превращается в plays.'], negative: 'She does not play tennis.', question: 'Does she play tennis?' } },
  { formulas: [{ label: 'Один предмет', value: 'There is + a/an + предмет + место' }, { label: 'Несколько', value: 'There are + число + предметы + место' }, { label: 'Вопрос', value: 'Is/Are there + предмет + место?' }], focus: { sentence: 'There is a book on the table.', translation: 'На столе есть книга.', steps: ['Book — один предмет, поэтому выбираем is.', 'A показывает, что речь об одной книге.', 'On the table сообщает её местоположение.'], negative: 'There is not a book on the table.', question: 'Is there a book on the table?' } },
  { formulas: [{ label: 'Утверждение', value: 'подлежащее + verb + some + предмет' }, { label: 'Отрицание', value: 'подлежащее + do not + verb + any + предмет' }, { label: 'Вопрос', value: 'Do + подлежащее + verb + any + предмет?' }], focus: { sentence: 'I have some apples.', translation: 'У меня есть несколько яблок.', steps: ['Это утвердительное предложение, поэтому выбираем some.', 'Apples можно посчитать: one apple, two apples.', 'Точное количество неважно, поэтому используем some.'], negative: 'I do not have any apples.', question: 'Do I have any apples?' } },
  { formulas: [{ label: 'Утверждение', value: 'подлежащее + am/is/are + verb-ing' }, { label: 'Отрицание', value: 'подлежащее + am/is/are + not + verb-ing' }, { label: 'Вопрос', value: 'Am/Is/Are + подлежащее + verb-ing?' }], focus: { sentence: 'I am reading a book now.', translation: 'Я сейчас читаю книгу.', steps: ['Now показывает действие в этот момент.', 'После I выбираем am.', 'К read добавляем -ing и получаем reading.'], negative: 'I am not reading a book now.', question: 'Am I reading a book now?' } },
  { formulas: [{ label: 'Утверждение', value: 'подлежащее + verb-ed / V2' }, { label: 'Отрицание', value: 'подлежащее + did not + verb' }, { label: 'Вопрос', value: 'Did + подлежащее + verb?' }], focus: { sentence: 'I visited my friend yesterday.', translation: 'Я посетил друга вчера.', steps: ['Yesterday указывает на завершённое прошлое.', 'Visit — правильный глагол.', 'Добавляем -ed и получаем visited.'], negative: 'I did not visit my friend.', question: 'Did I visit my friend?' } },
];

const labelKz: Record<string, string> = { 'Утверждение':'Жай сөйлем', 'Отрицание':'Болымсыз сөйлем', 'Вопрос':'Сұрақ', 'Один предмет':'Бір зат', 'Несколько':'Бірнеше зат' };
const translateFormula = (value: string) => value
  .replace(/подлежащее/g, 'бастауыш').replace(/остальное/g, 'қалған бөлік')
  .replace(/предметы/g, 'заттар').replace(/предмет/g, 'зат')
  .replace(/один/g, 'бір').replace(/несколько/g, 'бірнеше')
  .replace(/место/g, 'орын').replace(/Утверждение/g, 'Жай сөйлем')
  .replace(/Отрицание/g, 'Болымсыз сөйлем');

const kz: Details[] = ru.map((item, index) => ({
  formulas: item.formulas.map((formula) => ({ label: labelKz[formula.label] ?? formula.label, value: translateFormula(formula.value) })),
  focus: { ...item.focus, steps: [
    ['I — кім туралы айтып тұрғанымызды көрсетеді.', 'I сөзінен кейін әрқашан am қолданылады.', 'A student адамның кім екенін көрсетеді.'],
    ['She — «ол» деген сөз.', 'She сөзінен кейін have емес, has таңдаймыз.', 'Got барлық формада өз орнында қалады.'],
    ['Every Saturday әрекеттің тұрақты екенін көрсетеді.', 'She етістікке -s жалғауын қажет етеді.', 'Сондықтан play сөзі plays болады.'],
    ['Book — бір зат, сондықтан is таңдаймыз.', 'A бір кітап туралы айтып тұрғанымызды көрсетеді.', 'On the table оның орнын көрсетеді.'],
    ['Бұл жай сөйлем, сондықтан some таңдаймыз.', 'Apples сөзін санауға болады.', 'Нақты саны маңызды емес, сондықтан some қолданамыз.'],
    ['Now әрекеттің дәл қазір болып жатқанын көрсетеді.', 'I сөзінен кейін am таңдаймыз.', 'Read сөзіне -ing қосып, reading аламыз.'],
    ['Yesterday аяқталған өткен шақты көрсетеді.', 'Visit — дұрыс етістік.', 'Оған -ed қосып, visited аламыз.'],
  ][index] },
}));

export function getLessonDetails(level: CourseLevel, lessonIndex: number, language: Language): Details {
  const fallback = ru[0];
  if (level !== 'A1') return language === 'RU' ? fallback : kz[0];
  return (language === 'RU' ? ru : kz)[lessonIndex] ?? (language === 'RU' ? fallback : kz[0]);
}
