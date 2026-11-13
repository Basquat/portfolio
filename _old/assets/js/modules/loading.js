// ==========================================================================
// LOADING SCREEN MODULE
// ==========================================================================

export class LoadingScreen {
  constructor() {
    this.screen = document.getElementById('loading-screen');
    this.progressBar = document.getElementById('loading-progress');
    this.percentText = document.getElementById('loading-percent');
    this.lines = this.screen?.querySelectorAll('.loading-line');
    this.startTime = performance.now();
    this.minDisplayTime = 1500; // Minimum time to show loading screen
    this.progress = 0;
    this.targetProgress = 0;
    this.animationFrame = null;
  }

  async init() {
    if (!this.screen) return;

    // Simulate loading progress
    this.simulateProgress();

    // Animate terminal lines
    this.animateLines();

    // Wait for minimum display time and assets
    await Promise.all([
      this.waitForMinTime(),
      this.waitForAssets(),
      this.waitForFonts()
    ]);

    // Complete progress
    this.targetProgress = 100;
    await this.animateToTarget();
  }

  simulateProgress() {
    const milestones = [
      { target: 15, delay: 100 },
      { target: 35, delay: 300 },
      { target: 55, delay: 500 },
      { target: 75, delay: 700 },
      { target: 90, delay: 900 },
    ];

    milestones.forEach((ms, i) => {
      setTimeout(() => {
        this.targetProgress = ms.target;
      }, ms.delay);
    });
  }

  animateLines() {
    this.lines?.forEach((line, index) => {
      line.style.animationDelay = `${index * 200}ms`;
    });
  }

  async animateToTarget() {
    return new Promise(resolve => {
      const animate = () => {
        const diff = this.targetProgress - this.progress;
        if (Math.abs(diff) > 0.5) {
          this.progress += diff * 0.15;
          this.updateDisplay();
          this.animationFrame = requestAnimationFrame(animate);
        } else {
          this.progress = this.targetProgress;
          this.updateDisplay();
          if (this.targetProgress >= 100) {
            resolve();
          } else {
            this.animationFrame = requestAnimationFrame(animate);
          }
        }
      };
      animate();
    });
  }

  updateDisplay() {
    if (this.progressBar) {
      this.progressBar.style.width = `${this.progress}%`;
    }
    if (this.percentText) {
      this.percentText.textContent = `${Math.round(this.progress)}%`;
    }
  }

  waitForMinTime() {
    return new Promise(resolve => {
      const elapsed = performance.now() - this.startTime;
      const remaining = Math.max(0, this.minDisplayTime - elapsed);
      setTimeout(resolve, remaining);
    });
  }

  waitForAssets() {
    return new Promise(resolve => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      let loaded = 0;
      const total = images.length;

      if (total === 0) {
        resolve();
        return;
      }

      images.forEach(img => {
        if (img.complete) {
          checkDone();
        } else {
          img.addEventListener('load', checkDone, { once: true });
          img.addEventListener('error', checkDone, { once: true });
        }
      });

      function checkDone() {
        loaded++;
        if (loaded >= total) resolve();
      }
    });
  }

  waitForFonts() {
    return document.fonts?.ready || Promise.resolve();
  }

  async hide() {
    if (!this.screen) return;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.screen.classList.add('hidden');

    // Wait for transition
    await new Promise(resolve => setTimeout(resolve, 500));

    this.screen.style.display = 'none';
    this.screen.setAttribute('aria-hidden', 'true');

    // Trigger entrance animations
    document.body.classList.add('loaded');
    window.dispatchEvent(new CustomEvent('portfolio:loaded'));
  }
}