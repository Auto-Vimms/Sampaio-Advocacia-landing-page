export class RevealObserver {
  constructor(selector = '[data-reveal]') {
    this.selector = selector;
  }

  init() {
    const elements = document.querySelectorAll(this.selector);

    if (!elements.length || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach((element) => observer.observe(element));
  }
}
