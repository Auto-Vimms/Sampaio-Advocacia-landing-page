import { CONFIG } from './config/config.js';
import { AppointmentForm } from './domain/appointment/AppointmentForm.js';
import { AppointmentService } from './domain/appointment/AppointmentService.js';
import { EmailDelivery } from './infrastructure/delivery/EmailDelivery.js';
import { WhatsAppDelivery } from './infrastructure/delivery/WhatsAppDelivery.js';
import { ContactLinks } from './ui/ContactLinks.js';
import { RevealObserver } from './ui/RevealObserver.js';
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
  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!appointmentForm.isValid()) {
      formElement.reportValidity();
      return;
    }
    try {
      await appointmentService.submit(appointmentForm.collect());
      toast.show('Agendamento enviado com sucesso.');
    } catch {
      toast.show('Nao foi possivel enviar o agendamento. Tente novamente.');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  new ContactLinks(CONFIG.contacts).init();
  new RevealObserver().init();
  initAppointmentForm();
});
