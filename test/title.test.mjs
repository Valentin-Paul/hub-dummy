import test from 'node:test';
import assert from 'node:assert/strict';

import { truncateTitle } from '../src/title.mjs';

test('returns an empty title for empty and whitespace-only input', () => {
  assert.equal(truncateTitle('', 5), '');
  assert.equal(truncateTitle('  \n\t  ', 5), '');
});

test('returns normalized and trimmed text at the exact limit', () => {
  assert.equal(truncateTitle('  hello  ', 5), 'hello');
});

test('truncates long titles and appends an ellipsis', () => {
  assert.equal(truncateTitle('abcdef', 4), 'abc…');
});

test('counts emoji as Unicode code points instead of UTF-16 units', () => {
  assert.equal(truncateTitle('A😀BC', 3), 'A😀…');
});

test('normalizes combining characters to NFC before counting', () => {
  assert.equal(truncateTitle('e\u0301x', 1), '…');
  assert.equal(truncateTitle('e\u0301x', 2), 'éx');
});

test('returns only an ellipsis when a long title has limit one', () => {
  assert.equal(truncateTitle('ab', 1), '…');
});

test('rejects non-string text values', () => {
  for (const value of [null, 42, {}]) {
    assert.throws(() => truncateTitle(value, 3), TypeError);
  }
});

test('rejects invalid limits', () => {
  for (const value of [0, -1, 1.5, NaN, Infinity, '3', Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => truncateTitle('title', value), TypeError);
  }
});
