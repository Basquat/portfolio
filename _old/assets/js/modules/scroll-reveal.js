// ==========================================================================
// SCROLL REVEAL MODULE
// ==========================================================================

export class ScrollReveal {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.observer = null;
    this.staggerDelay = 100;
  }

  init() {
    if (this.revealElements.length === 0) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    this.revealElements.forEach(el => this.observer.observe(el));
  }

  revealElement(element) {
    // Handle stagger children
    const staggerChildren = element.querySelectorAll('[class*="stagger-"]');
    if (staggerChildren.length > 0) {
      staggerChildren.forEach((child, index) => {
        const delay = (index + 1) * this.staggerDelay;
        setTimeout(() => {
          child.classList.add('visible');
        }, delay);
      });
    }

    // Reveal the element itself
    requestAnimationFrame(() => {
      element.classList.add('visible');
    });
  }

  // Public method to manually trigger reveal
  reveal(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => this.revealElement(el));
  }

  destroy() {
    this.observer?.disconnect();
  }
}