// ==========================================================================
// SKILLS FILTER MODULE
// ==========================================================================

export class SkillsFilter {
  constructor() {
    this.categoryButtons = document.querySelectorAll('.skill-category-btn');
    this.skillCards = document.querySelectorAll('.skill-card');
    this.activeCategory = 'all';
    this.animationDelay = 50;
  }

  init() {
    if (this.categoryButtons.length === 0 || this.skillCards.length === 0) return;

    this.bindEvents();
    this.animateSkillsOnScroll();
  }

  bindEvents() {
    this.categoryButtons.forEach(button => {
      button.addEventListener('click', () => this.filterSkills(button.dataset.category, button));
    });

    // Keyboard navigation
    this.categoryButtons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % this.categoryButtons.length;
          this.categoryButtons[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + this.categoryButtons.length) % this.categoryButtons.length;
          this.categoryButtons[prevIndex].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          this.categoryButtons[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          this.categoryButtons[this.categoryButtons.length - 1].focus();
        }
      });
    });
  }

  filterSkills(category, clickedButton) {
    if (category === this.activeCategory) return;

    this.activeCategory = category;

    // Update button states
    this.categoryButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
      btn.setAttribute('aria-selected', btn.dataset.category === category);
    });

    // Animate cards out
    this.skillCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.pointerEvents = 'none';
      }, index * this.animationDelay);
    });

    // Animate cards in
    setTimeout(() => {
      this.skillCards.forEach((card, index) => {
        const matches = category === 'all' || card.dataset.category === category;

        if (matches) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.pointerEvents = '';
            // Re-trigger skill bar animation
            this.animateSkillBar(card);
          }, index * this.animationDelay);
        } else {
          card.style.display = 'none';
        }
      }, this.skillCards.length * this.animationDelay + 100);
    });
  }

  animateSkillBar(card) {
    const bar = card.querySelector('.skill-level-bar');
    if (bar) {
      bar.style.transform = 'scaleX(0)';
      requestAnimationFrame(() => {
        bar.style.transform = 'scaleX(1)';
      });
    }
  }

  animateSkillsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.skill-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
              this.animateSkillBar(card);
            }, index * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      observer.observe(skillsGrid);
    }
  }

  destroy() {
    // No cleanup needed for now
  }
}