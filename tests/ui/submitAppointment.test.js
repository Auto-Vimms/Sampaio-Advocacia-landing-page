import { describe, it, expect, vi } from 'vitest';
import { submitAppointment } from '../../src/ui/submitAppointment.js';

const createDependencies = (overrides = {}) => ({
  appointmentForm: { collect: vi.fn(() => ({ nome: 'João' })) },
  appointmentService: { submit: vi.fn(() => Promise.resolve()) },
  submitButtonState: { setLoading: vi.fn(), reset: vi.fn() },
  redirect: { to: vi.fn() },
  toast: { show: vi.fn() },
  ...overrides,
});

describe('submitAppointment', () => {
  it('puts the submit button in the loading state', async () => {
    const dependencies = createDependencies();

    await submitAppointment(dependencies);

    expect(dependencies.submitButtonState.setLoading).toHaveBeenCalled();
  });

  it('submits the data collected from the form', async () => {
    const dependencies = createDependencies();

    await submitAppointment(dependencies);

    expect(dependencies.appointmentService.submit).toHaveBeenCalledWith({ nome: 'João' });
  });

  describe('when the submission succeeds', () => {
    it('redirects to the success page', async () => {
      const dependencies = createDependencies();

      await submitAppointment(dependencies);

      expect(dependencies.redirect.to).toHaveBeenCalledWith('sucesso.html');
    });

    it('does not reset the button or show a toast', async () => {
      const dependencies = createDependencies();

      await submitAppointment(dependencies);

      expect(dependencies.submitButtonState.reset).not.toHaveBeenCalled();
      expect(dependencies.toast.show).not.toHaveBeenCalled();
    });
  });

  describe('when the submission fails', () => {
    const createFailingDependencies = () => createDependencies({
      appointmentService: { submit: vi.fn(() => Promise.reject(new Error('network'))) },
    });

    it('does not redirect', async () => {
      const dependencies = createFailingDependencies();

      await submitAppointment(dependencies);

      expect(dependencies.redirect.to).not.toHaveBeenCalled();
    });

    it('shows the error toast and resets the button', async () => {
      const dependencies = createFailingDependencies();

      await submitAppointment(dependencies);

      expect(dependencies.toast.show).toHaveBeenCalledWith(
        'Nao foi possivel enviar o agendamento. Tente novamente.',
      );
      expect(dependencies.submitButtonState.reset).toHaveBeenCalled();
    });
  });
});
