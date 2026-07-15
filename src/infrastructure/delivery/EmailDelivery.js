export class EmailDelivery {
  constructor(emailAddress) {
    this.emailAddress = emailAddress;
  }

  async send(appointmentRequest) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to send appointment email.');
    }
  }
}