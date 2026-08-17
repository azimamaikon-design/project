import type { CourseLevel } from './courseData';

export type Exercise = { prompt: string; options: string[]; correct: string };
type RawExercise = [string, string, string, string, string, string];

const q = ([prompt, a, b, c, d, correct]: RawExercise): Exercise => ({ prompt, options: [a, b, c, d], correct });

const banks: Record<CourseLevel, RawExercise[][]> = {
  A1: [
    [['I ___ a student.','am','is','are','be','am'],['She ___ my friend.','am','is','are','have','is'],['___ they at school?','Am','Is','Are','Be','Are']],
    [['He ___ got a sister.','have','has','is','does','has'],['___ you got a pet?','Have','Has','Are','Do','Have'],['We have got ___ new teacher.','a','an','some','any','a']],
    [['She ___ English every day.','study','studies','studying','studied','studies'],['___ he play football?','Do','Does','Is','Has','Does'],['I ___ get up early on Sunday.','does not','am not','do not','not','do not']],
    [['There ___ a book on the desk.','am','is','are','be','is'],['There ___ two parks near my house.','is','are','has','have','are'],['___ there a shop nearby?','Are','Does','Is','Has','Is']],
    [['I have ___ apples.','any','some','a','much','some'],['Have you got ___ water?','some','any','an','many','any'],['We need a ___ of milk.','bottle','piece','slice','pair','bottle']],
    [['I ___ reading now.','am','is','are','do','am'],['They are ___ outside.','play','plays','playing','played','playing'],['___ she sleeping?','Does','Has','Is','Are','Is']],
    [['We ___ to the park yesterday.','go','goes','went','going','went'],['She did not ___ tennis.','played','plays','play','playing','play'],['___ you see the film?','Do','Did','Were','Have','Did']],
  ],
  A2: [
    [['I saw ___ interesting film yesterday.','a','an','the','—','an'],['___ sun is a star.','A','An','The','—','The'],['She goes to ___ school every day.','a','an','the','—','—']],
    [['He usually ___ at home.','works','is working','worked','work','works'],['Look! It ___.','rains','is raining','rained','has rained','is raining'],['I ___ dinner at the moment.','cook','cooked','am cooking','have cooked','am cooking']],
    [['I ___ when you called.','slept','was sleeping','am sleeping','have slept','was sleeping'],['While she was cooking, he ___.','read','was reading','has read','reads','was reading'],['The lights went out while we ___.','studied','were studying','study','have studied','were studying']],
    [['I ___ this film before.','saw','have seen','see','was seeing','have seen'],['We visited London ___ year.','since','already','last','ever','last'],['She has lived here ___ 2022.','for','since','ago','last','since']],
    [['I think it ___ rain tomorrow.','is','will','does','has','will'],['We ___ visit Almaty this weekend.','are going to','have','were','do','are going to'],['I ___ meeting Sara at six.','am','will be','have','do','am']],
    [['You ___ wear a seat belt.','must','might','could','would','must'],['If it rains, we ___ home.','stay','stayed','will stay','would stay','will stay'],['You ___ bring food; we have enough.','must not','do not have to','should','cannot','do not have to']],
    [['___ it was cold, we went outside.','Because','Although','So','First','Although'],['Choose the best connector: I was tired, ___ I finished my work.','but','because','if','when','but'],['First we ate; ___, we watched a film.','however','then','although','because','then']],
  ],
  B1: [
    [['We stayed at ___ hotel near the station.','a','an','the','—','a'],['___ information you gave me was useful.','A','An','The','—','The'],['She can play ___ piano.','a','an','the','—','the']],
    [['By the time I arrived, they ___.','left','have left','had left','were leaving','had left'],['I ___ my homework, so I can relax.','finished','have finished','had finished','finish','have finished'],['He was tired because he ___ well.','did not sleep','has not slept','had not slept','does not sleep','had not slept']],
    [['She ___ for two hours.','has studied','has been studying','studied','is studying','has been studying'],['How long ___ you been waiting?','did','do','have','are','have'],['It has been ___ all morning.','rain','rained','raining','rains','raining']],
    [['If I ___ more time, I would learn Japanese.','have','had','will have','had had','had'],['What would you do if you ___ rich?','are','were','have been','will be','were'],['If she knew the answer, she ___ us.','tells','will tell','would tell','told','would tell']],
    [['If they had left earlier, they ___ the train.','caught','would catch','would have caught','had caught','would have caught'],['I would not have failed if I ___.','studied','had studied','would study','have studied','had studied'],['If you had called, I ___ you.','helped','would help','would have helped','had helped','would have helped']],
    [['If I had gone to bed earlier, I ___ tired now.','am not','would not be','would not have been','was not','would not be'],['If she were more careful, she ___ that mistake yesterday.','would not make','would not have made','did not make','had not made','would not have made'],['If he had taken the job, he ___ in London now.','lives','would live','would have lived','had lived','would live']],
    [['This time tomorrow, I ___ to Astana.','fly','will fly','will be flying','have flown','will be flying'],['The article, ___ was published yesterday, went viral.','who','which','where','what','which'],['I enjoy ___ news in English.','read','to reading','reading','have read','reading']],
  ],
  B2: [
    [['By next June, she ___ the course.','finishes','will finish','will have finished','has finished','will have finished'],['By noon, they ___ for six hours.','will work','will have been working','have worked','are working','will have been working'],['This is the first time I ___ such a view.','see','saw','have seen','had seen','have seen']],
    [['The new bridge ___ next year.','will complete','will be completed','is completing','has completed','will be completed'],['The documents appear ___.','to lose','to have been lost','losing','lost them','to have been lost'],['The problem ___ before we arrived.','solved','had solved','had been solved','was solving','had been solved']],
    [['She said that she ___ tired.','is','was','has been','will be','was'],['He asked me where I ___.','live','did live','lived','am living','lived'],['The teacher told us ___ late.','not be','not to be','do not be','to not being','not to be']],
    [['You can borrow it ___ you return it tomorrow.','unless','provided that','despite','whereas','provided that'],['___ you hurry, you will miss the train.','If','Unless','As long as','Provided','Unless'],['Had I known, I ___ differently.','acted','would act','would have acted','had acted','would have acted']],
    [['He ___ forgotten the meeting.','must','must have','should','can have','must have'],['You ___ me before making the decision.','should ask','should have asked','must ask','might ask','should have asked'],['They ___ the match; they played terribly.','cannot win','cannot have won','must not win','should win','cannot have won']],
    [['I remember ___ her at the conference.','meet','to meet','meeting','met','meeting'],['He stopped ___ a coffee on his way home.','having','to have','have','had','to have'],['Try ___ the app if it freezes.','restart','to restarting','restarting','restarted','restarting']],
    [['Rarely ___ such a powerful speech.','I have heard','have I heard','I heard','did I have heard','have I heard'],['The woman ___ by the window is my teacher.','sat','sitting','is sitting','sits','sitting'],['___ the rain, the event continued.','Although','Despite','However','Whereas','Despite']],
  ],
};

export function getExercises(level: CourseLevel, lessonIndex: number) {
  const topics = banks[level];
  if (lessonIndex < 7) return topics[lessonIndex].map(q);
  const flattened = topics.flat();
  const start = ((lessonIndex - 7) * 3) % flattened.length;
  return [0, 1, 2].map((offset) => q(flattened[(start + offset) % flattened.length]));
}

export function getLevelTest(level: CourseLevel) {
  const allQuestions = banks[level].flat();
  const selectedIndexes = [0, 3, 6, 9, 12, 15, 18, 2, 11, 20];
  return selectedIndexes.map((index) => q(allQuestions[index % allQuestions.length]));
}
