// ==========================================================================
// TOAST NOTIFICATIONS MODULE
// ==========================================================================

export class Toast {
  constructor() {
    this.container = document.getElementById('toast-container');
    this.toasts = new Map();
    this.maxToasts = 5;
    this.defaultDuration = 5000;
  }

  init() {
    if (!this.container) {
      this.createContainer();
    }
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.className = 'toast-container';
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-label', 'Notificações');
    document.body.appendChild(this.container);
  }

  show(options) {
    const {
      type = 'info',
      title,
      message,
      duration = this.defaultDuration,
      action,
      persistent = false
    } = options;

    // Limit number of toasts
    if (this.toasts.size >= this.maxToasts) {
      const oldestKey = this.toasts.keys().next().value;
      this.hide(oldestKey);
    }

    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast = this.createToast(id, type, title, message, action);

    this.container.appendChild(toast);
    this.toasts.set(id, { element: toast, timeout: null });

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Auto-hide
    if (!persistent && duration > 0) {
      const timeout = setTimeout(() => this.hide(id), duration);
      this.toasts.get(id).timeout = timeout;
    }

    // Pause on hover
    toast.addEventListener('mouseenter', () => {
      if (this.toasts.has(id)) {
        const data = this.toasts.get(id);
        if (data.timeout) clearTimeout(data.timeout);
      }
    });

    toast.addEventListener('mouseleave', () => {
      if (this.toasts.has(id) && !persistent) {
        const data = this.toasts.get(id);
        data.timeout = setTimeout(() => this.hide(id), duration);
      }
    });

    return id;
  }

  createToast(id, type, title, message, action) {
    const toast = document.createElement('div');
    toast.id = id;
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    const icons = {
      success: '<polyline points="20 6 9 17 4 12"></polyline>',
      error: '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
      info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
      warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
    };

    let content = `
      <div class="toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          ${icons[type] || icons.info}
        </svg>
      </div>
      <div class="toast-message">
    `;

    if (title) {
      content += `<strong style="display: block; margin-bottom: 2px; color: var(--cp-text-primary);">${title}</strong>`;
    }

    content += `<span style="color: var(--cp-text-secondary); font-size: var(--cp-fs-sm);">${message}</span>`;
    content += `</div>`;

    if (action) {
      content += `
        <button class="toast-action btn btn-ghost btn-sm" style="padding: var(--cp-space-1) var(--cp-space-3); font-size: var(--cp-fs-xs);">
          ${action.label}
        </button>
      `;
    }

    content += `
      <button class="toast-close" aria-label="Fechar notificação">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    toast.innerHTML = content;

    // Bind close button
    toast.querySelector('.toast-close')?.addEventListener('click', () => this.hide(id));

    // Bind action button
    if (action && action.onClick) {
      toast.querySelector('.toast-action')?.addEventListener('click', () => {
        action.onClick();
        this.hide(id);
      });
    }

    return toast;
  }

  hide(id) {
    const data = this.toasts.get(id);
    if (!data) return;

    if (data.timeout) clearTimeout(data.timeout);

    data.element.classList.remove('visible');

    setTimeout(() => {
      data.element.remove();
      this.toasts.delete(id);
    }, 300);
  }

  hideAll() {
    this.toasts.forEach((_, id) => this.hide(id));
  }

  // Convenience methods
  success(message, options = {}) {
    return this.show({ type: 'success', message, ...options });
  }

  error(message, options = {}) {
    return this.show({ type: 'error', message, ...options });
  }

  info(message, options = {}) {
    return this.show({ type: 'info', message, ...options });
  }

  warning(message, options = {}) {
    return this.show({ type: 'warning', message, ...options });
  }

  destroy() {
    this.hideAll();
    this.container?.remove();
  }
}