import type { CourseLevel } from './courseData';
import type { Exercise } from './exerciseData';

export type AssessmentQuestion = Exercise & { section:'grammar'|'reading'|'listening' };
type Source = { reading:string; audio:string; readingQuestions:Exercise[]; listeningQuestions:Exercise[] };

const make = (prompt:string, options:string[], correct:string): Exercise => ({ prompt, options, correct });
const q = (prompt:string, correct:string, ...wrong:string[]) => make(prompt, [correct, ...wrong], correct);

const sources: Record<CourseLevel, Source> = {
  A1: {
    reading:'Lina lives near her school. Every morning, she walks there with her brother. Her favourite lesson is English because the class plays word games. After school, Lina usually visits her grandmother, but today she is going to the library.',
    audio:'Hello, this is Ben. My birthday picnic is on Saturday at two o’clock in Green Park. Please bring a drink. My mother is making sandwiches, and my sister is bringing a chocolate cake. If it rains, we will meet at my house.',
    readingQuestions:[q('Where does Lina live?','Near her school','Near the library','In Green Park','With her grandmother'),q('How does she go to school?','She walks','By bus','By bike','By car'),q('Why does she like English?','They play word games','It is short','Her brother teaches it','There is no homework'),q('Who does she usually visit?','Her grandmother','Her teacher','Ben','Her sister'),q('Where is she going today?','The library','The park','Her house','The café')],
    listeningQuestions:[q('When is the picnic?','Saturday at two','Sunday at two','Saturday at twelve','Friday at two'),q('Where is the picnic planned?','Green Park','At school','At a café','Near the library'),q('What should guests bring?','A drink','A cake','Sandwiches','A game'),q('Who is making sandwiches?','Ben’s mother','Ben’s sister','Ben','Lina'),q('What will happen if it rains?','They will meet at Ben’s house','The picnic will be on Sunday','They will go to school','They will meet at a café')],
  },
  A2: {
    reading:'Last year, Amir joined a photography club because he wanted to take better pictures. He has already learned how to use light and edit photos. At first, he found portraits difficult, but now they are his favourite. Next month, the club is going to hold an exhibition, and Amir will show three photographs.',
    audio:'Passengers travelling to Lakeside should note that the ten thirty bus has been cancelled because of snow. The next bus will leave at eleven fifteen from stop six, not stop four. Tickets for the cancelled service can also be used on the later bus.',
    readingQuestions:[q('Why did Amir join the club?','To take better pictures','To meet a teacher','To sell his camera','To travel'),q('What has he learned?','How to use light and edit','How to paint portraits','How to repair cameras','How to organise trips'),q('What was difficult at first?','Portraits','Editing','Using light','Exhibitions'),q('What will happen next month?','An exhibition','A competition abroad','A new school course','A camera sale'),q('How many photos will Amir show?','Three','Two','Four','Ten')],
    listeningQuestions:[q('Which service was cancelled?','The ten thirty bus','The eleven fifteen bus','The ten thirty train','The stop six bus'),q('Why was it cancelled?','Snow','Rain','Traffic','A technical problem'),q('When does the next bus leave?','Eleven fifteen','Ten fifteen','Eleven thirty','Twelve fifteen'),q('Which stop should passengers use?','Stop six','Stop four','Stop ten','Stop eleven'),q('Do passengers need a new ticket?','No, the old ticket is valid','Yes, everyone needs one','Only children need one','The announcement does not say')],
  },
  B1: {
    reading:'When our town library was threatened with closure, local residents created a volunteer group. They had collected more than two thousand signatures before the council meeting began. Although the library remained open, its budget was reduced. The group has therefore started organising book sales to pay for weekend activities and hopes to create a free homework club.',
    audio:'Maya has been working remotely since her company changed its policy two years ago. She values the quiet mornings, but she misses informal conversations with colleagues. From next month, she will work in a shared office on Tuesdays and Thursdays. She expects the new routine to improve collaboration without losing too much flexibility.',
    readingQuestions:[q('Why was the group created?','The library might close','The town needed a shop','The council requested it','The library needed books'),q('What had they done before the meeting?','Collected over two thousand signatures','Opened a homework club','Reduced the budget','Sold old furniture'),q('What happened to the library?','It stayed open with less money','It closed at weekends','It became a school','It received a larger budget'),q('Why are they holding book sales?','To fund weekend activities','To pay council members','To build a new library','To buy signatures'),q('What do they hope to create?','A free homework club','A paid language school','A council office','A bookshop')],
    listeningQuestions:[q('How long has Maya worked remotely?','Two years','Two months','One year','Since last month'),q('What does she value?','Quiet mornings','Long meetings','Daily travel','A fixed desk'),q('What does she miss?','Informal conversations','Working alone','Office noise','Flexible hours'),q('When will she use the shared office?','Tuesdays and Thursdays','Mondays and Fridays','Every weekday','Only Thursdays'),q('What balance does she hope for?','Better collaboration with flexibility','More travel with lower pay','Less work with more meetings','A new job with no colleagues')],
  },
  B2: {
    reading:'Supporters of a four-day working week often claim that reducing hours improves both productivity and wellbeing. Yet the evidence is more nuanced. Trials have tended to attract organisations already willing to redesign meetings and workloads, which may partly explain their success. Moreover, hospitals and transport services cannot simply close for an extra day. The model is therefore best viewed not as a universal solution but as an invitation to question how work is organised.',
    audio:'The city originally intended to replace the central market with offices. Following strong opposition, however, planners revised the proposal. The market will now be restored, while two unused buildings nearby will be converted into affordable workspaces. Although some traders remain concerned about disruption during construction, most have welcomed the decision as a reasonable compromise.',
    readingQuestions:[q('What benefit do supporters claim?','Better productivity and wellbeing','Higher prices','Longer meetings','Fewer services'),q('Why might trial results look especially positive?','Participants were already open to redesign','All trials involved hospitals','Employees worked longer','Researchers ignored wellbeing'),q('Which sectors present a challenge?','Hospitals and transport','Publishing and design','Retail and tourism','Schools and museums'),q('What is the author’s attitude?','Cautiously balanced','Entirely supportive','Strongly opposed','Uninterested'),q('What is the main conclusion?','The idea should prompt a review of work organisation','Every company should adopt it immediately','The trials prove nothing','Public services should close one day')],
    listeningQuestions:[q('What was the original plan?','Replace the market with offices','Restore the market','Build affordable homes','Close two offices'),q('Why was the plan changed?','Strong opposition','A lack of traders','Construction had finished','The market moved'),q('What will happen to the market?','It will be restored','It will be demolished','It will become offices','It will move abroad'),q('What concerns some traders?','Disruption during construction','The cost of workspaces','A lack of customers today','The revised design style'),q('How do most traders view the decision?','As a reasonable compromise','As a complete failure','As unnecessary','As too expensive to discuss')],
  },
};

export function getAssessmentSources(level: CourseLevel) { return sources[level]; }
export function combineAssessment(grammar: Exercise[], level: CourseLevel): AssessmentQuestion[] {
  const source = sources[level];
  return [
    ...grammar.map((item) => ({ ...item, section:'grammar' as const })),
    ...source.readingQuestions.map((item) => ({ ...item, section:'reading' as const })),
    ...source.listeningQuestions.map((item) => ({ ...item, section:'listening' as const })),
  ].map((item, index) => {
    const shift = index % item.options.length;
    return { ...item, options:[...item.options.slice(shift), ...item.options.slice(0, shift)] };
  });
}
