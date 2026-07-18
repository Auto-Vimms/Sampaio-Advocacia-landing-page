import { REQUIRED_APPOINTMENT_FIELDS } from '../../../shared/appointmentFields.js';
export class AppointmentForm {
  constructor(formElement) {
    if (!formElement) {
      throw new Error('Appointment form element was not found.');
    }
    this.formElement = formElement;
  }
  isValid() {
    const hasAllRequiredFields = REQUIRED_APPOINTMENT_FIELDS
      .every((fieldId) => this.getInputValue(fieldId).length > 0);
    return hasAllRequiredFields && this.getCheckboxValue('consentimento');
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
      consentimento: this.getCheckboxValue('consentimento'),
    };
  }
  getInputValue(fieldId) {
    return this.formElement.querySelector(`#${fieldId}`)?.value.trim() ?? '';
  }
  getCheckboxValue(fieldId) {
    return this.formElement.querySelector(`#${fieldId}`)?.checked ?? false;
  }
}