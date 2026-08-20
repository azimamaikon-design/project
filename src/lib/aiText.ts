export function cleanAiText(value:string) {
  return value
    .replace(/\r/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1')
    .replace(/_([^_\n]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)]\([^\s)]+\)/g, '$1')
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    .trim();
}

export type AiTextBlock =
  | { type:'paragraph'; text:string }
  | { type:'list'; items:string[] };

export function parseAiText(value:string): AiTextBlock[] {
  const lines = cleanAiText(value).split('\n');
  const blocks: AiTextBlock[] = [];
  let paragraph:string[] = [];
  let list:string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type:'paragraph', text:paragraph.join(' ') });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type:'list', items:list });
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const listItem = line.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
    } else if (!line) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}
