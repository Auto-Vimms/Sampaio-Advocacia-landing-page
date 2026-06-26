export class WhatsAppDelivery {
  constructor(whatsappNumber, lawyerName) {
    this.whatsappNumber = whatsappNumber;
    this.lawyerName = lawyerName;
  }

  send(budgetRequest) {
    const message = this.createMessage(budgetRequest);
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener');
  }

  createMessage(budgetRequest) {
    const services = budgetRequest.servicos.join(', ');

    return [
      `Ola, ${this.lawyerName}! Gostaria de solicitar um orçamento.`,
      '',
      `Nome: ${budgetRequest.nome}`,
      `Empresa: ${budgetRequest.empresa}`,
      `WhatsApp: ${budgetRequest.telefone}`,
      `E-mail: ${budgetRequest.email}`,
      `Tipo de empresa: ${budgetRequest.tipoEmpresa}`,
      `Servicos de interesse: ${services}`,
      `Prazo desejado: ${budgetRequest.urgencia}`,
      '',
      'Descricao da necessidade:',
      budgetRequest.descricao,
    ].join('\n');
  }
}
