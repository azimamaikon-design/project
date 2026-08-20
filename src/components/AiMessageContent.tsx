import { parseAiText } from '../lib/aiText';

export function AiMessageContent({ text }:{ text:string }) {
  return (
    <div className="ai-message-content">
      {parseAiText(text).map((block, index) => block.type === 'list'
        ? <ul key={`list-${index}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>
        : <p key={`paragraph-${index}`}>{block.text}</p>)}
    </div>
  );
}
