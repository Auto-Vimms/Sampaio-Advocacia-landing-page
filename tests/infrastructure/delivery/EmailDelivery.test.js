import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EmailDelivery } from '../../../src/infrastructure/delivery/EmailDelivery.js';

describe('EmailDelivery', () => {
  const appointmentRequest = {
    nome: 'Joao',
    email: 'joao@teste.com',
    telefone: '11999999999',
    documento: '12345678900',
    tipoEmpresa: 'MEI',
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the appointment request as-is to /api/send-email', async () => {
    fetch.mockResolvedValue({ ok: true });
    const delivery = new EmailDelivery('aliciasampaiosilva@gmail.com');

    await delivery.send(appointmentRequest);

    expect(fetch).toHaveBeenCalledWith('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentRequest),
    });
  });

  it('resolves without throwing when the response is ok', async () => {
    fetch.mockResolvedValue({ ok: true });
    const delivery = new EmailDelivery('aliciasampaiosilva@gmail.com');

    await expect(delivery.send(appointmentRequest)).resolves.toBeUndefined();
  });

  it('throws when the response is not ok', async () => {
    fetch.mockResolvedValue({ ok: false });
    const delivery = new EmailDelivery('aliciasampaiosilva@gmail.com');

    await expect(delivery.send(appointmentRequest)).rejects.toThrow(
      'Failed to send appointment email.',
    );
  });
});