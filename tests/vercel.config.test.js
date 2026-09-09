import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const vercelConfig = JSON.parse(
  readFileSync(new URL('../vercel.json', import.meta.url), 'utf-8'),
);

const catchAllRule = vercelConfig.headers?.find((rule) => rule.source === '/(.*)');

const headerMap = Object.fromEntries(
  (catchAllRule?.headers ?? []).map(({ key, value }) => [key, value]),
);

describe('vercel.json security headers', () => {
  it('applies a header rule to every route', () => {
    expect(catchAllRule).toBeDefined();
  });

  it('sets exactly the agreed security headers for DEV-35', () => {
    expect(headerMap).toEqual({
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    });
  });

  it('does not ship a Content-Security-Policy yet (tracked in DEV-36)', () => {
    expect(headerMap['Content-Security-Policy']).toBeUndefined();
  });
});
