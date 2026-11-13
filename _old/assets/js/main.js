// ==========================================================================
// CYBERPUNK 2077 PORTFOLIO - MAIN ENTRY POINT
// ==========================================================================

import { LoadingScreen } from './modules/loading.js';
import { CustomCursor } from './modules/cursor.js';
import { Navigation } from './modules/navigation.js';
import { HeroAnimations } from './modules/hero.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { SkillsFilter } from './modules/skills.js';
import { ProjectsFilter } from './modules/projects.js';
import { CounterAnimation } from './modules/counter.js';
import { ContactForm } from './modules/contact.js';
import { BackToTop } from './modules/back-to-top.js';
import { Toast } from './modules/toast.js';
import { EasterEggs } from './modules/easter-eggs.js';
import { Modal } from './modules/modal.js';

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
class PortfolioApp {
  constructor() {
    this.modules = {};
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      // Initialize loading screen first
      this.modules.loading = new LoadingScreen();
      await this.modules.loading.init();

      // Initialize all other modules in parallel
      await Promise.all([
        this.initModule('cursor', () => new CustomCursor()),
        this.initModule('navigation', () => new Navigation()),
        this.initModule('hero', () => new HeroAnimations()),
        this.initModule('scrollReveal', () => new ScrollReveal()),
        this.initModule('skills', () => new SkillsFilter()),
        this.initModule('projects', () => new ProjectsFilter()),
        this.initModule('counter', () => new CounterAnimation()),
        this.initModule('contact', () => new ContactForm()),
        this.initModule('backToTop', () => new BackToTop()),
        this.initModule('toast', () => new Toast()),
        this.initModule('easterEggs', () => new EasterEggs()),
        this.initModule('modal', () => new Modal()),
      ]);

      // Hide loading screen after all modules are ready
      await this.modules.loading.hide();

      this.initialized = true;
      this.dispatchEvent('portfolio:ready');

      // Performance monitoring
      this.logPerformance();

    } catch (error) {
      console.error('[Portfolio] Initialization failed:', error);
      // Force hide loading screen on error
      if (this.modules.loading) {
        await this.modules.loading.hide();
      }
    }
  }

  async initModule(name, factory) {
    try {
      this.modules[name] = factory();
      if (this.modules[name].init) {
        await this.modules[name].init();
      }
    } catch (error) {
      console.error(`[Portfolio] Module ${name} failed to initialize:`, error);
    }
  }

  logPerformance() {
    if ('performance' in window && 'mark' in performance) {
      performance.mark('portfolio:fully-loaded');
      performance.measure('portfolio:init', 'portfolio:start', 'portfolio:fully-loaded');
      const measure = performance.getEntriesByName('portfolio:init')[0];
      console.log(`[Portfolio] Initialized in ${measure.duration.toFixed(2)}ms`);
    }
  }

  dispatchEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  getModule(name) {
    return this.modules[name];
  }
}

// ==========================================================================
// GLOBAL EVENT HANDLERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  performance.mark('portfolio:start');
  window.portfolio = new PortfolioApp();
  window.portfolio.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    window.portfolio?.dispatchEvent('portfolio:visible');
  } else {
    window.portfolio?.dispatchEvent('portfolio:hidden');
  }
});

// Handle resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    window.portfolio?.dispatchEvent('portfolio:resize');
  }, 150);
});

// Handle scroll for header
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const header = document.getElementById('header');
  if (header) {
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }
  lastScrollY = currentScrollY;
}, { passive: true });

// Global error handler
window.addEventListener('error', (event) => {
  console.error('[Portfolio] Global error:', event.error);
  window.portfolio?.getModule('toast')?.show({
    type: 'error',
    message: 'Ocorreu um erro inesperado. Tente recarregar a página.'
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Portfolio] Unhandled rejection:', event.reason);
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failed - not critical
    });
  });
}

export { PortfolioApp };