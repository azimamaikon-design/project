import type { CourseLevel } from './courseData';
import type { Language } from './language';

export type WritingTask = { type:string; prompt:string; points:string[]; minWords:number; maxWords:number };
type TaskSource = { type:[string,string]; prompt:[string,string]; points:[string,string][] };

const limits: Record<CourseLevel, [number,number]> = { A1:[40,60], A2:[70,100], B1:[120,160], B2:[180,220] };
const tasks: Record<CourseLevel, TaskSource[]> = {
  A1:[
    {type:['Profile','Профиль'],prompt:['Write a short profile for your English club.','Ағылшын клубына қысқа профиль жаз.'],points:[['name and age','атың мен жасың'],['country or city','елің немесе қалаң'],['one thing you like','ұнататын бір ісің']]},
    {type:['Family message','Отбасы туралы хабарлама'],prompt:['Write a message about your family or close friends.','Отбасың немесе жақын достарың туралы хабарлама жаз.'],points:[['who they are','олар кім'],['what they have got','оларда не бар'],['what you do together','бірге не істейсіңдер']]},
    {type:['My routine','Менің күн тәртібім'],prompt:['Describe a normal school day.','Қалыпты оқу күніңді сипатта.'],points:[['morning routine','таңғы тәртіп'],['school timetable','сабақ кестесі'],['evening activity','кешкі іс']]},
    {type:['Place description','Орын сипаттамасы'],prompt:['Describe your room, home or neighbourhood.','Бөлмеңді, үйіңді немесе ауданыңды сипатта.'],points:[['what is there','онда не бар'],['where things are','заттар қайда'],['your favourite place','сүйікті орның']]},
    {type:['Shopping note','Сауда жазбасы'],prompt:['Write what you need for a small meal and what it costs.','Шағын асқа не керек және бағасы қанша екенін жаз.'],points:[['food and drinks','тамақ пен сусын'],['amounts','мөлшері'],['total price','жалпы баға']]},
    {type:['Live update','Қазіргі сәт'],prompt:['Tell a friend what people are doing now.','Досыңа адамдардың қазір не істеп жатқанын жаз.'],points:[['where you are','қайдасың'],['three actions now','қазіргі үш әрекет'],['how you feel','өзіңді қалай сезінесің']]},
    {type:['Past story','Өткен оқиға'],prompt:['Write a short story about yesterday or last weekend.','Кеше немесе өткен демалыс туралы қысқа әңгіме жаз.'],points:[['where you went','қайда бардың'],['what happened','не болды'],['how it ended','қалай аяқталды']]},
  ],
  A2:[
    {type:['Description email','Сипаттама хаты'],prompt:['Write an email describing a person you admire.','Өзің сыйлайтын адамды сипаттайтын хат жаз.'],points:[['appearance and personality','келбеті мен мінезі'],['why the person matters','неге маңызды'],['correct article use','артикльдерді дұрыс қолдану']]},
    {type:['Routine comparison','Күн тәртібін салыстыру'],prompt:['Compare your usual routine with this week.','Қалыпты тәртібіңді осы аптамен салыстыр.'],points:[['usual habits','әдеттегі істер'],['temporary changes','уақытша өзгерістер'],['reason for the change','өзгеріс себебі']]},
    {type:['Narrative','Әңгіме'],prompt:['Write a story in which one action interrupts another.','Бір әрекетті екінші әрекет бөлетін әңгіме жаз.'],points:[['background action','фондық әрекет'],['main event','негізгі оқиға'],['clear ending','анық аяқталу']]},
    {type:['Experience post','Тәжірибе туралы жазба'],prompt:['Write about an experience you have had and say when it happened.','Өз тәжірибең және оның қашан болғаны туралы жаз.'],points:[['Present Perfect for experience','тәжірибеге Present Perfect'],['Past Simple for details','бөлшектерге Past Simple'],['what you learned','не үйрендің']]},
    {type:['Plan email','Жоспар хаты'],prompt:['Invite a friend to a future activity and explain the plan.','Досыңды болашақ іс-шараға шақырып, жоспарды түсіндір.'],points:[['arrangement','келісілген жоспар'],['prediction','болжам'],['alternative plan','балама жоспар']]},
    {type:['Advice message','Кеңес хабары'],prompt:['Give advice to a visitor and explain local rules.','Қонаққа кеңес беріп, жергілікті ережелерді түсіндір.'],points:[['two modal verbs','екі модаль етістік'],['one real condition','бір нақты шарт'],['reason for each rule','әр ереженің себебі']]},
    {type:['Connected article','Байланысты мақала'],prompt:['Write a short article with a clear beginning, middle and ending.','Кіріспесі, ортасы және соңы анық қысқа мақала жаз.'],points:[['main idea','негізгі ой'],['linking words','байланыстырушы сөздер'],['final conclusion','соңғы қорытынды']]},
  ],
  B1:[
    {type:['Narrative story','Оқиғалы әңгіме'],prompt:['Write a story where earlier events explain a later problem.','Ертерек оқиғалар кейінгі мәселені түсіндіретін әңгіме жаз.'],points:[['narrative tenses','оқиғалы шақтар'],['clear sequence','анық реттілік'],['effective ending','әсерлі аяқталу']]},
    {type:['Reflective post','Рефлексиялық жазба'],prompt:['Describe a project you have completed or have been working on.','Аяқтаған немесе әлі істеп жүрген жоба туралы жаз.'],points:[['results','нәтижелер'],['duration and process','ұзақтық пен үдеріс'],['personal reflection','жеке қорытынды']]},
    {type:['Process report','Үдеріс есебі'],prompt:['Explain how a product, event or service is organised.','Өнім, іс-шара немесе қызмет қалай ұйымдастырылатынын түсіндір.'],points:[['passive structures','ырықсыз етіс'],['ordered stages','реттелген кезеңдер'],['one improvement','бір жақсарту']]},
    {type:['Interview report','Сұхбат есебі'],prompt:['Report an interview without copying the speaker’s exact words.','Сұхбатты сөйлеушінің сөзін дәл көшірмей баянда.'],points:[['reported statements','жанама хабарлы сөйлемдер'],['reported question','жанама сұрақ'],['accurate meaning','мағынаның дәлдігі']]},
    {type:['Recommendation','Ұсыныс'],prompt:['Recommend a person, place or book using detailed relative clauses.','Адамды, орынды немесе кітапты анықтауыш сөйлемдермен ұсын.'],points:[['defining detail','анықтаушы бөлшек'],['extra information','қосымша ақпарат'],['reason to recommend','ұсыну себебі']]},
    {type:['Hypothetical response','Болжамды жауап'],prompt:['Discuss a decision you would change and its possible consequences.','Өзгерткің келетін шешім мен ықтимал салдарын талқыла.'],points:[['Second Conditional','Second Conditional'],['Third Conditional','Third Conditional'],['realistic reflection','шынайы рефлексия']]},
    {type:['Opinion essay','Пікір эссесі'],prompt:['Should schools replace some tests with projects? Give your opinion.','Мектептер кей тесттерді жобалармен алмастыруы керек пе? Пікіріңді жаз.'],points:[['clear position','анық ұстаным'],['two supported reasons','екі дәлелді себеп'],['conclusion','қорытынды']]},
  ],
  B2:[
    {type:['Future proposal','Болашақ ұсынысы'],prompt:['Propose a long-term change for your school or city and predict its results.','Мектепке немесе қалаға ұзақ мерзімді өзгеріс ұсынып, нәтижесін болжа.'],points:[['future perfect forms','future perfect формалары'],['risks and benefits','қауіптер мен артықшылықтар'],['measurable outcome','өлшенетін нәтиже']]},
    {type:['Formal report','Ресми есеп'],prompt:['Report a service problem and recommend how it should be resolved.','Қызмет мәселесі туралы есеп беріп, оны шешу жолын ұсын.'],points:[['passive and causative','passive және causative'],['formal register','ресми стиль'],['specific recommendation','нақты ұсыныс']]},
    {type:['Balanced summary','Теңгерімді түйін'],prompt:['Summarise two opposing views without changing their meaning.','Екі қарама-қарсы пікірді мағынасын өзгертпей түйінде.'],points:[['reporting verbs','reporting verbs'],['neutral tone','бейтарап үн'],['accurate contrast','дәл қарама-қарсылық']]},
    {type:['Conditional essay','Шартты эссе'],prompt:['How might society be different if one modern technology had never existed?','Бір заманауи технология болмағанда қоғам қалай өзгерер еді?'],points:[['mixed conditionals','mixed conditionals'],['logical consequences','логикалық салдарлар'],['counterargument','қарсы дәлел']]},
    {type:['Evidence analysis','Дәлелді талдау'],prompt:['Analyse possible explanations for an unexpected event without claiming certainty.','Күтпеген оқиғаның ықтимал себептерін толық сенімділік білдірмей талда.'],points:[['past modals','past modals'],['degrees of certainty','сенімділік дәрежелері'],['evidence-based conclusion','дәлелді қорытынды']]},
    {type:['Magazine article','Журнал мақаласы'],prompt:['Write an article about a habit worth starting or stopping.','Бастауға немесе тоқтатуға тұрарлық әдет туралы мақала жаз.'],points:[['gerunds and infinitives','gerund және infinitive'],['natural collocations','табиғи сөз тіркестері'],['engaging style','қызықты стиль']]},
    {type:['Argumentative essay','Аргументативті эссе'],prompt:['Does technology make communication deeper or more superficial?','Технология қарым-қатынасты тереңдете ме, әлде үстірт ете ме?'],points:[['clear thesis','анық тезис'],['cohesive paragraphs','байланысты абзацтар'],['counterargument and response','қарсы дәлел және жауап']]},
  ],
};

export function getWritingTask(level:CourseLevel, lessonIndex:number, language:Language): WritingTask {
  const source = tasks[level][lessonIndex];
  const side = language === 'RU' ? 0 : 1;
  const [minWords,maxWords] = limits[level];
  return { type:source.type[side], prompt:source.prompt[side], points:source.points.map((item) => item[side]), minWords, maxWords };
}
