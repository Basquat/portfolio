// ==========================================================================
// COUNTER ANIMATION MODULE
// ==========================================================================

export class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    this.animated = new WeakSet();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    const isDecimal = element.dataset.count.includes('.');
    const duration = parseInt(element.dataset.duration, 10) || 2000;
    const delay = parseInt(element.dataset.delay, 10) || 0;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const formatter = element.dataset.formatter || 'number';

    setTimeout(() => {
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startValue + (target - startValue) * eased;

        let displayValue;
        if (formatter === 'number') {
          displayValue = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString();
        } else if (formatter === 'percent') {
          displayValue = `${Math.round(current)}%`;
        } else {
          displayValue = Math.round(current).toLocaleString();
        }

        element.textContent = `${prefix}${displayValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(animate);
    }, delay);
  }

  // Public method to trigger counter manually
  trigger(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!this.animated.has(el)) {
        this.animated.add(el);
        this.animateCounter(el);
      }
    });
  }

  destroy() {
    this.animated = new WeakSet();
  }
}