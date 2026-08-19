import { Link } from 'wouter';
import { CoursePreview } from '../components/CoursePreview';
import { EchoMascot } from '../components/EchoMascot';
import { SiteHeader } from '../components/SiteHeader';
import { useLanguage } from '../lib/language';

export function HomePage() {
  const { language, toggleLanguage } = useLanguage();
  const isRu = language === 'RU';

  return (
    <div className="page-shell">
      <SiteHeader language={language} onLanguageChange={toggleLanguage} />
      <main>
        <section className="hero">
          <div className="hero__copy">
            <span className="eyebrow">{isRu ? 'АНГЛИЙСКИЙ ОТ A1 ДО B2' : 'A1-ДЕН B2-ГЕ ДЕЙІНГІ АҒЫЛШЫН ТІЛІ'}</span>
            <h1>{isRu ? 'Не просто учи.' : 'Жай ғана оқыма.'}<br /><em>{isRu ? 'Начни говорить.' : 'Сөйлей баста.'}</em></h1>
            <p>{isRu ? 'Понятные уроки, настоящая практика и личный помощник Echo с объяснениями на русском языке.' : 'Түсінікті сабақтар, шынайы тәжірибе және Echo жеке көмекшісі.'}</p>
            <div className="hero__actions">
              <Link className="primary-button" href="/course">{isRu ? 'Начать бесплатно' : 'Тегін бастау'} <span>→</span></Link>
              <a className="text-button" href="#path">{isRu ? 'Посмотреть программу' : 'Бағдарламаны көру'}</a>
            </div>
            <div className="hero__facts">
              <span><strong>48</strong> {isRu ? 'уроков' : 'сабақ'}</span><span><strong>4</strong> {isRu ? 'уровня' : 'деңгей'}</span><span><strong>6</strong> {isRu ? 'навыков' : 'дағды'}</span>
            </div>
          </div>
          <EchoMascot language={language} />
        </section>
        <div id="path"><CoursePreview language={language} /></div>
        <section className="feature-strip"><p>Vocabulary</p><span>✦</span><p>Grammar</p><span>✦</span><p>Reading</p><span>✦</span><p>Listening</p><span>✦</span><p>Speaking</p><span>✦</span><p>Writing</p></section>
      </main>
    </div>
  );
}
