import type { CourseLevel } from './courseData';

export type VocabularyWord = { word:string; ru:string; kz:string };
const w = (word:string, ru:string, kz:string):VocabularyWord => ({ word, ru, kz });

const vocabulary: Record<CourseLevel, VocabularyWord[][]> = {
  A1: [
    [w('hello','привет','сәлем'),w('name','имя','есім'),w('country','страна','ел'),w('language','язык','тіл'),w('student','ученик','оқушы'),w('teacher','учитель','мұғалім'),w('city','город','қала'),w('speak','говорить','сөйлеу'),w('meet','знакомиться','танысу'),w('welcome','добро пожаловать','қош келдің')],
    [w('family','семья','отбасы'),w('parents','родители','ата-ана'),w('sister','сестра','әпке'),w('brother','брат','аға'),w('friend','друг','дос')],
    [w('morning','утро','таң'),w('breakfast','завтрак','таңғы ас'),w('school','школа','мектеп'),w('usually','обычно','әдетте')],
    [w('house','дом','үй'),w('room','комната','бөлме'),w('street','улица','көше'),w('near','рядом','жақын')],
    [w('food','еда','тамақ'),w('water','вода','су'),w('bread','хлеб','нан'),w('price','цена','баға')],
    [w('hobby','увлечение','әуестік'),w('music','музыка','музыка'),w('weather','погода','ауа райы'),w('today','сегодня','бүгін')],
    [w('yesterday','вчера','кеше'),w('visit','посещать','бару'),w('travel','путешествовать','саяхаттау'),w('story','история','әңгіме'),w('enjoy','наслаждаться','ләззат алу')],
  ],
  A2: [
    [w('friendly','дружелюбный','ақкөңіл'),w('honest','честный','адал'),w('patient','терпеливый','шыдамды'),w('personality','характер','мінез'),w('neighbour','сосед','көрші'),w('polite','вежливый','сыпайы')],
    [w('habit','привычка','әдет'),w('currently','в настоящее время','қазіргі кезде'),w('routine','распорядок','күн тәртібі'),w('improve','улучшать','жақсарту'),w('different','другой','басқа'),w('schedule','расписание','кесте')],
    [w('memory','воспоминание','естелік'),w('suddenly','внезапно','кенеттен'),w('while','пока','кезінде'),w('happen','случаться','болу'),w('journey','поездка','сапар'),w('surprised','удивлённый','таңғалған')],
    [w('experience','опыт','тәжірибе'),w('already','уже','әлдеқашан'),w('yet','ещё','әлі'),w('ever','когда-либо','бір кездері'),w('recently','недавно','жақында'),w('achievement','достижение','жетістік')],
    [w('plan','план','жоспар'),w('prediction','прогноз','болжам'),w('future','будущее','болашақ'),w('probably','вероятно','мүмкін'),w('arrange','договариваться','келісу'),w('decision','решение','шешім')],
    [w('luggage','багаж','жүк'),w('passenger','пассажир','жолаушы'),w('journey','путешествие','сапар'),w('advice','совет','кеңес'),w('necessary','необходимый','қажетті')],
    [w('although','хотя','дегенмен'),w('however','однако','алайда'),w('because','потому что','себебі'),w('finally','наконец','соңында'),w('opinion','мнение','пікір')],
  ],
  B1: [
    [w('context','контекст','мәнмәтін'),w('specific','конкретный','нақты'),w('general','общий','жалпы'),w('purpose','цель','мақсат'),w('exception','исключение','ерекшелік'),w('expression','выражение','тіркес'),w('mention','упоминать','атап өту'),w('reference','ссылка','сілтеме')],
    [w('achievement','достижение','жетістік'),w('deadline','крайний срок','соңғы мерзім'),w('previous','предыдущий','алдыңғы'),w('complete','завершать','аяқтау'),w('result','результат','нәтиже'),w('recent','недавний','жуырдағы'),w('progress','прогресс','ілгерілеу')],
    [w('duration','продолжительность','ұзақтық'),w('continue','продолжать','жалғастыру'),w('effort','усилие','күш'),w('exhausted','измученный','шаршаған'),w('ongoing','продолжающийся','жалғасып жатқан'),w('focus','сосредоточиться','зейін қою'),w('improvement','улучшение','жақсару')],
    [w('imaginary','воображаемый','қиялдағы'),w('unlikely','маловероятный','ықтималдығы аз'),w('choice','выбор','таңдау'),w('opportunity','возможность','мүмкіндік'),w('suppose','предполагать','болжау'),w('instead','вместо','орнына'),w('consequence','последствие','салдар')],
    [w('regret','сожаление','өкініш'),w('mistake','ошибка','қате'),w('prevent','предотвращать','алдын алу'),w('alternative','альтернатива','балама'),w('blame','винить','кінәлау'),w('realise','осознавать','түсіну'),w('outcome','исход','қорытынды')],
    [w('influence','влияние','ықпал'),w('current','нынешний','қазіргі'),w('past','прошлое','өткен'),w('connection','связь','байланыс'),w('otherwise','иначе','әйтпесе'),w('circumstance','обстоятельство','жағдай'),w('impact','воздействие','әсер')],
    [w('article','статья','мақала'),w('headline','заголовок','тақырып'),w('source','источник','дереккөз'),w('evidence','доказательство','дәлел'),w('author','автор','автор'),w('claim','утверждение','тұжырым'),w('reliable','надёжный','сенімді')],
  ],
  B2: [
    [w('accomplish','достигать','орындау'),w('anticipate','ожидать','күту'),w('eventually','в конечном итоге','ақырында'),w('prior','предшествующий','алдыңғы'),w('subsequent','последующий','кейінгі'),w('simultaneously','одновременно','бір уақытта'),w('completion','завершение','аяқталу'),w('long-term','долгосрочный','ұзақ мерзімді'),w('milestone','важный этап','маңызды кезең')],
    [w('manufacture','производить','өндіру'),w('implement','внедрять','енгізу'),w('maintain','поддерживать','қолдау'),w('estimate','оценивать','бағалау'),w('require','требовать','талап ету'),w('procedure','процедура','рәсім'),w('regulation','правило','ереже'),w('distribute','распределять','тарату'),w('approve','одобрять','мақұлдау')],
    [w('statement','заявление','мәлімдеме'),w('announce','объявлять','жариялау'),w('admit','признавать','мойындау'),w('deny','отрицать','жоққа шығару'),w('persuade','убеждать','сендіру'),w('insist','настаивать','талап ету'),w('warn','предупреждать','ескерту'),w('confirm','подтверждать','растау'),w('inquire','спрашивать','сұрау')],
    [w('provided','при условии','шартымен'),w('unless','если не','егер болмаса'),w('otherwise','иначе','әйтпесе'),w('assumption','предположение','болжам'),w('hypothetical','гипотетический','болжалды'),w('requirement','требование','талап'),w('restriction','ограничение','шектеу'),w('exception','исключение','ерекшелік'),w('regardless','независимо','қарамастан')],
    [w('deduction','вывод','қорытынды'),w('certainty','уверенность','сенімділік'),w('possibility','возможность','мүмкіндік'),w('criticism','критика','сын'),w('obligation','обязанность','міндет'),w('speculation','предположение','жорамал'),w('permission','разрешение','рұқсат'),w('expectation','ожидание','күту')],
    [w('avoid','избегать','аулақ болу'),w('consider','рассматривать','қарастыру'),w('recommend','рекомендовать','ұсыну'),w('postpone','откладывать','кейінге қалдыру'),w('admit','признавать','мойындау'),w('refuse','отказываться','бас тарту'),w('manage','справляться','қол жеткізу'),w('attempt','пытаться','әрекеттену')],
    [w('nevertheless','тем не менее','соған қарамастан'),w('whereas','тогда как','ал'),w('despite','несмотря на','қарамастан'),w('emphasis','акцент','екпін'),w('inversion','инверсия','инверсия'),w('perspective','точка зрения','көзқарас'),w('coherent','связный','бірізді'),w('convincing','убедительный','нанымды')],
  ],
};

export function getVocabulary(level: CourseLevel, lessonIndex: number) {
  const targetCount: Record<CourseLevel, number> = { A1:10, A2:20, B1:30, B2:40 };
  const ownWords = vocabulary[level][lessonIndex] ?? [];
  const uniquePool = vocabulary[level].flat().filter((item, index, items) =>
    items.findIndex((candidate) => candidate.word === item.word) === index,
  );
  const rotatedPool = [...uniquePool.slice((lessonIndex * targetCount[level]) % uniquePool.length), ...uniquePool];
  const result = [...ownWords];

  for (const item of rotatedPool) {
    if (!result.some((word) => word.word === item.word)) result.push(item);
    if (result.length === targetCount[level]) break;
  }

  return result;
}

export function getVocabularyTarget(level: CourseLevel) {
  return ({ A1:10, A2:20, B1:30, B2:40 } satisfies Record<CourseLevel, number>)[level];
}
