export class BudgetService {
  constructor(deliveries, defaultSubmitMethod) {
    this.deliveries = deliveries;
    this.defaultSubmitMethod = defaultSubmitMethod;
  }

  submit(budgetRequest, method = this.defaultSubmitMethod) {
    const delivery = this.deliveries[method];

    if (!delivery) {
      throw new Error(`Delivery method "${method}" is not configured.`);
    }

    delivery.send(budgetRequest);
  }
}
