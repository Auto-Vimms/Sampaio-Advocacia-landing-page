export class EmailDelivery {
  constructor(emailAddress) {
    this.emailAddress = emailAddress;
  }

  send() {
    throw new Error(`Email delivery is not integrated yet: ${this.emailAddress}`);
  }
}
