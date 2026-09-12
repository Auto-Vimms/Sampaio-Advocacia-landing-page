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

  it('sets exactly the agreed security headers for DEV-35 and DEV-36', () => {
    expect(headerMap).toEqual({
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self';",
    });
  });

  it('does not allow inline styles or scripts in the CSP', () => {
    const csp = headerMap['Content-Security-Policy'];
    expect(csp).not.toContain("'unsafe-inline'");
  });

  it('does not need to allow api.resend.com, since the email delivery happens server-side', () => {
    const csp = headerMap['Content-Security-Policy'];
    expect(csp).not.toContain('resend.com');
  });
});
