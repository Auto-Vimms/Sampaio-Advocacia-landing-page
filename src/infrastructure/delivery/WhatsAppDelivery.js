export class WhatsAppDelivery {
  constructor(whatsappNumber, lawyerName) {
    this.whatsappNumber = whatsappNumber;
    this.lawyerName = lawyerName;
  }

  send(appointmentRequest) {
    const message = this.createMessage(appointmentRequest);
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener');
  }

  createMessage(appointmentRequest) {
    const services = appointmentRequest.servicos.join(', ');

    return [
      `Ola, ${this.lawyerName}! Gostaria de solicitar um agendamento.`,
      '',
      `Nome: ${appointmentRequest.nome}`,
      `Empresa: ${appointmentRequest.empresa}`,
      `WhatsApp: ${appointmentRequest.telefone}`,
      `E-mail: ${appointmentRequest.email}`,
      `Tipo de empresa: ${appointmentRequest.tipoEmpresa}`,
      `Servicos de interesse: ${services}`,
      `Prazo desejado: ${appointmentRequest.urgencia}`,
      '',
      'Descricao da necessidade:',
      appointmentRequest.descricao,
    ].join('\n');
  }
}
