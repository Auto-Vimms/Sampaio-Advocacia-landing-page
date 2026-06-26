const REQUIRED_FIELDS = ['nome', 'telefone', 'descricao'];

export class BudgetForm {
  constructor(formElement) {
    if (!formElement) {
      throw new Error('Budget form element was not found.');
    }

    this.formElement = formElement;
  }

  isValid() {
    return REQUIRED_FIELDS.every((fieldId) => this.getInputValue(fieldId).length > 0);
  }

  collect() {
    return {
      nome: this.getInputValue('nome'),
      empresa: this.getInputValue('empresa') || 'Nao informado',
      telefone: this.getInputValue('telefone'),
      email: this.getInputValue('email') || 'Nao informado',
      tipoEmpresa: this.getInputValue('tipoEmpresa') || 'Nao informado',
      urgencia: this.getInputValue('urgencia') || 'Nao informado',
      descricao: this.getInputValue('descricao'),
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
