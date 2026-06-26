export class ContactLinks {
  constructor(contacts) {
    this.contacts = contacts;
  }

  init() {
    this.setText('[data-contact="phone-label"]', this.contacts.whatsappLabel);
    this.setText('[data-contact="email-label"]', this.contacts.email);
    this.setText('[data-contact="city-label"]', this.contacts.city);
    this.setHref('[data-contact="phone-link"]', `tel:+${this.contacts.whatsappNumber}`);
    this.setHref('[data-contact="email-link"]', `mailto:${this.contacts.email}`);
    this.setHref('[data-contact="whatsapp-link"]', `https://wa.me/${this.contacts.whatsappNumber}`);
    this.setHref('[data-contact="linkedin-link"]', this.contacts.linkedin);
  }

  setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  setHref(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.href = value;
    });
  }
}
