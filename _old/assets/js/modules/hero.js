// ==========================================================================
// HERO ANIMATIONS MODULE
// ==========================================================================

export class HeroAnimations {
  constructor() {
    this.particlesContainer = document.getElementById('hero-particles');
    this.neonLinesContainer = document.getElementById('hero-neon-lines');
    this.stats = document.querySelectorAll('.stat-value[data-count]');
    this.subtitle = document.getElementById('hero-subtitle');
    this.particles = [];
    this.neonLines = [];
    this.animationFrame = null;
    this.particleCount = 30;
    this.lineCount = 4;
  }

  async init() {
    this.createParticles();
    this.createNeonLines();
    this.animateParticles();
    this.initTypewriter();
    this.observeStats();
  }

  createParticles() {
    if (!this.particlesContainer) return;

    const colors = ['particle-cyan', 'particle-magenta', 'particle-yellow'];

    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `particle ${colors[Math.floor(Math.random() * colors.length)]}`;

      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random animation delay and duration
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;

      this.particlesContainer.appendChild(particle);
      this.particles.push(particle);
    }
  }

  createNeonLines() {
    if (!this.neonLinesContainer) return;

    for (let i = 0; i < this.lineCount; i++) {
      const line = document.createElement('div');
      line.className = `neon-line ${i % 2 === 0 ? '' : 'magenta'}`;
      line.style.top = `${20 + i * 25}%`;
      line.style.animationDelay = `${i * 0.75}s`;
      line.style.width = `${60 + Math.random() * 40}%`;
      line.style.left = `${Math.random() * 20}%`;

      this.neonLinesContainer.appendChild(line);
      this.neonLines.push(line);
    }
  }

  animateParticles() {
    // Particles are animated via CSS, but we can add mouse interaction
    if (!this.particlesContainer) return;

    let mouseX = 0.5;
    let mouseY = 0.5;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    }, { passive: true });

    const animate = () => {
      this.particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        // Subtle mouse attraction
        const dx = (mouseX * window.innerWidth) - particleX;
        const dy = (mouseY * window.innerHeight) - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.5;
          const currentTransform = particle.style.transform || '';
          const translateX = force * dx * 0.02;
          const translateY = force * dy * 0.02;
          particle.style.transform = `${currentTransform} translate(${translateX}px, ${translateY}px)`;
        }
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  initTypewriter() {
    if (!this.subtitle) return;

    const text = this.subtitle.textContent;
    this.subtitle.textContent = '';
    this.subtitle.style.borderRight = '2px solid var(--cp-cyan)';

    let i = 0;
    const speed = 30;

    const type = () => {
      if (i < text.length) {
        this.subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed + Math.random() * 20);
      } else {
        // Blinking cursor
        setInterval(() => {
          this.subtitle.style.borderRightColor =
            this.subtitle.style.borderRightColor === 'transparent' ? 'var(--cp-cyan)' : 'transparent';
        }, 530);
      }
    };

    // Start after hero animations
    setTimeout(type, 1800);
  }

  observeStats() {
    if (this.stats.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.stats.forEach(stat => observer.observe(stat));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(animate);
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}