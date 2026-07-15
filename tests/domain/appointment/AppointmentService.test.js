import { describe, it, expect, vi } from 'vitest';
import { AppointmentService } from '../../../src/domain/appointment/AppointmentService.js';

function createFakeDelivery() {
  return { send: vi.fn().mockResolvedValue(undefined) };
}

describe('AppointmentService', () => {
  it('calls send on the delivery matching the given method', async () => {
    const whatsappDelivery = createFakeDelivery();
    const emailDelivery = createFakeDelivery();
    const service = new AppointmentService(
      { whatsapp: whatsappDelivery, email: emailDelivery },
      'whatsapp',
    );
    const appointmentRequest = { nome: 'Joao' };

    await service.submit(appointmentRequest, 'email');

    expect(emailDelivery.send).toHaveBeenCalledWith(appointmentRequest);
    expect(whatsappDelivery.send).not.toHaveBeenCalled();
  });

  it('falls back to the default submit method when none is given', async () => {
    const whatsappDelivery = createFakeDelivery();
    const emailDelivery = createFakeDelivery();
    const service = new AppointmentService(
      { whatsapp: whatsappDelivery, email: emailDelivery },
      'email',
    );
    const appointmentRequest = { nome: 'Joao' };

    await service.submit(appointmentRequest);

    expect(emailDelivery.send).toHaveBeenCalledWith(appointmentRequest);
    expect(whatsappDelivery.send).not.toHaveBeenCalled();
  });

  it('throws when the given method has no configured delivery', async () => {
    const service = new AppointmentService({ email: createFakeDelivery() }, 'email');

    await expect(service.submit({ nome: 'Joao' }, 'sms')).rejects.toThrow(
      'Delivery method "sms" is not configured.',
    );
  });

  it('waits for the delivery send promise to resolve before finishing', async () => {
    let resolveSend;
    const pendingSend = new Promise((resolve) => {
      resolveSend = resolve;
    });
    const delivery = { send: vi.fn().mockReturnValue(pendingSend) };
    const service = new AppointmentService({ email: delivery }, 'email');

    let finished = false;
    const submitPromise = service.submit({ nome: 'Joao' }).then(() => {
      finished = true;
    });

    expect(finished).toBe(false);

    resolveSend();
    await submitPromise;

    expect(finished).toBe(true);
  });

  it('propagates the error thrown by the delivery', async () => {
    const delivery = { send: vi.fn().mockRejectedValue(new Error('Failed to send.')) };
    const service = new AppointmentService({ email: delivery }, 'email');

    await expect(service.submit({ nome: 'Joao' })).rejects.toThrow('Failed to send.');
  });
});