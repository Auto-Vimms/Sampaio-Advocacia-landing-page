import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const indexHtml = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');

// Isola o <label> do checkbox de consentimento, onde vive o link da Política de Privacidade.
function consentLabelBlock(html) {
  const match = html.match(
    /<label[^>]*for="consentimento"[^>]*>([\s\S]*?)<\/label>/i,
  );
  return match ? match[1] : null;
}

describe('Link da Política de Privacidade no checkbox de consentimento (index.html)', () => {
  it('mantém o checkbox de consentimento com id="consentimento"', () => {
    expect(indexHtml).toMatch(
      /<input[^>]*id="consentimento"[^>]*>/i,
    );
  });

  it('aponta o link do consentimento para privacidade.html', () => {
    const block = consentLabelBlock(indexHtml);
    expect(block).not.toBeNull();

    const anchor = block.match(/<a\b[^>]*>/i);
    expect(anchor, 'esperava um <a> dentro do label de consentimento').not.toBeNull();

    expect(anchor[0]).toMatch(/href="privacidade\.html"/i);
  });

  it('abre a Política de Privacidade em nova aba de forma segura', () => {
    const block = consentLabelBlock(indexHtml);
    const anchor = block.match(/<a\b[^>]*>/i)[0];

    expect(anchor).toMatch(/target="_blank"/i);
    expect(anchor).toMatch(/rel="[^"]*\bnoopener\b[^"]*"/i);
  });

  it('tem o arquivo privacidade.html presente no projeto', () => {
    const privacyPath = fileURLToPath(new URL('../../privacidade.html', import.meta.url));
    expect(existsSync(privacyPath)).toBe(true);
  });
});
