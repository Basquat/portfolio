// ==========================================================================
// EASTER EGGS MODULE
// ==========================================================================

export class EasterEggs {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    this.konamiIndex = 0;
    this.matrixMode = false;
    this.clickCount = 0;
    this.lastClickTime = 0;
    this.konamiActive = false;
  }

  init() {
    this.bindKonamiCode();
    this.bindMatrixMode();
    this.bindLogoClick();
    this.bindConsoleMessage();
  }

  bindKonamiCode() {
    document.addEventListener('keydown', (e) => {
      if (e.code === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        if (this.konamiIndex === this.konamiCode.length) {
          this.activateKonami();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  activateKonami() {
    if (this.konamiActive) return;

    this.konamiActive = true;
    document.body.classList.add('konami-active');

    // Show toast
    window.portfolio?.getModule('toast')?.success('MODO KONAMI ATIVADO!', {
      title: 'Easter Egg',
      duration: 4000
    });

    // Add rainbow effect to hero title
    const heroTitle = document.querySelector('.hero-title-accent');
    if (heroTitle) {
      heroTitle.style.animation = 'konami-rainbow 2s linear infinite';
    }

    // Add style for rainbow animation
    const style = document.createElement('style');
    style.id = 'konami-style';
    style.textContent = `
      @keyframes konami-rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .konami-active .hero-title-accent::after {
        content: 'GAME';
        animation: none;
      }
    `;
    document.head.appendChild(style);

    // Play sound (optional)
    this.playKonamiSound();

    // Deactivate after 30 seconds
    setTimeout(() => this.deactivateKonami(), 30000);
  }

  deactivateKonami() {
    this.konamiActive = false;
    document.body.classList.remove('konami-active');
    const style = document.getElementById('konami-style');
    style?.remove();

    const heroTitle = document.querySelector('.hero-title-accent');
    if (heroTitle) {
      heroTitle.style.animation = '';
    }
  }

  playKonamiSound() {
    // Create a simple beep using Web Audio API
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 523.25; // C5
      oscillator.type = 'square';
      gainNode.gain.value = 0.1;

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);

      // Play a little melody
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'square';
          gain.gain.value = 0.08;
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }, i * 150);
      });
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  bindMatrixMode() {
    // Triple-click on hero to activate matrix mode
    const hero = document.getElementById('hero');
    if (!hero) return;

    hero.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - this.lastClickTime < 500) {
        this.clickCount++;
      } else {
        this.clickCount = 1;
      }
      this.lastClickTime = now;

      if (this.clickCount >= 3) {
        this.toggleMatrixMode();
        this.clickCount = 0;
      }
    });
  }

  toggleMatrixMode() {
    this.matrixMode = !this.matrixMode;
    document.body.classList.toggle('matrix-mode', this.matrixMode);

    window.portfolio?.getModule('toast')?.info(
      this.matrixMode ? 'MODO MATRIX ATIVADO' : 'Modo Matrix desativado',
      { title: 'Easter Egg', duration: 3000 }
    );
  }

  bindLogoClick() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    let clickCount = 0;
    let lastClick = 0;

    logo.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastClick < 400) {
        clickCount++;
      } else {
        clickCount = 1;
      }
      lastClick = now;

      if (clickCount >= 5) {
        this.triggerGlitchEffect();
        clickCount = 0;
      }
    });
  }

  triggerGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.classList.add('text-glitch');
      heroTitle.setAttribute('data-text', heroTitle.textContent);

      setTimeout(() => {
        heroTitle.classList.remove('text-glitch');
        heroTitle.removeAttribute('data-text');
      }, 2000);
    }

    window.portfolio?.getModule('toast')?.info('GLITCH DETECTADO', {
      title: 'Sistema Instável',
      duration: 2000
    });
  }

  bindConsoleMessage() {
    // Fun console message for developers
    const styles = [
      'color: #00ffff',
      'font-size: 20px',
      'font-weight: bold',
      'text-shadow: 0 0 10px #00ffff'
    ].join(';');

    const styles2 = [
      'color: #ff00ff',
      'font-size: 14px',
      'font-family: monospace'
    ].join(';');

    console.log('%c◢ PORTFOLIO CYBERPUNK 2077 ◣', styles);
    console.log('%cSistema neural inicializado. Bem-vindo ao modo desenvolvedor.', styles2);
    console.log('%cDica: Tente o codigo Konami (cima cima baixo baixo esquerda direita esquerda direita B A) ou clique 3x no hero!', styles2);
    console.log('%cQuer contribuir? github.com/seuusuario/portfolio', styles2);
  }

  destroy() {
    // No cleanup needed for event listeners on document
  }
}