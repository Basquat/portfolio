// ==========================================================================
// CUSTOM CURSOR MODULE
// ==========================================================================

export class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.cursorDot = document.getElementById('cursor-dot');
    this.enabled = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.dotX = 0;
    this.dotY = 0;
    this.animationFrame = null;
    this.hoverElements = new Set();
    this.clickElements = new Set();
  }

  init() {
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isMobile = window.innerWidth <= 1024;

    if (!hasHover || isMobile) {
      this.disable();
      return;
    }

    this.enabled = true;
    this.bindEvents();
    this.animate();
  }

  disable() {
    if (this.cursor) this.cursor.style.display = 'none';
    if (this.cursorDot) this.cursorDot.style.display = 'none';
    this.enabled = false;
  }

  bindEvents() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));

    // Hover detection for interactive elements
    const interactiveSelector = 'a, button, .btn, .nav-link, .filter-btn, .skill-category-btn, .project-card, .contact-method, .social-link, .back-to-top, .modal-close, .toast-close, [role="button"], input, textarea, select';
    document.addEventListener('mouseover', this.onHover.bind(this), { passive: true });
    document.addEventListener('mouseout', this.onHoverOut.bind(this), { passive: true });

    // Re-check on resize
    window.addEventListener('resize', () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isMobile = window.innerWidth <= 1024;
      if ((!hasHover || isMobile) && this.enabled) {
        this.disable();
      } else if (hasHover && !isMobile && !this.enabled) {
        this.init();
      }
    });
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  onMouseDown() {
    this.cursor?.classList.add('click');
    this.cursorDot?.classList.add('click');
  }

  onMouseUp() {
    this.cursor?.classList.remove('click');
    this.cursorDot?.classList.remove('click');
  }

  onMouseLeave() {
    if (this.cursor) this.cursor.style.opacity = '0';
    if (this.cursorDot) this.cursorDot.style.opacity = '0';
  }

  onMouseEnter() {
    if (this.cursor) this.cursor.style.opacity = '1';
    if (this.cursorDot) this.cursorDot.style.opacity = '1';
  }

  onHover(e) {
    const target = e.target.closest('a, button, .btn, .nav-link, .filter-btn, .skill-category-btn, .project-card, .contact-method, .social-link, .back-to-top, .modal-close, .toast-close, [role="button"], input, textarea, select');
    if (target) {
      this.hoverElements.add(target);
      this.cursor?.classList.add('hover');
    }
  }

  onHoverOut(e) {
    const target = e.target.closest('a, button, .btn, .nav-link, .filter-btn, .skill-category-btn, .project-card, .contact-method, .social-link, .back-to-top, .modal-close, .toast-close, [role="button"], input, textarea, select');
    if (target) {
      this.hoverElements.delete(target);
      if (this.hoverElements.size === 0) {
        this.cursor?.classList.remove('hover');
      }
    }
  }

  animate() {
    if (!this.enabled) return;

    // Smooth cursor following
    this.cursorX += (this.mouseX - this.cursorX) * 0.2;
    this.cursorY += (this.mouseY - this.cursorY) * 0.2;

    // Dot follows faster
    this.dotX += (this.mouseX - this.dotX) * 0.4;
    this.dotY += (this.mouseY - this.dotY) * 0.4;

    if (this.cursor) {
      this.cursor.style.transform = `translate(${this.cursorX - 16}px, ${this.cursorY - 16}px)`;
    }
    if (this.cursorDot) {
      this.cursorDot.style.transform = `translate(${this.dotX - 4}px, ${this.dotY - 4}px)`;
    }

    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.disable();
  }
}