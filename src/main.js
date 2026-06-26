import { CONFIG } from './config/config.js';
import { BudgetForm } from './domain/budget/BudgetForm.js';
import { BudgetService } from './domain/budget/BudgetService.js';
import { EmailDelivery } from './infrastructure/delivery/EmailDelivery.js';
import { WhatsAppDelivery } from './infrastructure/delivery/WhatsAppDelivery.js';
import { ContactLinks } from './ui/ContactLinks.js';
import { RevealObserver } from './ui/RevealObserver.js';
import { Toast } from './ui/Toast.js';

const createBudgetService = () => new BudgetService({
  whatsapp: new WhatsAppDelivery(CONFIG.contacts.whatsappNumber, CONFIG.contacts.lawyerName),
  email: new EmailDelivery(CONFIG.contacts.email),
}, CONFIG.budget.defaultSubmitMethod);

const initBudgetForm = () => {
  const formElement = document.getElementById('form-orcamento');

  if (!formElement) {
    return;
  }

  const budgetForm = new BudgetForm(formElement);
  const budgetService = createBudgetService();
  const toast = new Toast();

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!budgetForm.isValid()) {
      formElement.reportValidity();
      return;
    }

    budgetService.submit(budgetForm.collect());
    toast.show('Orcamento preparado. Voce sera direcionado para o WhatsApp.');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  new ContactLinks(CONFIG.contacts).init();
  new RevealObserver().init();
  initBudgetForm();
});
