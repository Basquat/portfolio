// ==========================================================================
// MODAL MODULE
// ==========================================================================

export class Modal {
  constructor() {
    this.modals = new Map();
    this.activeModal = null;
    this.previousActiveElement = null;
    this.scrollPosition = 0;
  }

  init() {
    // Bind existing modals
    document.querySelectorAll('.modal').forEach(modal => {
      this.registerModal(modal.id, modal);
    });

    // Global ESC key handler
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Listen for custom modal open events
    window.addEventListener('modal:open', (e) => this.open(e.detail.id, e.detail.data));
    window.addEventListener('modal:close', () => this.close());
  }

  registerModal(id, modalElement) {
    if (!id || !modalElement) return;

    const closeBtn = modalElement.querySelector('.modal-close, [data-modal-close]');
    const overlay = modalElement;

    closeBtn?.addEventListener('click', () => this.close(id));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close(id);
    });

    this.modals.set(id, {
      element: modalElement,
      closeBtn,
      overlay
    });
  }

  open(id, data = {}) {
    const modalData = this.modals.get(id);
    if (!modalData) {
      console.warn(`[Modal] Modal "${id}" not found`);
      return;
    }

    // Close any active modal first
    if (this.activeModal) {
      this.close(this.activeModal);
    }

    this.activeModal = id;
    this.previousActiveElement = document.activeElement;
    this.scrollPosition = window.scrollY;

    const modal = modalData.element;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${this.getScrollbarWidth()}px`;

    // Show modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    // Trap focus
    this.trapFocus(modal);

    // Focus first focusable element
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    // Dispatch event
    modal.dispatchEvent(new CustomEvent('modal:opened', { detail: { id, data } }));
    window.dispatchEvent(new CustomEvent('modal:opened', { detail: { id, data } }));

    // Call onOpen callback if provided
    if (data.onOpen) data.onOpen(modal, data);
  }

  close(id) {
    const targetId = id || this.activeModal;
    if (!targetId) return;

    const modalData = this.modals.get(targetId);
    if (!modalData) return;

    const modal = modalData.element;

    // Hide modal
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, this.scrollPosition);

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    this.activeModal = null;

    // Dispatch event
    modal.dispatchEvent(new CustomEvent('modal:closed', { detail: { id: targetId } }));
    window.dispatchEvent(new CustomEvent('modal:closed', { detail: { id: targetId } }));
  }

  closeAll() {
    this.modals.forEach((_, id) => this.close(id));
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.activeModal) {
      this.close(this.activeModal);
    }

    // Tab trapping for active modal
    if (e.key === 'Tab' && this.activeModal) {
      const modalData = this.modals.get(this.activeModal);
      if (modalData) {
        this.handleTabTrap(e, modalData.element);
      }
    }
  }

  handleTabTrap(e, modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  }

  trapFocus(modal) {
    // Set initial focus
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }

  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  // Static method to create modal dynamically
  static create(options) {
    const {
      id = `modal-${Date.now()}`,
      title = '',
      content = '',
      size = 'md', // sm, md, lg, xl, full
      closable = true,
      onOpen,
      onClose
    } = options;

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', `${id}-title`);

    const sizes = {
      sm: 'max-width: 400px;',
      md: 'max-width: 600px;',
      lg: 'max-width: 900px;',
      xl: 'max-width: 1200px;',
      full: 'max-width: 95vw; max-height: 95vh;'
    };

    modal.innerHTML = `
      <div class="modal-content" style="${sizes[size] || sizes.md}">
        <div class="modal-header">
          <h3 class="modal-title" id="${id}-title">${title}</h3>
          ${closable ? `
            <button class="modal-close" aria-label="Fechar modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ` : ''}
        </div>
        <div class="modal-body">${content}</div>
      </div>
    `;

    document.body.appendChild(modal);

    // Register with modal manager
    window.portfolio?.getModule('modal')?.registerModal(id, modal);

    // Open if requested
    if (options.open !== false) {
      window.portfolio?.getModule('modal')?.open(id, { onOpen, onClose });
    }

    return modal;
  }

  destroy() {
    this.closeAll();
    this.modals.clear();
  }
}