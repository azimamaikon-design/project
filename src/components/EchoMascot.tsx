import type { Language } from '../lib/language';

export function EchoMascot({ language }: { language: Language }) {
  return (
    <div className="echo-scene" aria-label="Голосовой помощник Echo">
      <span className="echo-scene__orbit echo-scene__orbit--one" />
      <span className="echo-scene__orbit echo-scene__orbit--two" />
      <div className="echo">
        <span className="echo__shine" />
        <div className="echo__wave" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="echo-message">
        <span>{language === 'RU' ? 'Привет! Я Echo' : 'Сәлем! Мен Echo'}</span>
        <strong>{language === 'RU' ? 'Давай заговорим по-английски' : 'Ағылшынша сөйлей бастайық'}</strong>
      </div>
    </div>
  );
}
