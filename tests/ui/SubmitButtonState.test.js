import { describe, it, expect } from 'vitest';
import { SubmitButtonState } from '../../src/ui/SubmitButtonState.js';

const createButtonElement = (innerHTML = 'Enviar') => ({
  disabled: false,
  innerHTML,
});

describe('SubmitButtonState', () => {
  it('throws when no button element is provided', () => {
    expect(() => new SubmitButtonState(null)).toThrow();
  });

  describe('setLoading', () => {
    it('disables the button and shows a spinner with the loading text', () => {
      const button = createButtonElement();
      const state = new SubmitButtonState(button);

      state.setLoading();

      expect(button.disabled).toBe(true);
      expect(button.innerHTML).toContain('spinner-border');
      expect(button.innerHTML).toContain('Enviando...');
    });

    it('uses the custom loading text when provided', () => {
      const button = createButtonElement();
      const state = new SubmitButtonState(button, 'Aguarde...');

      state.setLoading();

      expect(button.innerHTML).toContain('Aguarde...');
    });
  });

  describe('reset', () => {
    it('restores the original content and re-enables the button', () => {
      const button = createButtonElement('<i class="fa-solid fa-paper-plane"></i>Enviar');
      const state = new SubmitButtonState(button);

      state.setLoading();
      state.reset();

      expect(button.disabled).toBe(false);
      expect(button.innerHTML).toBe('<i class="fa-solid fa-paper-plane"></i>Enviar');
    });
  });
});
