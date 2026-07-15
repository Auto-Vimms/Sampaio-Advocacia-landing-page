import { Resend } from 'resend';

const REQUIRED_FIELDS = ['nome', 'email', 'telefone', 'documento', 'tipoEmpresa'];

export function getMissingFields(body) {
  return REQUIRED_FIELDS.filter((field) => !body?.[field]);
}

export function buildEmailContent(appointmentRequest) {
  const {
    nome,
    email,
    telefone,
    documento,
    tipoEmpresa,
    momento,
    observacoes,
  } = appointmentRequest;

  const subject = `Novo agendamento: ${nome}`;

  const text = [
    'Novo agendamento recebido pelo site.',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Telefone: ${telefone}`,
    `CNPJ/CPF: ${documento}`,
    `Tipo de empresa: ${tipoEmpresa}`,
    `Momento do negocio: ${momento || 'Nao informado'}`,
    'Observacoes:',
    observacoes || 'Nenhuma observacao informada.',
  ].join('\n');

  const html = `
    <div>
      <h2>Novo agendamento recebido pelo site</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>CNPJ/CPF:</strong> ${documento}</p>
      <p><strong>Tipo de empresa:</strong> ${tipoEmpresa}</p>
      <p><strong>Momento do negocio:</strong> ${momento || 'Nao informado'}</p>
      <p><strong>Observacoes:</strong></p>
      <p>${observacoes || 'Nenhuma observacao informada.'}</p>
    </div>
  `;

  return { subject, html, text };
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
    });
  }

  const missingFields = getMissingFields(req.body);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields.',
      fields: missingFields,
    });
  }

  const { subject, html, text } = buildEmailContent(req.body);

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({
        error: 'Failed to send email.',
      });
    }

    return res.status(200).json({
      message: 'Email sent successfully.',
    });
  } catch {
    return res.status(500).json({
      error: 'Unexpected error while sending email.',
    });
  }
}