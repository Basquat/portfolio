// ==========================================================================
// CONTACT FORM MODULE
// ==========================================================================

export class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.statusEl = document.getElementById('form-status');
    this.submitBtn = this.form?.querySelector('button[type="submit"]');
    this.isSubmitting = false;
  }

  init() {
    if (!this.form) return;

    this.bindEvents();
    this.initValidation();
  }

  bindEvents() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Real-time validation
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
  }

  initValidation() {
    // Add custom validity messages
    const fields = this.form.querySelectorAll('[required]');
    fields.forEach(field => {
      field.addEventListener('invalid', (e) => {
        e.preventDefault();
        this.showFieldError(field, this.getErrorMessage(field));
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validate all fields
    if (!this.validateForm()) {
      this.showStatus('error', 'Por favor, corrija os erros acima antes de enviar.');
      return;
    }

    this.setSubmitting(true);

    try {
      // Simulate API call (replace with real endpoint)
      await this.submitForm();

      this.showStatus('success', 'Mensagem enviada com sucesso! Responderemos em breve.');
      this.form.reset();
      this.clearAllErrors();

      // Track conversion
      this.trackEvent('form_submit', { form: 'contact' });

    } catch (error) {
      console.error('[ContactForm] Submission error:', error);
      this.showStatus('error', 'Erro ao enviar mensagem. Tente novamente ou envie email diretamente.');
    } finally {
      this.setSubmitting(false);
    }
  }

  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, replace with actual API call:
    /*
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }
    */

    // For demo, just log
    console.log('[ContactForm] Form data:', data);

    // Simulate occasional failure for testing
    // if (Math.random() < 0.1) throw new Error('Random failure');
  }

  validateForm() {
    let isValid = true;
    const fields = this.form.querySelectorAll('input, textarea, select');

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório.';
    }

    // Type-specific validation
    if (value && isValid) {
      switch (field.type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Digite um email válido.';
          }
          break;
        case 'tel':
          if (!/^[\d\s\-\(\)\+]{10,}$/.test(value)) {
            isValid = false;
            errorMessage = 'Digite um telefone válido.';
          }
          break;
      }

      // Min length
      const minLength = parseInt(field.getAttribute('minlength'), 10);
      if (minLength && value.length < minLength) {
        isValid = false;
        errorMessage = `Mínimo de ${minLength} caracteres.`;
      }

      // Max length
      const maxLength = parseInt(field.getAttribute('maxlength'), 10);
      if (maxLength && value.length > maxLength) {
        isValid = false;
        errorMessage = `Máximo de ${maxLength} caracteres.`;
      }

      // Pattern
      const pattern = field.getAttribute('pattern');
      if (pattern && value) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          isValid = false;
          errorMessage = field.getAttribute('data-pattern-message') || 'Formato inválido.';
        }
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearError(field);

    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    const errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;

    field.parentNode.appendChild(errorEl);
    field.setAttribute('aria-describedby', errorEl.id = `error-${field.id}`);
  }

  clearError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');

    const errorEl = field.parentNode.querySelector('.form-error');
    errorEl?.remove();
  }

  clearAllErrors() {
    this.form.querySelectorAll('.form-error').forEach(el => el.remove());
    this.form.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
      el.removeAttribute('aria-invalid');
      el.removeAttribute('aria-describedby');
    });
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) return 'Este campo é obrigatório.';
    if (field.validity.typeMismatch) return 'Formato inválido.';
    if (field.validity.tooShort) return `Mínimo de ${field.minLength} caracteres.`;
    if (field.validity.tooLong) return `Máximo de ${field.maxLength} caracteres.`;
    if (field.validity.patternMismatch) return field.getAttribute('data-pattern-message') || 'Formato inválido.';
    return 'Valor inválido.';
  }

  showStatus(type, message) {
    if (!this.statusEl) return;

    this.statusEl.className = `form-status ${type}`;
    this.statusEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" class="toast-icon">
        ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : ''}
        ${type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' : ''}
      </svg>
      <span class="toast-message">${message}</span>
    `;
    this.statusEl.style.display = 'flex';

    // Auto-hide success after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.statusEl.style.display = 'none';
      }, 5000);
    }
  }

  setSubmitting(submitting) {
    this.isSubmitting = submitting;

    if (this.submitBtn) {
      this.submitBtn.disabled = submitting;
      if (submitting) {
        this.submitBtn.innerHTML = `
          <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
          </svg>
          Enviando...
        `;
      } else {
        this.submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Enviar Mensagem
        `;
      }
    }
  }

  trackEvent(eventName, data) {
    // Analytics tracking (replace with your analytics)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
    if (typeof plause !== 'undefined') {
      plause('track', eventName, data);
    }
    console.log(`[Analytics] ${eventName}`, data);
  }

  destroy() {
    // No cleanup needed
  }
}