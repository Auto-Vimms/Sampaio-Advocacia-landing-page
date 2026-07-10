const REQUIRED_FIELDS = ['nome', 'email', 'documento', 'telefone', 'observacoes'];

export class AppointmentForm {
  constructor(formElement) {
    if (!formElement) {
      throw new Error('Appointment form element was not found.');
    }

    this.formElement = formElement;
  }

  isValid() {
    return REQUIRED_FIELDS.every((fieldId) => this.getInputValue(fieldId).length > 0);
  }

  collect() {
    return {
      nome: this.getInputValue('nome'),
      documento: this.getInputValue('documento'),
      telefone: this.getInputValue('telefone'),
      email: this.getInputValue('email'),
      tipoEmpresa: this.getInputValue('tipoEmpresa') || 'Nao informado',
      momento: this.getInputValue('momento') || 'Nao informado',
      observacoes: this.getInputValue('observacoes'),
      servicos: this.getSelectedServices(),
    };
  }

  getInputValue(fieldId) {
    return this.formElement.querySelector(`#${fieldId}`)?.value.trim() ?? '';
  }

  getSelectedServices() {
    const selectedServices = Array.from(this.formElement.querySelectorAll('.servico:checked'))
      .map((item) => item.value);

    return selectedServices.length ? selectedServices : ['Nao informado'];
  }
}
