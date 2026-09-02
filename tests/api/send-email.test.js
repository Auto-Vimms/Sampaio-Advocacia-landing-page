import { describe, it, expect } from 'vitest';
import { getMissingFields, buildEmailContent, escapeHtml } from '../../api/send-email.js';

const REQUIRED_FIELDS_EXPECTED = ['nome', 'email', 'telefone', 'documento', 'tipoEmpresa', 'consentimento', 'veracidade'];

describe('getMissingFields', () => {
  it('returns an empty array when all required fields are present', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      telefone: '11999999999',
      documento: '12345678900',
      tipoEmpresa: 'MEI',
      consentimento: true,
      veracidade: true,
    };

    expect(getMissingFields(body)).toEqual([]);
  });

  it('returns the names of the missing required fields', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      consentimento: true,
      veracidade: true,
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
      veracidade: true,
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
      veracidade: true,
    };

    expect(getMissingFields(body)).toEqual(['consentimento']);
  });

  it('treats a missing or unchecked veracidade as missing', () => {
    const body = {
      nome: 'Joao',
      email: 'joao@teste.com',
      telefone: '11999999999',
      documento: '12345678900',
      tipoEmpresa: 'MEI',
      consentimento: true,
      veracidade: false,
    };

    expect(getMissingFields(body)).toEqual(['veracidade']);
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
    veracidade: true,
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

  it('includes the veracity declaration in the text and html versions', () => {
    const { text, html } = buildEmailContent(appointmentRequest);

    expect(text).toContain('Declaracao de veracidade das informacoes: aceito em');
    expect(html).toContain('Declaracao de veracidade das informacoes:');
  });

  it('escapes user-provided values in the html version', () => {
    const { html } = buildEmailContent({
      ...appointmentRequest,
      nome: '<script>alert("x")</script>',
    });

    expect(html).not.toContain('<script>alert("x")</script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });

  it('keeps the plain-text version unescaped', () => {
    const { text } = buildEmailContent({ ...appointmentRequest, nome: 'Tom & Jerry' });

    expect(text).toContain('Nome: Tom & Jerry');
  });

  it('converts newlines in observacoes to <br> in the html version but not in the text version', () => {
    const { html, text } = buildEmailContent({
      ...appointmentRequest,
      observacoes: 'linha 1\nlinha 2',
    });

    expect(html).toContain('linha 1<br>linha 2');
    expect(text).toContain('linha 1\nlinha 2');
  });

  it('includes the firm name and submission timestamp footer in the text version', () => {
    const { text } = buildEmailContent(appointmentRequest);

    expect(text).toContain('Sampaio Advocacia');
    expect(text).toContain('Agendamento recebido em');
    expect(text).toContain('(America/Sao_Paulo)');
  });

  it('renders the Sampaio Advocacia logo in the html header', () => {
    const { html } = buildEmailContent(appointmentRequest);

    expect(html).toContain('sampaio-advocacia-logo.png');
    expect(html).toContain('Sampaio Advocacia');
  });
});

describe('escapeHtml', () => {
  it('escapes the HTML-significant characters', () => {
    expect(escapeHtml('<b>Tom & "Jerry" \'x\'</b>')).toBe(
      '&lt;b&gt;Tom &amp; &quot;Jerry&quot; &#39;x&#39;&lt;/b&gt;',
    );
  });

  it('returns an empty string for null or undefined', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('leaves a plain string unchanged', () => {
    expect(escapeHtml('Joao da Silva')).toBe('Joao da Silva');
  });
});