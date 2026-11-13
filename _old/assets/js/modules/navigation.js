// ==========================================================================
// NAVIGATION MODULE
// ==========================================================================

export class Navigation {
  constructor() {
    this.header = document.getElementById('header');
    this.nav = document.getElementById('nav');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.navOverlay = document.getElementById('nav-overlay');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.activeSection = null;
    this.scrollSpyThrottle = null;
  }

  init() {
    if (!this.header || !this.nav) return;

    this.bindEvents();
    this.initScrollSpy();
    this.handleHashChange();
  }

  bindEvents() {
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener('click', this.toggleMobileMenu.bind(this));
    this.navOverlay?.addEventListener('click', this.closeMobileMenu.bind(this));

    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.onNavClick.bind(this));
    });

    // Keyboard navigation
    document.addEventListener('keydown', this.onKeyDown.bind(this));

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const isOpen = this.nav.classList.toggle('open');
    this.navOverlay?.classList.toggle('visible', isOpen);
    this.mobileMenuBtn?.classList.toggle('active', isOpen);
    this.mobileMenuBtn?.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.nav.classList.remove('open');
    this.navOverlay?.classList.remove('visible');
    this.mobileMenuBtn?.classList.remove('active');
    this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  onNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        this.scrollToSection(target);
        this.closeMobileMenu();
        this.updateActiveLink(link);
        history.pushState(null, '', href);
      }
    }
  }

  scrollToSection(target) {
    const headerHeight = this.header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  initScrollSpy() {
    const observerOptions = {
      rootMargin: `-${this.header.offsetHeight}px 0px -60% 0px`,
      threshold: 0
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          this.updateActiveNavLink(this.activeSection);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      this.scrollObserver.observe(section);
    });
  }

  updateActiveNavLink(sectionId) {
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (link) {
      this.navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  }

  handleHashChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          this.scrollToSection(target);
          const link = document.querySelector(`.nav-link[href="#${hash}"]`);
          if (link) this.updateActiveLink(link);
        }
      }
    });

    // Check initial hash
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const target = document.getElementById(hash);
      if (target) {
        setTimeout(() => this.scrollToSection(target), 100);
      }
    }
  }

  onKeyDown(e) {
    // Escape closes mobile menu
    if (e.key === 'Escape' && this.nav.classList.contains('open')) {
      this.closeMobileMenu();
    }

    // Tab trap in mobile menu
    if (e.key === 'Tab' && this.nav.classList.contains('open')) {
      const focusableElements = this.nav.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  destroy() {
    this.scrollObserver?.disconnect();
  }
}