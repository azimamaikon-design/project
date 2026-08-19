import { useEffect, useRef, useState } from 'react';

const maleVoiceNames = ['guy', 'david', 'mark', 'james', 'daniel', 'george', 'alex', 'dmitry', 'daulet'];
const naturalVoiceNames = ['natural', 'neural', 'enhanced', 'premium', 'online'];

function voiceScore(voice: SpeechSynthesisVoice, language: string) {
  const name = voice.name.toLowerCase();
  const isNatural = naturalVoiceNames.some((word) => name.includes(word));
  const isMale = maleVoiceNames.some((word) => name.includes(word));
  return (isNatural ? 4 : 0) + (isMale ? 2 : 0) + (voice.lang === language ? 1 : 0);
}

function chooseVoice(voices: SpeechSynthesisVoice[], language: string) {
  const languageCode = language.slice(0, 2).toLowerCase();
  const matchingVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith(languageCode));
  const exactVoice = [...matchingVoices].sort((first, second) => voiceScore(second, language) - voiceScore(first, language))[0];
  if (exactVoice) return { voice:exactVoice, hasMatchingVoice:true, spokenLanguage:language };
  if (language.startsWith('kk')) {
    const cyrillicVoice = voices
      .filter((voice) => voice.lang.toLowerCase().startsWith('ru'))
      .sort((first, second) => voiceScore(second, 'ru-RU') - voiceScore(first, 'ru-RU'))[0];
    return { voice:cyrillicVoice, hasMatchingVoice:false, spokenLanguage:'ru-RU' };
  }
  return { voice:undefined, hasMatchingVoice:false, spokenLanguage:language };
}

function prepareSpeech(text: string, language: string) {
  const plusWord = language.startsWith('kk') ? ' қосу ' : language.startsWith('ru') ? ' плюс ' : ' plus ';
  return text.replace(/·/g, '. ').replace(/\+/g, plusWord).replace(/→/g, '. ');
}

function splitSpeech(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
  const chunks: string[] = [];
  for (const sentence of sentences) {
    const previous = chunks[chunks.length - 1];
    if (previous && `${previous} ${sentence}`.length <= 180) chunks[chunks.length - 1] = `${previous} ${sentence}`;
    else chunks.push(sentence);
  }
  return chunks;
}

export function useSpeech(language = 'en-US') {
  const [rate, setRate] = useState(0.9);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice>();
  const [spokenLanguage, setSpokenLanguage] = useState(language);
  const [hasMatchingVoice, setHasMatchingVoice] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const speechRun = useRef(0);
  const isSupported = 'speechSynthesis' in window;

  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => {
      const selected = chooseVoice(window.speechSynthesis.getVoices(), language);
      setVoice(selected.voice);
      setHasMatchingVoice(selected.hasMatchingVoice);
      setSpokenLanguage(selected.spokenLanguage);
    };
    loadVoices();
    const retry = window.setTimeout(loadVoices, 800);
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.clearTimeout(retry);
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported, language]);

  const speak = (text: string, onFinished?: () => void) => {
    if (!isSupported) return;
    speechRun.current += 1;
    const currentRun = speechRun.current;
    setSpeechError(false);
    window.speechSynthesis.cancel();
    const chunks = splitSpeech(prepareSpeech(text, language));

    const speakChunk = (index: number) => {
      if (currentRun !== speechRun.current) {
        setIsSpeaking(false);
        return;
      }
      if (index >= chunks.length) {
        setIsSpeaking(false);
        onFinished?.();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = spokenLanguage;
      utterance.rate = rate;
      utterance.pitch = 1;
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => speakChunk(index + 1);
      utterance.onerror = (event) => {
        setIsSpeaking(false);
        if (event.error !== 'canceled' && event.error !== 'interrupted') setSpeechError(true);
      };
      window.speechSynthesis.speak(utterance);
    };

    window.speechSynthesis.resume();
    speakChunk(0);
  };

  return { isSupported, isSpeaking, rate, setRate, speak, voiceName: voice?.name, hasMatchingVoice, speechError };
}
