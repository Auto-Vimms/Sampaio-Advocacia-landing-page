import { describe, it, expect } from 'vitest';
import { REQUIRED_APPOINTMENT_FIELDS } from '../../shared/appointmentFields.js';

describe('REQUIRED_APPOINTMENT_FIELDS', () => {
  it('contains exactly the fields required for an appointment request', () => {
    expect(REQUIRED_APPOINTMENT_FIELDS).toEqual([
      'nome',
      'email',
      'telefone',
      'documento',
      'tipoEmpresa',
    ]);
  });
});