export class SubmitButtonState {
  constructor(buttonElement, loadingText = 'Enviando...') {
    if (!buttonElement) {
      throw new Error('Submit button element was not found.');
    }

    this.buttonElement = buttonElement;
    this.loadingText = loadingText;
    this.originalContent = buttonElement.innerHTML;
  }

  setLoading() {
    this.buttonElement.disabled = true;
    this.buttonElement.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>${this.loadingText}`;
  }

  reset() {
    this.buttonElement.disabled = false;
    this.buttonElement.innerHTML = this.originalContent;
  }
}
