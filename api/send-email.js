import { Resend } from 'resend';
import { REQUIRED_APPOINTMENT_FIELDS } from '../shared/appointmentFields.js';

export function getMissingFields(body) {
  const missingFields = REQUIRED_APPOINTMENT_FIELDS.filter((field) => !body?.[field]);

  if (!body?.consentimento) {
    missingFields.push('consentimento');
  }

  if (!body?.veracidade) {
    missingFields.push('veracidade');
  }

  return missingFields;
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

  const submissionDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

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
    '',
    `Consentimento com a Politica de Privacidade: aceito em ${submissionDate}.`,
    `Declaracao de veracidade das informacoes: aceito em ${submissionDate}.`,
    '',
    '--',
    'Sampaio Advocacia',
    `Agendamento recebido em ${submissionDate} (America/Sao_Paulo)`,
  ].join('\n');

  const serifStack = "'Cinzel', 'Cormorant Garamond', Georgia, 'Times New Roman', serif";
  const sansStack = "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const fields = [
    ['Nome', nome],
    ['E-mail', email],
    ['Telefone', telefone],
    ['CNPJ/CPF', documento],
    ['Tipo de empresa', tipoEmpresa],
    ['Momento do negocio', momento || 'Nao informado'],
  ];

  const fieldRow = (label, value) => `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid rgba(189,106,73,.2);">
                  <div style="font-family:${sansStack};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#bd6a49;">${label}</div>
                  <div style="font-family:${sansStack};font-size:15px;color:#17242a;margin-top:5px;">${escapeHtml(value)}</div>
                </td>
              </tr>`;

  const observacoesHtml = observacoes
    ? escapeHtml(observacoes).replace(/\n/g, '<br>')
    : 'Nenhuma observacao informada.';

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <title>Novo agendamento</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#f3eee8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background-color:#f3eee8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:600px;max-width:100%;background-color:#ffffff;border:1px solid rgba(189,106,73,.35);">
          <tr>
            <td align="center" style="padding:36px 32px 20px 32px;">
              <img src="https://aliciasampaioadvocacia.com.br/assets/sampaio-advocacia-logo.png" width="60" height="60" alt="Sampaio Advocacia" style="display:block;border:0;outline:none;text-decoration:none;width:60px;height:auto;margin:0 auto 14px auto;">
              <div style="font-family:${serifStack};font-size:20px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#17242a;">Sampaio Advocacia</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <div style="height:2px;line-height:2px;font-size:2px;background-color:#bd6a49;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 4px 32px;">
              <div style="font-family:${serifStack};font-size:18px;color:#17242a;letter-spacing:.5px;">Novo agendamento recebido pelo site</div>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${fields.map(([label, value]) => fieldRow(label, value)).join('')}
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid rgba(189,106,73,.2);">
                  <div style="font-family:${sansStack};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#bd6a49;">Observacoes</div>
                  <div style="font-family:${sansStack};font-size:15px;color:#17242a;margin-top:5px;line-height:1.6;">${observacoesHtml}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0 4px 0;">
                  <div style="font-family:${sansStack};font-size:13px;color:#17242a;line-height:1.6;">
                    <span style="color:#bd6a49;font-weight:600;">Consentimento com a Politica de Privacidade:</span> aceito em ${submissionDate}.
                  </div>
                  <div style="font-family:${sansStack};font-size:13px;color:#17242a;line-height:1.6;margin-top:6px;">
                    <span style="color:#bd6a49;font-weight:600;">Declaracao de veracidade das informacoes:</span> aceito em ${submissionDate}.
                  </div>
                </td>
              </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;line-height:1px;font-size:1px;background-color:rgba(189,106,73,.35);">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 32px 32px;">
              <div style="font-family:${serifStack};font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#17242a;">Sampaio Advocacia</div>
              <div style="font-family:${sansStack};font-size:12px;color:#687178;margin-top:4px;">Agendamento recebido em ${submissionDate} (America/Sao_Paulo)</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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