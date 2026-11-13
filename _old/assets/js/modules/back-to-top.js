// ==========================================================================
// BACK TO TOP MODULE
// ==========================================================================

export class BackToTop {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.scrollThreshold = 300;
    this.throttleTimeout = null;
  }

  init() {
    if (!this.button) return;

    this.bindEvents();
    this.checkVisibility();
  }

  bindEvents() {
    this.button.addEventListener('click', this.scrollToTop.bind(this));

    window.addEventListener('scroll', () => {
      if (!this.throttleTimeout) {
        this.throttleTimeout = setTimeout(() => {
          this.checkVisibility();
          this.throttleTimeout = null;
        }, 100);
      }
    }, { passive: true });
  }

  checkVisibility() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > this.scrollThreshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Focus management for accessibility
    const header = document.getElementById('header');
    if (header) {
      header.focus({ preventScroll: true });
    }
  }

  destroy() {
    // No cleanup needed
  }
}