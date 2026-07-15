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
    return [
      `Ola, ${this.lawyerName}! Gostaria de solicitar um agendamento.`,
      `Nome: ${appointmentRequest.nome}`,
      `CNPJ/CPF: ${appointmentRequest.documento}`,
      `WhatsApp: ${appointmentRequest.telefone}`,
      `E-mail: ${appointmentRequest.email}`,
      `Tipo de empresa: ${appointmentRequest.tipoEmpresa}`,
      `Momento do negocio: ${appointmentRequest.momento}`,
      'Observações:',
      appointmentRequest.observacoes,
    ].join('\n');
  }
}