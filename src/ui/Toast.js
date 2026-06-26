export class Toast {
  constructor(containerId = 'toast-container') {
    this.container = this.ensureContainer(containerId);
  }

  show(message) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-dark border-0 show';
    toast.role = 'status';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Fechar"></button>
      </div>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    this.container.appendChild(toast);
    window.setTimeout(() => toast.remove(), 4500);
  }

  ensureContainer(containerId) {
    const existingContainer = document.getElementById(containerId);

    if (existingContainer) {
      return existingContainer;
    }

    const container = document.createElement('div');
    container.id = containerId;
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1080';
    document.body.appendChild(container);

    return container;
  }
}
