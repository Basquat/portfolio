# Portfolio Cyberpunk 2077

Um portfolio de desenvolvedor Full Stack com tema **Cyberpunk 2077**, construído com HTML5, CSS3 e JavaScript vanilla (ES Modules). Totalmente funcional no GitHub Pages, responsivo, acessível e performático.



## Features Principais

### Design e Tema
- **Tema Cyberpunk 2077 autêntico** - Cores neon (cyan, magenta, amarelo), scanlines, glitch effects, grid perspective
- **Dark mode nativo** - Otimizado para preferência de sistema
- **Animações fluidas** - 60fps com `requestAnimationFrame`, IntersectionObserver para scroll reveal
- **Cursor customizado** - Com estados hover/click (desktop apenas)
- **Easter eggs** - Código Konami, modo Matrix, glitch no logo

### Responsividade
- **Mobile-first** - Breakpoints em 640px, 768px, 1024px, 1400px
- **Touch-friendly** - Áreas de toque mínimas 44x44px
- **Imagens responsivas** - `srcset` e `loading="lazy"`

### Acessibilidade (WCAG 2.1 AA)
- Semântica HTML5 correta
- ARIA labels e roles
- Navegação por teclado completa
- Focus visible personalizado
- `prefers-reduced-motion` suportado
- `prefers-contrast: high` suportado
- Screen reader friendly

### Performance
- **Zero dependências externas** (exceto Google Fonts)
- **CSS custom properties** para theming dinâmico
- **ES Modules** com importação estática
- **Lazy loading** nativo para imagens
- **Preload** de assets críticos
- **Service Worker ready** para PWA

### Funcionalidades
- **Hero animado** - Partículas, neon lines, typewriter, contadores
- **Filtro de skills** - Por categoria com animação
- **Filtro de projetos** - Com modal de detalhes rico
- **Formulário de contato** - Validação em tempo real, toast notifications
- **Scroll spy** - Nav ativa baseada na seção visível
- **Back to top** - Aparece após scroll
- **Loading screen** - Terminal style com progress bar

---

## Quick Start

### Opção 1: GitHub Pages (Recomendado)

1. **Fork/Clone este repositório**
   ```bash
   git clone https://github.com/seuusuario/portfolio.git
   cd portfolio
   ```

2. **Personalize** (veja seção [Personalização](#-personalização))

3. **Push para o GitHub**
   ```bash
   git add .
   git commit -m "feat: personalizo portfolio"
   git push origin main
   ```

4. **Ative GitHub Pages**
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / `/(root)`
   - Save

5. **Acesse** `https://seuusuario.github.io/portfolio/`

### Opção 2: Desenvolvimento Local

```bash
# Clone
git clone https://github.com/seuusuario/portfolio.git
cd portfolio

# Sirva com qualquer servidor estático
# Opção A: Python
python -m http.server 8000

# Opção B: Node.js (serve)
npx serve .

# Opção C: VS Code Live Server
# Clique direito no index.html → "Open with Live Server"

# Acesse http://localhost:8000
```

### Opção 3: Netlify / Vercel / Cloudflare Pages

Conecte o repositório - deploy automático funcionará out of the box.

---

## Personalizacao

### 1. Informações Básicas (`index.html`)

```html
<!-- Meta tags -->
<meta name="description" content="Sua descrição aqui">
<meta property="og:title" content="Seu Nome | Cargo">
<meta property="og:description" content="Descrição para redes sociais">
<meta property="og:image" content="assets/images/og-image.png">
<meta property="og:url" content="https://seuusuario.github.io/portfolio/">

<!-- Título -->
<title>Seu Nome | Cargo</title>

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
```

### 2. Hero Section

```html
<h1 class="hero-title">
  <span class="hero-title-line">OLÁ, SOU</span>
  <span class="hero-title-line hero-title-accent" data-text="SEU TÍTULO">SEU TÍTULO</span>
  <span class="hero-title-line">ESPECIALIDADE</span>
</h1>

<p class="hero-subtitle">
  Seu pitch pessoal aqui.<br>
  <strong>Tech Stack: React • Node.js • TypeScript • Cloud</strong>
</p>

<!-- Stats - altere data-count -->
<div class="stat-value" data-count="50">0</div>
```

### 3. Sobre Mim

```html
<p class="about-intro">
  Seu texto de apresentação...
</p>

<!-- Highlights - copie/cole para adicionar mais -->
<article class="highlight-item">
  <div class="highlight-icon">
    <svg>...</svg>
  </div>
  <div class="highlight-text">
    <h4>Título</h4>
    <p>Descrição</p>
  </div>
</article>

<!-- Tags de tecnologia -->
<span class="tag">React</span>
<span class="tag">TypeScript</span>
<!-- adicione/remova conforme necessário -->
```

### 4. Skills (`index.html` - seção skills)

```html
<!-- Cada skill card -->
<article class="skill-card" data-category="frontend" data-level="95">
  <div class="skill-icon">
    <svg>...</svg>
  </div>
  <h3 class="skill-name">React</h3>
  <div class="skill-level" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
    <div class="skill-level-bar" style="--level: 95%"></div>
  </div>
</article>

<!-- Categorias disponíveis: frontend, backend, devops, database, tools -->
```

### 5. Projetos (`index.html` - seção projects + `assets/js/modules/projects.js`)

**No HTML:**
```html
<article class="project-card" data-category="fullstack" data-project-key="meu-projeto">
  <div class="project-image">
    <img src="assets/images/meu-projeto.jpg" alt="Descrição do projeto" loading="lazy">
    <div class="project-overlay">
      <div class="project-links">
        <a href="https://github.com/seuusuario/repo" class="project-link" aria-label="GitHub">...</a>
        <a href="https://demo.com" class="project-link" aria-label="Demo">...</a>
      </div>
    </div>
  </div>
  <div class="project-content">
    <span class="project-category">Full Stack</span>
    <h3 class="project-title">Nome do Projeto</h3>
    <p class="project-description">Descrição curta...</p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
    </div>
  </div>
</article>
```

**No JavaScript (`assets/js/modules/projects.js` - método `getProjectData()`):**
```javascript
'meu-projeto': {
  title: 'Nome do Projeto',
  category: 'Full Stack',
  description: 'Descrição curta para o card',
  longDescription: `Descrição longa para o modal (suporta markdown-like)`,
  tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  metrics: [
    { label: 'Performance', value: '98/100' },
    { label: 'Usuários', value: '10k+' }
  ],
  links: {
    github: 'https://github.com/seuusuario/repo',
    demo: 'https://demo.com',
    figma: 'https://figma.com/file/xxx'
  },
  images: [
    'assets/images/projeto-detail-1.jpg',
    'assets/images/projeto-detail-2.jpg'
  ]
}
```

### 6. Experiência (`index.html` - seção experience)

```html
<article class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <div class="timeline-header">
      <div>
        <h3 class="timeline-role">Seu Cargo</h3>
        <p class="timeline-company">Empresa</p>
      </div>
      <time class="timeline-period" datetime="2022-03">Mar 2022 — Presente</time>
    </div>
    <p class="timeline-description">Descrição das responsabilidades e conquistas...</p>
    <div class="timeline-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">TypeScript</span>
    </div>
  </div>
</article>
```

### 7. Contato (`index.html` - seção contact)

```html
<!-- Email -->
<a href="mailto:seu@email.com" class="contact-method">...</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/seuusuario" class="contact-method">...</a>

<!-- GitHub -->
<a href="https://github.com/seuusuario" class="contact-method">...</a>

<!-- Redes sociais no footer -->
<a href="https://dev.to/seuusuario" class="social-link">...</a>
```

### 8. Cores & Tema (`assets/css/main.css` - `:root`)

```css
:root {
  /* Cores principais */
  --cp-cyan: #00ffff;
  --cp-magenta: #ff00ff;
  --cp-yellow: #ffff00;
  --cp-green: #00ff00;

  /* Fundos */
  --cp-bg-deep: #0a0a0f;
  --cp-bg-base: #0d0d14;
  --cp-bg-surface: #14141f;

  /* Textos */
  --cp-text-primary: #e8e8f0;
  --cp-text-secondary: #a0a0b8;

  /* Fontes */
  --cp-font-mono: 'JetBrains Mono', monospace;
  --cp-font-display: 'Rajdhani', sans-serif;
  --cp-font-ui: 'Inter', sans-serif;
}
```

### 9. Imagens

Substitua os placeholders em `assets/images/`:
- `about-photo.jpg` - Sua foto (400x500px recomendado)
- `project-1.jpg` a `project-6.jpg` - Thumbnails dos projetos (680x425px)
- `og-image.png` - Para redes sociais (1200x630px)
- `icon-*.png` - Ícones PWA (gere em https://favicon.io/)

---

## Estrutura do Projeto

```
portfolio/
├── index.html              # Página principal
├── 404.html                # Página de erro personalizada
├── CNAME                   # Domínio customizado (opcional)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deploy
├── assets/
│   ├── css/
│   │   └── main.css        # Estilos completos (~2000 linhas)
│   ├── js/
│   │   ├── main.js         # Entry point + app initialization
│   │   └── modules/
│   │       ├── loading.js      # Loading screen terminal
│   │       ├── cursor.js       # Custom cursor
│   │       ├── navigation.js   # Nav + mobile menu + scroll spy
│   │       ├── hero.js         # Hero animations
│   │       ├── scroll-reveal.js # IntersectionObserver reveal
│   │       ├── skills.js       # Skills filter + animations
│   │       ├── projects.js     # Projects filter + modal
│   │       ├── counter.js      # Animated counters
│   │       ├── contact.js      # Contact form + validation
│   │       ├── back-to-top.js  # Back to top button
│   │       ├── toast.js        # Toast notifications
│   │       ├── easter-eggs.js  # Konami, Matrix, glitch
│   │       └── modal.js        # Modal system
│   ├── fonts/              # Fontes locais (opcional)
│   └── images/             # Imagens do portfolio
└── README.md               # Este arquivo
```

---

## Scripts Uteis

```bash
# Validar HTML
npx htmlhint *.html

# Validar CSS
npx stylelint assets/css/*.css

# Verificar links quebrados
npx linkinator http://localhost:8000 --skip "mailto:,tel:"

# Lighthouse CI
npx lhci autorun

# Otimizar imagens
npx imagemin assets/images/* --out-dir=assets/images/optimized
```

---

## Deploy no GitHub Pages

### Configuração Automática (Incluída)

O arquivo `.github/workflows/deploy.yml` faz deploy automático no push para `main`.

### Configuração Manual

1. **Settings → Pages**
2. **Source**: "GitHub Actions"
3. **Workflow**: "Deploy to GitHub Pages"

### Domínio Customizado

1. Crie arquivo `CNAME` na raiz:
   ```
   portfolio.seudominio.com
   ```
2. Configure DNS:
   - Type: `CNAME`
   - Name: `portfolio` (ou `@` para apex)
   - Value: `seuusuario.github.io`
3. Enable "Enforce HTTPS" nas Pages settings

---

## Checklist de Acessibilidade

- [ ] Todos os `img` têm `alt` descritivo
- [ ] Formulários têm `label` associados
- [ ] Contraste de cores ≥ 4.5:1
- [ ] Focus visible em todos elementos interativos
- [ ] Navegação por teclado funciona
- [ ] `aria-label` em botões só com ícone
- [ ] `role="alert"` em toasts/status
- [ ] `prefers-reduced-motion` testado
- [ ] `prefers-contrast: high` testado
- [ ] Screen reader testado (NVDA/VoiceOver)

---

## Troubleshooting

### Imagens não carregam no GitHub Pages
- Verifique se paths são relativos (`assets/images/...` não `/assets/images/...`)
- GitHub Pages é case-sensitive: `Project-1.jpg` ≠ `project-1.jpg`

### CSS/JS não carrega
- Verifique se `main.css` e `main.js` estão commitados
- Cache do navegador: force refresh (Ctrl+Shift+R)

### Formulário não envia
- Substitua `submitForm()` em `contact.js` pela sua API real
- Configure CORS no backend se necessário

### Animações travam no mobile
- Reduza `particleCount` em `hero.js`
- Desative cursor customizado em `cursor.js` (já faz auto-detect)

### Fonte não carrega
- Adicione `font-display: swap` no `@font-face` ou use Google Fonts com `&display=swap`

---

## Licenca

MIT License - Sinta-se livre para usar, modificar e distribuir.

```text
Copyright (c) 2024 Seu Nome

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## Suporte

- **Issues**: [GitHub Issues](https://github.com/seuusuario/portfolio/issues)
- **Email**: dev@email.com
- **LinkedIn**: [linkedin.com/in/seuusuario](https://linkedin.com/in/seuusuario)

---

## Creditos

- **Fontes**: [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), [Rajdhani](https://fonts.google.com/specimen/Rajdhani), [Inter](https://fonts.google.com/specimen/Inter)
- **Ícones**: [Lucide](https://lucide.dev/) (SVG inline)
- **Inspiração**: Cyberpunk 2077, synthwave aesthetic, terminal UIs
- **Comunidade**: Devs que compartilham conhecimento open source

---

<div align="center">
  <strong>Feito com caffe e muito codigo</strong>
  <br>
  <sub>Se este portfolio te ajudou, deixe uma estrela no repositorio!</sub>
</div>