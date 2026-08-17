import { EchoAssistant } from '../components/EchoAssistant';
import { SiteHeader } from '../components/SiteHeader';
import { useLanguage } from '../lib/language';

export function AssistantPage() {
  const { language, toggleLanguage } = useLanguage();
  const isRu = language === 'RU';
  return <div className="page-shell"><SiteHeader language={language} onLanguageChange={toggleLanguage} /><main className="assistant-page"><span className="eyebrow">ECHO AI</span><h1>{isRu ? 'Личный помощник по английскому' : 'Ағылшын тілі бойынша жеке көмекші'}</h1><p>{isRu ? 'Echo объясняет темы, исправляет ошибки и создаёт практику под твой уровень.' : 'Echo тақырыптарды түсіндіреді, қателерді түзетеді және деңгейіңе сай тапсырма құрады.'}</p><EchoAssistant language={language} /></main></div>;
}
