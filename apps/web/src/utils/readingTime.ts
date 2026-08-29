// reading time from raw markdown body
// strips code/link markup before counting, ceil to at least 1
export function readingTime(text: string, wpm = 225): number {
  if (!text) return 1;
  // remove code blocks / inline code
  let t = text.replace(/`[^`]*`/g, ' ');
  // replace markdown links [text](url) -> text
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // remove headings, emphasis, blockquotes, etc.
  t = t.replace(/[#*_>`~\-]/g, ' ');
  const words = t.trim().split(/\s+/).filter(Boolean).length;
  // also count via word boundaries for accuracy if split inflates
  // fallback to regex count if difference is large
  return Math.max(1, Math.ceil(words / wpm));
}

export function wordsFromMarkdown(text: string): number {
  let t = text.replace(/`[^`]*`/g, ' ');
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  t = t.replace(/[#*_>`~\-]/g, ' ');
  return t.trim().split(/\s+/).filter(Boolean).length;
}
