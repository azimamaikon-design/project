import type { Language } from './language';

export type ReadingQuestion = { prompt:string; options:string[]; correct:string };
export type ReadingText = { title:string; text:string; questions:ReadingQuestion[] };

const texts: Record<Language, ReadingText[]> = {
  RU: [
    { title:'A new student', text:'Hello! My name is Mia. I am fourteen years old, and I am a new student at Green Hill School. I am from Canada, but my family is in London now. My favourite subject is English. Mr Brown is my English teacher. He is friendly and patient. There are twenty students in my class. My new friends are Sara and Leo. Sara is from Spain, and Leo is from Italy. We are happy to learn together.', questions:[
      {prompt:'How old is Mia?',options:['Twelve','Thirteen','Fourteen','Fifteen'],correct:'Fourteen'},
      {prompt:'Where is Mia from?',options:['Canada','England','Spain','Italy'],correct:'Canada'},
      {prompt:'What is her favourite subject?',options:['Maths','English','History','Art'],correct:'English'},
      {prompt:'Who is Mr Brown?',options:['Her father','Her friend','Her teacher','Her brother'],correct:'Her teacher'},
      {prompt:'Which statement is true?',options:['Mia is in Canada now.','Leo is from Spain.','There are twenty students.','Mr Brown is strict.'],correct:'There are twenty students.'},
    ]},
    { title:'An online English club', text:'Hi, everyone! We are the World English Club. Our meetings are online every Wednesday at five o’clock. I am Ayan, the club leader. I am from Kazakhstan. Our members are from many countries. Hana is Japanese, Omar is Egyptian, and Lucas is Brazilian. English is our common language. The meetings are short and fun. First, we introduce ourselves. Then we play a word game. At the end, one student tells a short story. New students are always welcome.', questions:[
      {prompt:'When does the club meet?',options:['Monday at five','Wednesday at five','Wednesday at seven','Friday at five'],correct:'Wednesday at five'},
      {prompt:'Where is Ayan from?',options:['Japan','Egypt','Brazil','Kazakhstan'],correct:'Kazakhstan'},
      {prompt:'Why do members use English?',options:['It is their school subject.','It is their common language.','Ayan is English.','The club is in London.'],correct:'It is their common language.'},
      {prompt:'What happens after introductions?',options:['A story','A lesson','A word game','A test'],correct:'A word game'},
      {prompt:'What is the main idea?',options:['Ayan describes an international club.','Students take a difficult exam.','Lucas visits Kazakhstan.','The club teaches Japanese.'],correct:'Ayan describes an international club.'},
    ]},
  ],
  KZ: [],
};

texts.KZ = texts.RU;
export function getFirstUnitReading(language: Language) { return texts[language]; }
