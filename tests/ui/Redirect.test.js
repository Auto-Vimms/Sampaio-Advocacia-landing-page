import { describe, it, expect, afterEach, vi } from 'vitest';
import { Redirect } from '../../src/ui/Redirect.js';

describe('Redirect', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('assigns the given url to window.location.href', () => {
    const location = { href: '' };
    vi.stubGlobal('window', { location });

    new Redirect().to('sucesso.html');

    expect(location.href).toBe('sucesso.html');
  });
});
