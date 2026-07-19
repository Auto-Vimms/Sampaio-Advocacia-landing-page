import { describe, it, expect } from 'vitest';
import { getMissingFields, buildEmailContent } from '../../api/send-email.js';

const REQUIRED_FIELDS_EXPECTED = ['nome', 'email', 'telefone', 'documento', 'tipoEmpresa', 'consentimento'];

describe('getMissingFields', () => {
  it('returns an empty array when all required fields are present', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      telefone: '11999999999',
      documento: '12345678900',
      tipoEmpresa: 'MEI',
      consentimento: true,
    };

    expect(getMissingFields(body)).toEqual([]);
  });

  it('returns the names of the missing required fields', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      consentimento: true,
    };

    expect(getMissingFields(body)).toEqual(['telefone', 'documento', 'tipoEmpresa']);
  });

  it('treats empty string fields as missing', () => {
    const body = {
      nome: '',
      email: 'joao@teste.com',
      telefone: '11999999999',
      documento: '12345678900',
      tipoEmpresa: 'MEI',
      consentimento: true,
    };

    expect(getMissingFields(body)).toEqual(['nome']);
  });

  it('does not throw when body is undefined', () => {
    expect(getMissingFields(undefined)).toEqual(REQUIRED_FIELDS_EXPECTED);
  });

  it('treats a missing or unchecked consentimento as missing', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      telefone: '11999999999',
      documento: '12345678900',
      tipoEmpresa: 'MEI',
      consentimento: false,
    };

    expect(getMissingFields(body)).toEqual(['consentimento']);
  });
});

describe('buildEmailContent', () => {
  const appointmentRequest = {
    nome: 'Joao',
    email: 'joao@teste.com',
    telefone: '11999999999',
    documento: '12345678900',
    tipoEmpresa: 'MEI',
    momento: 'Quero abrir minha empresa',
    observacoes: 'Preciso de ajuda com contrato social.',
    consentimento: true,
  };

  it('builds the subject using the requester name', () => {
    const { subject } = buildEmailContent(appointmentRequest);

    expect(subject).toBe('Novo agendamento: Joao');
  });

  it('includes all required fields in the text version', () => {
    const { text } = buildEmailContent(appointmentRequest);

    expect(text).toContain('Nome: Joao');
    expect(text).toContain('E-mail: joao@teste.com');
    expect(text).toContain('Telefone: 11999999999');
    expect(text).toContain('CNPJ/CPF: 12345678900');
    expect(text).toContain('Tipo de empresa: MEI');
  });

  it('includes all required fields in the html version', () => {
    const { html } = buildEmailContent(appointmentRequest);

    expect(html).toContain('Joao');
    expect(html).toContain('joao@teste.com');
    expect(html).toContain('11999999999');
  });

  it('falls back to a default text when momento is not informed', () => {
    const { text } = buildEmailContent({ ...appointmentRequest, momento: undefined });

    expect(text).toContain('Momento do negocio: Nao informado');
  });

  it('falls back to a default text when observacoes is not informed', () => {
    const { text } = buildEmailContent({ ...appointmentRequest, observacoes: undefined });

    expect(text).toContain('Nenhuma observacao informada.');
  });

  it('includes the consent confirmation in the text and html versions', () => {
    const { text, html } = buildEmailContent(appointmentRequest);

    expect(text).toContain('Consentimento com a Politica de Privacidade: aceito em');
    expect(html).toContain('Consentimento com a Politica de Privacidade:');
  });
});