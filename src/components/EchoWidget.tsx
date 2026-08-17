import { useState } from 'react';
import { useLocation } from 'wouter';
import { getLessons, type CourseLevel } from '../lib/courseData';
import { useLanguage } from '../lib/language';
import { EchoAssistant } from './EchoAssistant';

function lessonContext(location:string, language:'RU'|'KZ') {
  const match = location.match(/^\/course\/(a1|a2|b1|b2)\/lesson\/(\d+)$/i);
  if (!match) return {};
  const level = match[1].toUpperCase() as CourseLevel;
  const lesson = getLessons(level, language)[Number(match[2]) - 1];
  return { initialLevel:level, topic:lesson?.title };
}

export function EchoWidget() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { language } = useLanguage();
  const isRu = language === 'RU';
  if (location === '/assistant') return null;
  const context = lessonContext(location, language);

  return <>
    {open && <button className="echo-widget__backdrop" aria-label={isRu ? 'Закрыть Echo' : 'Echo-ны жабу'} onClick={() => setOpen(false)} type="button" />}
    <aside className={open ? 'echo-widget echo-widget--open' : 'echo-widget'} aria-hidden={!open}>
      <div className="echo-widget__top"><div><span>E</span><strong>Echo AI</strong></div><button aria-label={isRu ? 'Закрыть' : 'Жабу'} onClick={() => setOpen(false)} type="button">×</button></div>
      {open && <EchoAssistant language={language} initialLevel={context.initialLevel} topic={context.topic} />}
    </aside>
    <button className="echo-widget__button" aria-expanded={open} onClick={() => setOpen((value) => !value)} type="button"><span>E</span><strong>{isRu ? 'Спросить Echo' : 'Echo-дан сұрау'}</strong></button>
  </>;
}
