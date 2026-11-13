// ==========================================================================
// PROJECTS FILTER MODULE
// ==========================================================================

export class ProjectsFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.activeFilter = 'all';
    this.modal = null;
    this.projectData = this.getProjectData();
  }

  init() {
    if (this.filterButtons.length === 0 || this.projectCards.length === 0) return;

    this.bindEvents();
    this.initProjectCards();
    this.animateProjectsOnScroll();
  }

  getProjectData() {
    return {
      'ecommerce-dashboard': {
        title: 'E-Commerce Analytics Dashboard',
        category: 'Full Stack',
        description: 'Dashboard completo para e-commerce com métricas em tempo real, relatórios automatizados, gestão de inventário e integração com múltiplos gateways de pagamento. Inclui sistema de notificações, exportação de relatórios em PDF/Excel, e painel administrativo com controle de acesso baseado em roles.',
        longDescription: `Este projeto foi desenvolvido para uma empresa de varejo online que precisava centralizar dados de múltiplas fontes (Shopify, WooCommerce, mercado livre) em um único painel. A arquitetura utiliza Next.js 14 com App Router para SSR/SSG híbrido, garantindo SEO otimizado e performance excepcional.

**Principais desafios resolvidos:**
- Sincronização de dados em tempo real via WebSockets e Server-Sent Events
- Agregação de dados de 5+ APIs diferentes com rate limiting
- Sistema de cache inteligente com Redis para reduzir latência
- Autenticação e autorização com NextAuth.js (RBAC)
- Testes E2E com Cypress (cobertura 85%+)
- Deploy contínuo na Vercel com preview deployments`,
        tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind', 'Recharts', 'Stripe', 'Redis', 'NextAuth.js', 'Cypress'],
        features: [
          'Dashboard em tempo real com WebSockets',
          'Relatórios automatizados (PDF/Excel)',
          'Gestão de inventário multi-canal',
          'Integração Stripe + Mercado Pago',
          'Sistema de notificações push/email',
          'RBAC com 4 níveis de permissão',
          'Dark/Light mode persistente',
          'PWA com offline support'
        ],
        metrics: [
          { label: 'Performance Score', value: '98/100' },
          { label: 'Bundle Size', value: '145 KB gzipped' },
          { label: 'LCP', value: '1.2s' },
          { label: 'Usuários Ativos', value: '10.000+' }
        ],
        links: {
          github: 'https://github.com/usuario/ecommerce-dashboard',
          demo: 'https://ecommerce-dashboard.demo.com',
          figma: 'https://figma.com/file/xxx'
        },
        images: [
          'assets/images/project-1-detail-1.jpg',
          'assets/images/project-1-detail-2.jpg'
        ]
      },
      'design-system': {
        title: 'Design System & Component Library',
        category: 'Frontend',
        description: 'Biblioteca de componentes acessíveis, themeable e documentada com Storybook. 60+ componentes, tokens de design, dark mode nativo e testes visuais automatizados. Usada por 5+ times em produção.',
        longDescription: `Design system criado do zero para padronizar a UI across múltiplos produtos da empresa. Baseado em Atomic Design, com tokens de design (cores, espaçamento, tipografia, sombras) exportados como JSON e CSS-in-JS.

**Destaques técnicos:**
- 60+ componentes React com TypeScript strict
- Theme provider com suporte a múltiplos temas
- Storybook com Chromatic para visual regression testing
- Testes unitários com Vitest + React Testing Library
- Acessibilidade WCAG 2.1 AA em todos componentes
- Bundle otimizado com tree-shaking (ESM + CJS)
- Documentação automática com TypeDoc`,
        tech: ['React', 'TypeScript', 'Storybook', 'Tailwind', 'Vitest', 'Chromatic', 'TypeDoc', 'Changesets'],
        features: [
          '60+ componentes acessíveis',
          'Tokens de design multiplataforma',
          'Dark mode nativo (CSS variables)',
          'Visual regression testing',
          'Publicação automática no NPM',
          'Migração codemods para updates',
          'Suporte a React 18+ concurrent features',
          'Bundle size < 50KB gzipped'
        ],
        metrics: [
          { label: 'Componentes', value: '60+' },
          { label: 'Cobertura de Testes', value: '92%' },
          { label: 'Times Adotando', value: '5+' },
          { label: 'Downloads/semana', value: '2.5k+' }
        ],
        links: {
          github: 'https://github.com/usuario/design-system',
          demo: 'https://design-system.demo.com',
          npm: 'https://npmjs.com/package/@usuario/design-system'
        },
        images: [
          'assets/images/project-2-detail-1.jpg'
        ]
      },
      'microservices-platform': {
        title: 'Microservices Architecture Platform',
        category: 'Backend',
        description: 'Plataforma de microserviços com service mesh, observabilidade completa, circuit breakers, rate limiting e deploy blue-green automatizado em Kubernetes. Processa 1M+ req/dia.',
        longDescription: `Plataforma backend construída para escalar de 10k para 1M+ requisições/dia. Arquitetura baseada em Domain-Driven Design com 12 microserviços independentes comunicando via gRPC e mensageria assíncrona (Kafka).

**Arquitetura:**
- Service Mesh com Istio (mTLS, traffic splitting, retries)
- API Gateway com Kong (rate limiting, auth, logging)
- Observabilidade: Prometheus + Grafana + Jaeger (distributed tracing)
- CI/CD: GitLab CI com ArgoCD (GitOps)
- Database per service: PostgreSQL, MongoDB, Redis
- Event-driven com Kafka para eventual consistency`,
        tech: ['Go', 'gRPC', 'Kubernetes', 'Istio', 'Prometheus', 'Grafana', 'Jaeger', 'Kafka', 'Kong', 'ArgoCD'],
        features: [
          '12 microserviços independentes',
          'Service mesh com mTLS automático',
          'Distributed tracing (Jaeger)',
          'Blue-green deployments',
          'Circuit breakers + retries',
          'Rate limiting adaptativo',
          'Chaos engineering ready',
          'Multi-region deployment'
        ],
        metrics: [
          { label: 'Throughput', value: '1M+ req/dia' },
          { label: 'Latência P99', value: '< 150ms' },
          { label: 'Uptime', value: '99.99%' },
          { label: 'Deploy Frequency', value: '50+/dia' }
        ],
        links: {
          github: 'https://github.com/usuario/microservices-platform'
        },
        images: [
          'assets/images/project-3-detail-1.jpg',
          'assets/images/project-3-detail-2.jpg'
        ]
      },
      'realtime-collab': {
        title: 'Real-time Collaboration Platform',
        category: 'Full Stack',
        description: 'Aplicação de colaboração em tempo real com edição simultânea, presença de usuários, comentários, versionamento e sincronização offline-first via CRDTs.',
        longDescription: `Editor colaborativo estilo Google Docs/Figma construído com CRDTs (Yjs) para sincronização conflict-free. Suporte a edição offline com merge automático ao reconectar.

**Tecnologias-chave:**
- Yjs para CRDT-based sync
- WebRTC para peer-to-peer (com fallback WebSocket)
- IndexedDB para persistência offline
- Operational Transform fallback para legados
- Presence awareness com cursores coloridos
- Comentários anchored a posições do documento
- História de versões com time-travel`,
        tech: ['React', 'Yjs', 'WebRTC', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'IndexedDB'],
        features: [
          'Edição simultânea sem conflitos',
          'Offline-first com sync automático',
          'Presença de usuários em tempo real',
          'Comentários contextuais',
          'Versionamento com time-travel',
          'Export PDF/Markdown/HTML',
          'Permissões por documento',
          'Plugins extensíveis'
        ],
        metrics: [
          { label: 'Usuários Simultâneos', value: '500+' },
          { label: 'Latência Sync', value: '< 50ms' },
          { label: 'Offline Support', value: '100%' },
          { label: 'Conflitos', value: '0 (CRDT)' }
        ],
        links: {
          github: 'https://github.com/usuario/realtime-collab',
          demo: 'https://collab.demo.com'
        },
        images: [
          'assets/images/project-4-detail-1.jpg'
        ]
      },
      'cli-tool': {
        title: 'CLI Toolkit for Dev Productivity',
        category: 'Open Source',
        description: 'Ferramenta de linha de comando para automação de tarefas repetitivas: scaffolding, linting, deploy, migrações e geração de documentação. 2.5k+ stars no GitHub.',
        longDescription: `CLI construída para acelerar workflows de desenvolvimento. Plugin system permite extensibilidade. Publicada no NPM com auto-update notifications.

**Comandos principais:**
- \`init\`: Scaffolding de projetos (React, Node, Go, Python)
- \`generate\`: Componentes, hooks, APIs, testes
- \`lint\`: Linting unificado (ESLint, Stylelint, Markdownlint)
- \`deploy\`: Deploy para Vercel, AWS, Docker, Kubernetes
- \`migrate\`: Database migrations com rollback
- \`docs\`: Geração de docs API (OpenAPI) e componentes`,
        tech: ['Node.js', 'TypeScript', 'Commander.js', 'Inquirer', 'Chalk', 'ESLint', 'Plop', 'Semantic Release'],
        features: [
          'Scaffolding multi-framework',
          'Plugin system extensível',
          'Auto-update notifications',
          'Configuração via .rc file',
          'Shell completions (bash/zsh/fish)',
          'Telemetria opcional e anônima',
          'Testes unitários (90%+ coverage)',
          'Release automático (semantic-release)'
        ],
        metrics: [
          { label: 'GitHub Stars', value: '2.5k+' },
          { label: 'NPM Downloads/semana', value: '15k+' },
          { label: 'Contribuidores', value: '40+' },
          { label: 'Plugins Comunitários', value: '25+' }
        ],
        links: {
          github: 'https://github.com/usuario/cli-tool',
          npm: 'https://npmjs.com/package/@usuario/cli-tool'
        },
        images: [
          'assets/images/project-5-detail-1.jpg'
        ]
      },
      '3d-portfolio': {
        title: 'Immersive 3D Portfolio Website',
        category: 'Frontend',
        description: 'Portfolio interativo com Three.js, shaders customizados, partículas GPU, animações baseadas em scroll e performance otimizada para 60fps em dispositivos móveis.',
        longDescription: `Portfolio experimental explorando WebGL/Three.js no limite. Renderização baseada em shaders GLSL para efeitos visuais únicos, com fallback gracioso para dispositivos menos potentes.

**Técnicas avançadas:**
- Shaders GLSL customizados (vertex + fragment)
- GPU Particles com BufferGeometry (10k+ partículas)
- Post-processing: Bloom, Chromatic Aberration, Noise
- Scroll-triggered animations com GSAP ScrollTrigger
- Level of Detail (LOD) para performance móvel
- Texture streaming progressiva
- Web Workers para física de partículas`,
        tech: ['Three.js', 'React Three Fiber', 'GLSL', 'GSAP', 'Vite', 'TypeScript', 'Zustand'],
        features: [
          'Cena 3D interativa completa',
          'Shaders GLSL customizados',
          '10k+ partículas GPU',
          'Post-processing pipeline',
          '60fps em mobile (LOD)',
          'Scroll-driven narrative',
          'Theme sync (CSS + WebGL)',
          'Acessibilidade (reduced motion)'
        ],
        metrics: [
          { label: 'FPS (Desktop)', value: '60' },
          { label: 'FPS (Mobile)', value: '55+' },
          { label: 'Bundle (gzipped)', value: '280 KB' },
          { label: 'Lighthouse', value: '95/100' }
        ],
        links: {
          github: 'https://github.com/usuario/3d-portfolio',
          demo: 'https://3d-portfolio.demo.com'
        },
        images: [
          'assets/images/project-6-detail-1.jpg',
          'assets/images/project-6-detail-2.jpg'
        ]
      }
    };
  }

  bindEvents() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filterProjects(button.dataset.filter, button));
    });

    this.projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-link')) {
          this.openProjectModal(card);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openProjectModal(card);
        }
      });
    });

    // Project links
    document.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  filterProjects(filter, clickedButton) {
    if (filter === this.activeFilter) return;

    this.activeFilter = filter;

    this.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
      btn.setAttribute('aria-selected', btn.dataset.filter === filter);
    });

    this.projectCards.forEach((card, index) => {
      const matches = filter === 'all' || card.dataset.category === filter;

      if (matches) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, index * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  initProjectCards() {
    this.projectCards.forEach(card => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, display 0.3s ease';
    });
  }

  animateProjectsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      observer.observe(projectsGrid);
    }
  }

  openProjectModal(card) {
    const projectKey = card.dataset.projectKey || this.getProjectKey(card);
    const data = this.projectData[projectKey];

    if (!data) return;

    this.createModal(data);
    this.showModal();
  }

  getProjectKey(card) {
    const title = card.querySelector('.project-title')?.textContent?.toLowerCase().replace(/\s+/g, '-');
    return title;
  }

  createModal(data) {
    // Remove existing modal
    const existing = document.getElementById('project-detail-modal');
    existing?.remove();

    const modal = document.createElement('div');
    modal.id = 'project-detail-modal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-project-title');

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 900px; max-height: 90vh;">
        <div class="modal-header">
          <h3 class="modal-title" id="modal-project-title">${data.title}</h3>
          <button class="modal-close" aria-label="Fechar detalhes do projeto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto; padding: var(--cp-space-6);">
          <div style="display: grid; gap: var(--cp-space-6);">
            <div>
              <span class="project-category" style="font-size: var(--cp-fs-sm);">${data.category}</span>
              <p style="margin-top: var(--cp-space-3); color: var(--cp-text-secondary); line-height: 1.7;">${data.longDescription}</p>
            </div>

            <div style="border-top: 1px solid var(--cp-border); padding-top: var(--cp-space-6);">
              <h4 style="color: var(--cp-cyan); margin-bottom: var(--cp-space-3); font-size: var(--cp-fs-lg);">Features Principais</h4>
              <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--cp-space-2); list-style: none;">
                ${data.features.map(f => `<li style="display: flex; align-items: center; gap: var(--cp-space-2); color: var(--cp-text-secondary);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cp-green)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>${f}</li>`).join('')}
              </ul>
            </div>

            <div style="border-top: 1px solid var(--cp-border); padding-top: var(--cp-space-6);">
              <h4 style="color: var(--cp-cyan); margin-bottom: var(--cp-space-3); font-size: var(--cp-fs-lg);">📊 Métricas</h4>
              <div class="grid grid-4" style="gap: var(--cp-space-4);">
                ${data.metrics.map(m => `
                  <div class="card" style="text-align: center; padding: var(--cp-space-4);">
                    <div style="font-family: var(--cp-font-display); font-size: var(--cp-fs-2xl); font-weight: 700; color: var(--cp-cyan);">${m.value}</div>
                    <div style="font-family: var(--cp-font-mono); font-size: var(--cp-fs-xs); color: var(--cp-text-muted); text-transform: uppercase;">${m.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="border-top: 1px solid var(--cp-border); padding-top: var(--cp-space-6);">
              <h4 style="color: var(--cp-cyan); margin-bottom: var(--cp-space-3); font-size: var(--cp-fs-lg);">Stack Tecnologica</h4>
              <div style="display: flex; flex-wrap: wrap; gap: var(--cp-space-2);">
                ${data.tech.map(t => `<span class="tech-tag" style="border-color: var(--cp-cyan); color: var(--cp-cyan);">${t}</span>`).join('')}
              </div>
            </div>

            <div style="border-top: 1px solid var(--cp-border); padding-top: var(--cp-space-6);">
              <h4 style="color: var(--cp-cyan); margin-bottom: var(--cp-space-3); font-size: var(--cp-fs-lg);">🔗 Links</h4>
              <div style="display: flex; flex-wrap: wrap; gap: var(--cp-space-3);">
                ${Object.entries(data.links).map(([key, url]) => `
                  <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                    ${key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Bind close events
    modal.querySelector('.modal-close')?.addEventListener('click', () => this.hideModal(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hideModal(modal);
    });

    // Trap focus
    this.trapFocus(modal);

    // ESC to close
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        this.hideModal(modal);
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);

    this.modal = modal;
  }

  showModal() {
    if (this.modal) {
      requestAnimationFrame(() => {
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
  }

  hideModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';

    setTimeout(() => {
      modal.remove();
      this.modal = null;
    }, 300);
  }

  trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    });
  }

  destroy() {
    this.hideModal(this.modal);
  }
}