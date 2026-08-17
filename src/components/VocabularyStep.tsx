import { useState } from 'react';
import type { Language } from '../lib/language';
import type { VocabularyWord } from '../lib/vocabularyData';
import { VoiceControls } from './VoiceControls';

type Props = { words:VocabularyWord[]; language:Language; onContinue:(learned:number)=>void };

export function VocabularyStep({ words, language, onContinue }: Props) {
  const [learned, setLearned] = useState<string[]>([]);
  const isRu = language === 'RU';
  const markListened = (word:string) => setLearned((items) => items.includes(word) ? items : [...items, word]);

  return (
    <section className="vocabulary-step">
      <div className="vocabulary-heading"><div><span className="eyebrow">VOCABULARY</span><h2>{isRu ? 'Слова этого юнита' : 'Осы юниттің сөздері'}</h2><p>{isRu ? 'Прослушай слово полностью — счётчик обновится автоматически.' : 'Сөзді толық тыңда — есептегіш автоматты түрде жаңарады.'}</p></div><strong>{learned.length}/{words.length}</strong></div>
      <div className="vocabulary-grid">
        {words.map((item) => <article className={learned.includes(item.word) ? 'word-card word-card--learned' : 'word-card'} key={item.word}>
          <div><h3>{item.word}</h3><p>{language === 'RU' ? item.ru : item.kz}</p></div>
          <VoiceControls language={language} text={item.word} onFinished={() => markListened(item.word)} />
          <p className="word-card__status">{learned.includes(item.word) ? `✓ ${isRu ? 'Прослушано' : 'Тыңдалды'}` : (isRu ? 'Ещё не прослушано' : 'Әлі тыңдалмады')}</p>
        </article>)}
      </div>
      <button className="primary-button vocabulary-next" onClick={() => onContinue(learned.length)} type="button">{isRu ? 'Перейти к объяснению' : 'Түсіндіруге өту'} →</button>
    </section>
  );
}
