import type { CourseLevel } from './courseData';
import type { Language } from './language';

export type ListeningQuestion = { prompt: string; options: string[]; correct: string };
export type ListeningActivity = { title: string; audio: string; questions: ListeningQuestion[] };
export type SpeakingActivity = { title: string; situation: string; firstMessage: string; prompts: string[] };

const listening: Record<CourseLevel, ListeningActivity[]> = {
  A1: [
    { title:'At the café', audio:'Hello. Can I have a cheese sandwich and a glass of orange juice, please? The sandwich is four pounds and the juice is two pounds. I will sit by the window.', questions:[{prompt:'What does the speaker order?',options:['Soup and tea','A sandwich and juice','Cake and coffee','Salad and water'],correct:'A sandwich and juice'},{prompt:'How much is the juice?',options:['One pound','Two pounds','Four pounds','Six pounds'],correct:'Two pounds'},{prompt:'Where will the speaker sit?',options:['By the door','Outside','By the window','At home'],correct:'By the window'}]},
    { title:'My morning', audio:'Anna gets up at seven o’clock. She eats eggs for breakfast and walks to school with her brother. Her first lesson starts at eight thirty.', questions:[{prompt:'When does Anna get up?',options:['At six','At seven','At eight','At eight thirty'],correct:'At seven'},{prompt:'What does she eat?',options:['Eggs','Bread','Fruit','Cereal'],correct:'Eggs'},{prompt:'Who walks with Anna?',options:['Her friend','Her mother','Her brother','Her teacher'],correct:'Her brother'}]},
    { title:'Weekend plans', audio:'On Saturday, Ben is going to visit his grandmother. They will cook lunch together. On Sunday, he wants to play football in the park if the weather is sunny.', questions:[{prompt:'Who will Ben visit?',options:['His friend','His grandmother','His teacher','His cousin'],correct:'His grandmother'},{prompt:'What will they do together?',options:['Watch a film','Play football','Cook lunch','Go shopping'],correct:'Cook lunch'},{prompt:'When does Ben want to play football?',options:['Friday','Saturday','Sunday','Monday'],correct:'Sunday'}]},
  ],
  A2: [
    { title:'A delayed train', audio:'The nine fifteen train to Bristol has been delayed by twenty minutes because of heavy rain. Passengers should wait on platform four. The café near platform two is still open.', questions:[{prompt:'Why is the train delayed?',options:['A technical problem','Heavy rain','A late driver','Strong wind'],correct:'Heavy rain'},{prompt:'Where should passengers wait?',options:['Platform two','Platform three','Platform four','The café'],correct:'Platform four'},{prompt:'How long is the delay?',options:['Ten minutes','Fifteen minutes','Twenty minutes','Forty minutes'],correct:'Twenty minutes'}]},
    { title:'A new hobby', audio:'Maya started painting three months ago. She has already finished six pictures, but she has never shown them in public. Next month, she is going to join a local art club.', questions:[{prompt:'When did Maya start painting?',options:['Last week','Three months ago','Last year','Yesterday'],correct:'Three months ago'},{prompt:'How many pictures has she finished?',options:['Three','Four','Six','Ten'],correct:'Six'},{prompt:'What is she going to do?',options:['Sell a picture','Visit a museum','Join an art club','Stop painting'],correct:'Join an art club'}]},
    { title:'Weather advice', audio:'Tomorrow will be warm in the morning, but a storm may arrive after three. If you go hiking, take a waterproof jacket and return before the evening.', questions:[{prompt:'When may the storm arrive?',options:['Before noon','After three','At midnight','Next week'],correct:'After three'},{prompt:'What should hikers take?',options:['A map','A hat','A waterproof jacket','Extra shoes'],correct:'A waterproof jacket'},{prompt:'When should they return?',options:['Before evening','After midnight','At noon','On Monday'],correct:'Before evening'}]},
  ],
  B1: [
    { title:'A missed opportunity', audio:'Leo had planned to apply for a summer course, but he missed the deadline because he had written the date incorrectly. If he had checked the website, he would have applied on time. He is now looking for a different programme.', questions:[{prompt:'Why did Leo miss the deadline?',options:['He forgot the course','He wrote the wrong date','The site was closed','He changed his mind'],correct:'He wrote the wrong date'},{prompt:'What should he have checked?',options:['His email','The calendar','The website','The price'],correct:'The website'},{prompt:'What is he doing now?',options:['Waiting for a reply','Looking for another programme','Taking the course','Planning a holiday'],correct:'Looking for another programme'}]},
    { title:'Working from home', audio:'Nina has been working from home for two years. Although she enjoys the flexibility, she sometimes misses talking to colleagues. This time next month, she will be working from a shared office twice a week.', questions:[{prompt:'How long has Nina worked from home?',options:['Two months','One year','Two years','Five years'],correct:'Two years'},{prompt:'What does she miss?',options:['Travelling','Her old desk','Talking to colleagues','Working alone'],correct:'Talking to colleagues'},{prompt:'What will change next month?',options:['She will stop working','She will use a shared office','She will move abroad','She will change jobs'],correct:'She will use a shared office'}]},
    { title:'Community garden', audio:'Residents have transformed an empty car park into a community garden. By the end of the year, they will have planted fifty trees. The project would not exist now if local students had not raised the first thousand pounds.', questions:[{prompt:'What was there before the garden?',options:['A school','A playground','A car park','A forest'],correct:'A car park'},{prompt:'How many trees will they have planted?',options:['Fifteen','Fifty','One hundred','One thousand'],correct:'Fifty'},{prompt:'Who raised the first money?',options:['Local students','The council','A company','Tourists'],correct:'Local students'}]},
  ],
  B2: [
    { title:'The four-day week', audio:'A technology company has reported higher productivity after introducing a four-day working week. Employees said they felt less exhausted, whereas managers noticed that meetings became shorter. Critics argue that the model may not be suitable for industries that require continuous service.', questions:[{prompt:'What increased after the change?',options:['Salaries','Productivity','Working hours','Staff turnover'],correct:'Productivity'},{prompt:'What happened to meetings?',options:['They became longer','They disappeared','They became shorter','They moved online'],correct:'They became shorter'},{prompt:'What concern do critics raise?',options:['It costs too little','It may not suit every industry','Workers dislike it','Technology is unreliable'],correct:'It may not suit every industry'}]},
    { title:'Rebuilding a city square', audio:'The city square, which had been neglected for decades, is being redesigned by local architects. Had residents not opposed the original proposal, most of the old trees would have been removed. The revised plan is expected to preserve them while creating more public space.', questions:[{prompt:'Who is redesigning the square?',options:['Foreign investors','Local architects','University students','Residents alone'],correct:'Local architects'},{prompt:'What did residents oppose?',options:['The revised plan','New public space','The original proposal','Local architects'],correct:'The original proposal'},{prompt:'What will the new plan preserve?',options:['A car park','Old trees','Private offices','A market'],correct:'Old trees'}]},
    { title:'Artificial intelligence in education', audio:'While artificial intelligence can provide immediate feedback, educators warn that it should support rather than replace teachers. Students who rely on it without questioning its answers may fail to develop independent judgement. Used responsibly, however, it can make practice more accessible.', questions:[{prompt:'What can AI provide immediately?',options:['A certificate','Feedback','A teacher','Perfect answers'],correct:'Feedback'},{prompt:'What risk is mentioned?',options:['Less access','Higher prices','Loss of independent judgement','Longer lessons'],correct:'Loss of independent judgement'},{prompt:'What is the speaker’s overall view?',options:['Completely negative','Completely positive','Balanced and cautious','Uninterested'],correct:'Balanced and cautious'}]},
  ],
};

const listeningExtras: Record<CourseLevel, ListeningQuestion[][]> = {
  A1:[
    [{prompt:'How much does the whole order cost?',options:['Two pounds','Four pounds','Six pounds','Eight pounds'],correct:'Six pounds'},{prompt:'Which item costs four pounds?',options:['The juice','The sandwich','The table','The window'],correct:'The sandwich'}],
    [{prompt:'How does Anna travel to school?',options:['She walks','She takes a bus','She cycles','She drives'],correct:'She walks'},{prompt:'When does her first lesson begin?',options:['At seven','At eight','At eight thirty','At nine'],correct:'At eight thirty'}],
    [{prompt:'What will Ben do on Saturday?',options:['Play football','Visit his grandmother','Go to school','Watch a film'],correct:'Visit his grandmother'},{prompt:'What weather does Ben need for football?',options:['Rainy','Snowy','Sunny','Windy'],correct:'Sunny'}],
  ],
  A2:[
    [{prompt:'What time was the train originally due?',options:['Eight fifteen','Nine fifteen','Nine thirty-five','Ten fifteen'],correct:'Nine fifteen'},{prompt:'Where is the open café?',options:['Near platform two','On platform four','Outside the station','On the train'],correct:'Near platform two'}],
    [{prompt:'Has Maya shown her work publicly?',options:['Yes, six times','Yes, last month','No, never','The speaker does not say'],correct:'No, never'},{prompt:'How long has she painted?',options:['Three weeks','Three months','Six months','One year'],correct:'Three months'}],
    [{prompt:'What will the morning weather be like?',options:['Cold','Warm','Stormy','Snowy'],correct:'Warm'},{prompt:'Why should hikers return early?',options:['A storm may arrive','The path will close','It gets very cold at noon','They have no food'],correct:'A storm may arrive'}],
  ],
  B1:[
    [{prompt:'What had Leo planned to do?',options:['Apply for a summer course','Design a website','Travel without studying','Change the deadline'],correct:'Apply for a summer course'},{prompt:'What does the conditional sentence suggest?',options:['The website had the correct date','The course was cancelled','Leo applied successfully','The deadline was extended'],correct:'The website had the correct date'}],
    [{prompt:'What advantage of remote work does Nina mention?',options:['Higher pay','Flexibility','Shorter projects','More colleagues'],correct:'Flexibility'},{prompt:'How often will she use the shared office?',options:['Once a month','Once a week','Twice a week','Every day'],correct:'Twice a week'}],
    [{prompt:'What did residents transform?',options:['An empty car park','A school field','A private garden','A shopping centre'],correct:'An empty car park'},{prompt:'Why was student fundraising important?',options:['It made the project possible','It paid for fifty cars','It closed the garden','It replaced the residents'],correct:'It made the project possible'}],
  ],
  B2:[
    [{prompt:'How did employees feel after the change?',options:['Less exhausted','More isolated','Less productive','More confused'],correct:'Less exhausted'},{prompt:'Which limitation makes the model less universal?',options:['Some services must operate continuously','Meetings cannot be shortened','Technology firms reject it','Employees prefer longer weeks'],correct:'Some services must operate continuously'}],
    [{prompt:'What would have happened without residents’ opposition?',options:['Old trees would have been removed','The square would have closed','Architects would have resigned','More trees would have been planted'],correct:'Old trees would have been removed'},{prompt:'How does the revised plan balance the aims?',options:['It preserves trees and adds public space','It removes trees but saves money','It cancels all construction','It creates private offices only'],correct:'It preserves trees and adds public space'}],
    [{prompt:'What role should AI have according to educators?',options:['It should support teachers','It should replace teachers','It should grade every decision','It should prevent independent work'],correct:'It should support teachers'},{prompt:'What does “however” signal in the final sentence?',options:['A contrast and qualification','A repeated warning','A chronological step','A definition'],correct:'A contrast and qualification'}],
  ],
};

const speaking: Record<CourseLevel, SpeakingActivity[]> = {
  A1:[{title:'Meet Echo',situation:'Introduce yourself. Say your name, age and where you live.',firstMessage:'Hello! My name is Echo. What is your name?',prompts:['My name is…','I am … years old.','I live in…']},{title:'My free time',situation:'Tell Echo what you like doing after school.',firstMessage:'What do you like doing in your free time?',prompts:['I like…','I can…','I usually…']}],
  A2:[{title:'A recent trip',situation:'Tell Echo about a place you visited.',firstMessage:'Have you travelled anywhere interesting recently?',prompts:['I went to…','I saw…','I have never…']},{title:'Make a plan',situation:'Plan a weekend activity with Echo.',firstMessage:'What are you going to do this weekend?',prompts:['I am going to…','If the weather is good…','We could…']}],
  B1:[{title:'Give advice',situation:'Discuss a study problem and suggest solutions.',firstMessage:'I have been feeling tired while studying. What should I change?',prompts:['You should…','If I were you…','You might…']},{title:'Imagine a change',situation:'Discuss an imaginary change in your life.',firstMessage:'What would you do if you could live in another country?',prompts:['If I could…','I would…','It might…']}],
  B2:[{title:'Discuss technology',situation:'Give a balanced opinion about AI in education.',firstMessage:'Should students be allowed to use AI for homework?',prompts:['On the one hand…','However…','In my view…']},{title:'Debate a social issue',situation:'Respond to an argument and support your position.',firstMessage:'Some people believe cities should ban all private cars. What is your view?',prompts:['Although…','The main advantage…','I would argue…']}],
};

export function getListening(level: CourseLevel, lessonIndex: number) {
  const index = Math.min(lessonIndex - 7, 2);
  const activity = listening[level][index];
  return { ...activity, questions:[...activity.questions, ...listeningExtras[level][index]] };
}
export function getSpeaking(level: CourseLevel, lessonIndex: number, language: Language) {
  const activity = speaking[level][Math.min(lessonIndex - 10, 1)];
  return { ...activity, situation: language === 'RU' ? activity.situation : activity.situation };
}

const topicFirstQuestions: Record<CourseLevel, string[]> = {
  A1: ['Can you introduce yourself?', 'Who is in your family?', 'What do you do every morning?', 'Can you describe your home?', 'What food do you like?', 'What are you doing now?', 'What did you do yesterday?'],
  A2: ['How would you describe your best friend?', 'What do you usually do, and what are you doing differently this week?', 'Tell me about something that happened while you were travelling.', 'What interesting experience have you had?', 'What are your plans for next weekend?', 'What rules should tourists follow?', 'Tell me a short story using first, then and finally.'],
  B1: ['When is it difficult to choose the correct article?', 'What have you achieved recently?', 'What have you been learning for a long time?', 'What would you do if you had a free year?', 'What would you have done differently last year?', 'How would your life be different if you had made another choice?', 'Which future activity will you be doing this time tomorrow?'],
  B2: ['What will you have achieved in five years?', 'Where do you often see the passive voice?', 'Tell me something another person said recently.', 'Under what condition would you change an important decision?', 'What should someone have done in a difficult situation?', 'What activity do you remember enjoying for the first time?', 'What makes an argument sound formal and convincing?'],
};

export function getTopicSpeaking(level: CourseLevel, lessonIndex: number): SpeakingActivity {
  const firstMessage = topicFirstQuestions[level][lessonIndex] ?? topicFirstQuestions[level][0];
  return {
    title: `Topic ${lessonIndex + 1}`,
    situation: `Answer five connected questions about this unit. Echo will build each next question from your previous answer.`,
    firstMessage,
    prompts: level === 'A1' ? ['I am…', 'I like…', 'I usually…'] : level === 'A2' ? ['I think…', 'Last time…', 'Because…'] : level === 'B1' ? ['In my experience…', 'If I…', 'The reason is…'] : ['From my perspective…', 'However…', 'For example…'],
  };
}
