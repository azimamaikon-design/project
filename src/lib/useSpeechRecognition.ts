import { useRef, useState } from 'react';

type RecognitionEvent = Event & { results: { [index: number]: { [index: number]: { transcript: string } } } };
type Recognition = { lang:string; interimResults:boolean; continuous:boolean; start:()=>void; stop:()=>void; onstart:(()=>void)|null; onend:(()=>void)|null; onerror:(()=>void)|null; onresult:((event:RecognitionEvent)=>void)|null };
type RecognitionConstructor = new () => Recognition;
type SpeechWindow = Window & typeof globalThis & { SpeechRecognition?:RecognitionConstructor; webkitSpeechRecognition?:RecognitionConstructor };

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(false);
  const recognition = useRef<Recognition>();
  const speechWindow = window as SpeechWindow;
  const RecognitionClass = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

  const start = () => {
    if (!RecognitionClass) return;
    setError(false); setTranscript('');
    const current = new RecognitionClass();
    current.lang = 'en-US'; current.interimResults = false; current.continuous = false;
    current.onstart = () => setIsListening(true);
    current.onresult = (event) => setTranscript(event.results[0][0].transcript);
    current.onerror = () => { setError(true); setIsListening(false); };
    current.onend = () => setIsListening(false);
    recognition.current = current; current.start();
  };

  const stop = () => recognition.current?.stop();
  return { isSupported:Boolean(RecognitionClass), isListening, transcript, error, start, stop, setTranscript };
}
