export function truncateTitle(text, maxCodePoints) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a primitive string');
  }

  if (!Number.isSafeInteger(maxCodePoints) || maxCodePoints <= 0) {
    throw new TypeError('maxCodePoints must be a positive safe integer');
  }

  const normalized = text.normalize('NFC').trim();
  const codePoints = Array.from(normalized);

  if (codePoints.length <= maxCodePoints) {
    return normalized;
  }

  return `${codePoints.slice(0, maxCodePoints - 1).join('')}\u2026`;
}
