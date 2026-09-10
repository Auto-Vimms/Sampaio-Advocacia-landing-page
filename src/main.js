import { CONFIG } from './config/config.js';
import { AppointmentForm } from './domain/appointment/AppointmentForm.js';
import { AppointmentService } from './domain/appointment/AppointmentService.js';
import { EmailDelivery } from './infrastructure/delivery/EmailDelivery.js';
import { WhatsAppDelivery } from './infrastructure/delivery/WhatsAppDelivery.js';
import { ContactLinks } from './ui/ContactLinks.js';
import { Redirect } from './ui/Redirect.js';
import { RevealObserver } from './ui/RevealObserver.js';
import { SubmitButtonState } from './ui/SubmitButtonState.js';
import { submitAppointment } from './ui/submitAppointment.js';
import { Toast } from './ui/Toast.js';

const createAppointmentService = () => new AppointmentService({
  whatsapp: new WhatsAppDelivery(CONFIG.contacts.whatsappNumber, CONFIG.contacts.lawyerName),
  email: new EmailDelivery(CONFIG.contacts.email),
}, CONFIG.appointment.defaultSubmitMethod);

const initAppointmentForm = () => {
  const formElement = document.getElementById('form-agendamento');
  if (!formElement) {
    return;
  }
  const appointmentForm = new AppointmentForm(formElement);
  const appointmentService = createAppointmentService();
  const toast = new Toast();
  const submitButtonState = new SubmitButtonState(formElement.querySelector('button[type="submit"]'));
  const redirect = new Redirect();
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!appointmentForm.isValid()) {
      formElement.reportValidity();
      return;
    }
    submitAppointment({ appointmentForm, appointmentService, submitButtonState, redirect, toast });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  new ContactLinks(CONFIG.contacts).init();
  new RevealObserver().init();
  initAppointmentForm();
});
