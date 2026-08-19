import type { Language } from '../lib/language';
import { useSpeech } from '../lib/useSpeech';

type VoiceControlsProps = { language: Language; text: string; speechLanguage?: string; onFinished?:() => void };
const rates = [0.7, 0.9, 1];

export function VoiceControls({ language, text, speechLanguage = 'en-US', onFinished }: VoiceControlsProps) {
  const { isSupported, isSpeaking, rate, setRate, speak, voiceName, hasMatchingVoice, speechError } = useSpeech(speechLanguage);
  const isRu = language === 'RU';
  const voiceLabel = speechLanguage.startsWith('kk')
    ? 'Қазақша дауыс'
    : speechLanguage.startsWith('ru') ? (isRu ? 'Русский голос' : 'Орысша дауыс') : (isRu ? 'Английский голос' : 'Ағылшынша дауыс');

  if (!isSupported) {
    return <p className="voice-unavailable">{isRu ? 'Озвучка не поддерживается этим браузером.' : 'Бұл браузер дыбыстауды қолдамайды.'}</p>;
  }

  return (
    <div className="voice-controls">
      <button className={isSpeaking ? 'speak-button speak-button--active' : 'speak-button'} onClick={() => speak(text, onFinished)} type="button">
        <span aria-hidden="true">{isSpeaking ? '◼' : '▶'}</span>
        {isSpeaking ? (isRu ? 'Echo говорит…' : 'Echo сөйлеп жатыр…') : (isRu ? 'Слушать Echo' : 'Echo-ны тыңдау')}
      </button>
      <div className="speed-control" aria-label={isRu ? 'Скорость голоса' : 'Дауыс жылдамдығы'}>
        {rates.map((value) => <button className={rate === value ? 'speed speed--active' : 'speed'} onClick={() => setRate(value)} type="button" key={value}>{value}×</button>)}
      </div>
      {voiceName && <span className="voice-name" title={voiceName}>{voiceLabel}</span>}
      {speechLanguage.startsWith('kk') && !hasMatchingVoice && <p className="voice-notice">Құрылғыда қазақ дауысы жоқ. Echo қазақша мәтінді кирилл даусымен оқиды; анық айтылым үшін Microsoft Edge қолдан.</p>}
      {speechError && <p className="voice-notice voice-notice--error">{isRu ? 'Не удалось запустить голос. Попробуй Edge.' : 'Дауыс қосылмады. Edge браузерінде байқап көр.'}</p>}
    </div>
  );
}
