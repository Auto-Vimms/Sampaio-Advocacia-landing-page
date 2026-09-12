import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const indexHtml = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');

function consentLabelBlock(html) {
  const match = html.match(
    /<label[^>]*for="consentimento"[^>]*>([\s\S]*?)<\/label>/i,
  );
  return match ? match[1] : null;
}

describe('Privacy Policy link in the consent checkbox (index.html)', () => {
  it('keeps the consent checkbox with id="consentimento"', () => {
    expect(indexHtml).toMatch(/<input[^>]*id="consentimento"[^>]*>/i);
  });

  it('points the consent link to privacidade.html', () => {
    const block = consentLabelBlock(indexHtml);
    expect(block).not.toBeNull();

    const anchor = block.match(/<a\b[^>]*>/i);
    expect(anchor, 'expected an <a> inside the consent label').not.toBeNull();

    expect(anchor[0]).toMatch(/href="privacidade\.html"/i);
  });

  it('opens the Privacy Policy in a new tab safely', () => {
    const block = consentLabelBlock(indexHtml);
    const anchor = block.match(/<a\b[^>]*>/i)[0];

    expect(anchor).toMatch(/target="_blank"/i);
    expect(anchor).toMatch(/rel="[^"]*\bnoopener\b[^"]*"/i);
  });

  it('has the privacidade.html file present in the project', () => {
    const privacyPath = fileURLToPath(new URL('../../privacidade.html', import.meta.url));
    expect(existsSync(privacyPath)).toBe(true);
  });
});
