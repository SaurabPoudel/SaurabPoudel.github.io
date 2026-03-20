/* ============================================
   MAIN — Orchestrator & Data
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Enable Sound on First Interaction ───
  document.addEventListener('click', () => SFX.enable(), { once: true });
  document.addEventListener('keydown', () => SFX.enable(), { once: true });

  // ─── Boot Sequence ───
  runBootSequence().then(() => {
    initSite();
  });
});

/* ════════════════════════════════════════════
   BOOT SEQUENCE
   ════════════════════════════════════════════ */
function runBootSequence() {
  return new Promise((resolve) => {
    const loader = document.getElementById('boot-loader');
    const linesContainer = document.getElementById('boot-lines');
    const progressBar = document.getElementById('boot-progress-bar');
    const statusEl = document.getElementById('boot-status');

    const bootMessages = [
      '[BIOS]  Power-On Self Test... OK',
      '[BIOS]  Memory check: 16384 MB... OK',
      '[BOOT]  Loading kernel modules...',
      '[KERN]  Initializing network stack...',
      '[KERN]  Mounting encrypted filesystem...',
      '[INIT]  Starting security daemon...',
      '[AUTH]  Verifying credentials... AUTHORIZED',
      '[SYS ]  Loading portfolio modules...',
      '[NET ]  Establishing secure connection...',
      '[GPU ]  Initializing Matrix renderer...',
      '[TERM]  Launching interactive terminal...',
      '[SYS ]  Loading project files... DECRYPTED',
      '[SCAN]  Running capability analysis...',
      '[SYS ]  All subsystems operational.',
      '[BOOT]  System ready. Welcome, Operator.',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= bootMessages.length) {
        clearInterval(interval);
        statusEl.textContent = 'SYSTEM READY — ACCESS GRANTED';
        statusEl.style.color = '#00ff41';
        setTimeout(() => {
          loader.classList.add('hidden');
          SFX.playBoot();
          resolve();
        }, 600);
        return;
      }

      const line = document.createElement('div');
      line.classList.add('boot-line');
      line.textContent = bootMessages[i];

      // Color coding
      if (bootMessages[i].includes('OK') || bootMessages[i].includes('AUTHORIZED') || bootMessages[i].includes('ready')) {
        line.style.color = '#00ff41';
      } else if (bootMessages[i].includes('DECRYPTED')) {
        line.style.color = '#00e5ff';
      }

      linesContainer.appendChild(line);
      linesContainer.scrollTop = linesContainer.scrollHeight;

      const progress = ((i + 1) / bootMessages.length) * 100;
      progressBar.style.width = progress + '%';
      statusEl.textContent = bootMessages[i].split(']')[1]?.trim() || 'PROCESSING...';

      i++;
    }, 180);
  });
}

/* ════════════════════════════════════════════
   INIT ALL MODULES
   ════════════════════════════════════════════ */
function initSite() {
  // Show nav
  document.getElementById('main-nav').classList.remove('nav-hidden');

  // Init all modules
  MatrixRain.init();
  TypingEffect.init();
  Terminal.init();
  RadarChart.init();
  UptimeCounter.init();

  // Populate dynamic content
  populateProjects();
  populateSkills();

  // Set footer year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Init navigation
  initNavigation();

  // Init scroll animations
  ScrollAnimations.init();

  // Init contact form
  initContactForm();

  // Init project modals
  initProjectModals();

  // Active nav highlight on scroll
  initScrollSpy();
}

/* ════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════ */
function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ════════════════════════════════════════════
   PROJECT DATA & RENDERING
   ════════════════════════════════════════════ */
const projectsData = [
  {
    id: 'MODULE-001',
    classification: 'TOP SECRET',
    name: 'kv-store',
    desc: 'A high-performance, production-grade distributed key-value store implemented in Go, featuring a log-structured storage engine (LSM-tree), replication, and multi-protocol support.',
    tech: ['Go', 'LSM-Tree', 'Replication', 'Distributed Systems'],
    status: 'OPERATIONAL',
    stars: 1,
    link: 'https://github.com/SaurabPoudel/kv-store',
    details: {
      overview: 'A distributed key-value store built from scratch in Go, designed for high throughput and low-latency reads. Features a log-structured merge-tree storage engine.',
      features: [
        'Log-Structured Merge-tree (LSM) storage engine',
        'Write-Ahead Log (WAL) for crash recovery',
        'Data replication across multiple nodes',
        'Multi-protocol support (HTTP, gRPC)',
        'Compaction and garbage collection',
        'Production-grade error handling and logging',
      ],
    },
  },
  {
    id: 'MODULE-002',
    classification: 'CLASSIFIED',
    name: 'api-gateway',
    desc: 'Production-grade distributed API gateway and HTTP reverse proxy written in Go. Handles routing, rate limiting, and load balancing for microservice architectures.',
    tech: ['Go', 'HTTP', 'Reverse Proxy', 'Rate Limiting'],
    status: 'OPERATIONAL',
    stars: 0,
    link: 'https://github.com/SaurabPoudel/api-gateway',
    details: {
      overview: 'A lightweight yet powerful API gateway built in Go for managing traffic across distributed microservices with built-in observability.',
      features: [
        'Dynamic route configuration',
        'Rate limiting and throttling',
        'Load balancing across backends',
        'Request/response transformation',
        'Health checking and circuit breaking',
        'Middleware chain architecture',
      ],
    },
  },
  {
    id: 'MODULE-003',
    classification: 'RESTRICTED',
    name: 'IronTick',
    desc: 'A production-quality Rust project implementing a multiplayer deterministic 2D strategy game with authoritative server architecture.',
    tech: ['Rust', 'Game Server', 'Deterministic Sim', 'Networking'],
    status: 'OPERATIONAL',
    stars: 0,
    link: 'https://github.com/SaurabPoudel/IronTick',
    details: {
      overview: 'A multiplayer game engine built in Rust with deterministic simulation, authoritative server model, and client-side prediction for real-time strategy gameplay.',
      features: [
        'Deterministic lockstep simulation',
        'Authoritative server architecture',
        'Client-side prediction and reconciliation',
        'Fixed-point arithmetic for cross-platform consistency',
        'Entity Component System (ECS) game logic',
        'Low-latency networking with UDP',
      ],
    },
  },
  {
    id: 'MODULE-004',
    classification: 'CONFIDENTIAL',
    name: 'khoj-nepal',
    desc: 'A search and discovery platform for Nepal, built with TypeScript. Helps users find local services, businesses, and resources.',
    tech: ['TypeScript', 'Next.js', 'Full-Stack', 'Search'],
    status: 'DEPLOYED',
    stars: 0,
    link: 'https://github.com/SaurabPoudel/khoj-nepal',
    details: {
      overview: 'A full-stack search and discovery application tailored for Nepal, enabling users to find and connect with local services and businesses.',
      features: [
        'Full-text search with ranking',
        'Server-side rendering with Next.js',
        'Responsive mobile-first design',
        'Location-based filtering',
        'RESTful API backend',
        'Database integration with ORM',
      ],
    },
  },
  {
    id: 'MODULE-005',
    classification: 'RESTRICTED',
    name: 'nepali-date',
    desc: 'A JSR library for Nepali dates — provides accurate Bikram Sambat date conversions and utilities for the Nepali calendar system.',
    tech: ['TypeScript', 'JSR', 'Library', 'Date Processing'],
    status: 'PUBLISHED',
    stars: 0,
    link: 'https://github.com/SaurabPoudel/nepali-date',
    details: {
      overview: 'An open-source library published on JSR (JavaScript Registry) that handles Nepali Bikram Sambat date conversions with high accuracy.',
      features: [
        'Gregorian to Bikram Sambat conversion',
        'Bikram Sambat to Gregorian conversion',
        'Date formatting and parsing',
        'Published on JSR (@saurab/nepali-date)',
        'Full TypeScript type safety',
        '100+ years of date coverage',
      ],
    },
  },
  {
    id: 'MODULE-006',
    classification: 'TOP SECRET',
    name: 'slitherio-rust',
    desc: 'A multiplayer Slither.io clone built from scratch in Rust with real-time networking, game physics, and concurrent player handling.',
    tech: ['Rust', 'Game Dev', 'Multiplayer', 'Real-Time'],
    status: 'OPERATIONAL',
    stars: 0,
    link: 'https://github.com/SaurabPoudel/slitherio-rust',
    details: {
      overview: 'A real-time multiplayer snake game inspired by Slither.io, implemented entirely in Rust for maximum performance and safety.',
      features: [
        'Real-time multiplayer with WebSockets',
        'Spatial hashing for collision detection',
        'Server-authoritative game state',
        'Smooth client-side interpolation',
        'Dynamic food spawning system',
        'Concurrent player session management',
      ],
    },
  },
];

function populateProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projectsData.map((p, i) => `
    <div class="project-card" data-project-index="${i}" style="transition-delay: ${i * 0.1}s">
      <div class="project-header">
        <span class="project-classification">${p.classification}</span>
        <span class="project-id">${p.id}</span>
      </div>
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tech">
        ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="project-footer">
        <span class="project-status">
          <span class="status-dot"></span>
          ${p.status}${p.stars ? ` ★ ${p.stars}` : ''}
        </span>
        <a href="${p.link}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">[VIEW ON GITHUB →]</a>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════
   PROJECT MODALS
   ════════════════════════════════════════════ */
function initProjectModals() {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.classList.add('project-modal-overlay');
  overlay.id = 'project-modal-overlay';
  overlay.innerHTML = `
    <div class="project-modal" id="project-modal">
      <button class="modal-close" id="modal-close">[✕ CLOSE]</button>
      <div class="modal-decrypt-status" id="modal-decrypt-status"></div>
      <h3 class="modal-title" id="modal-title"></h3>
      <div class="modal-body" id="modal-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Event delegation for project cards
  const grid = document.getElementById('projects-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const index = parseInt(card.dataset.projectIndex, 10);
      openProjectModal(index);
      SFX.playGlitch();
    });
  }

  // Close modal
  document.getElementById('modal-close').addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

function openProjectModal(index) {
  const project = projectsData[index];
  if (!project) return;

  const overlay = document.getElementById('project-modal-overlay');
  const statusEl = document.getElementById('modal-decrypt-status');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');

  statusEl.textContent = `>>> Decrypting ${project.id}... ACCESS GRANTED`;
  titleEl.textContent = project.name;
  bodyEl.innerHTML = `
    <p>${project.details.overview}</p>
    <div style="margin-top:1rem">
      <span style="color: var(--clr-cyan); font-size: 0.82rem; letter-spacing: 1px;">KEY FEATURES:</span>
      <ul class="modal-features">
        ${project.details.features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-top:1rem">
      <span style="color: var(--clr-text-muted); font-size: 0.75rem;">TECH STACK: </span>
      <span style="color: var(--clr-cyan-dim); font-size: 0.82rem;">${project.tech.join(' · ')}</span>
    </div>
    <div style="margin-top:0.5rem">
      <span style="color: var(--clr-text-muted); font-size: 0.75rem;">STATUS: </span>
      <span style="color: var(--clr-green); font-size: 0.82rem;">${project.status}</span>
    </div>
    <div style="margin-top:1rem">
      <a href="${project.link}" target="_blank" rel="noopener" 
         style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;border:1px solid var(--clr-green);border-radius:4px;color:var(--clr-green);font-family:var(--font-mono);font-size:0.8rem;letter-spacing:1px;transition:all 0.3s ease;text-decoration:none;"
         onmouseover="this.style.background='rgba(0,255,65,0.12)';this.style.boxShadow='0 0 15px rgba(0,255,65,0.3)'"
         onmouseout="this.style.background='transparent';this.style.boxShadow='none'">
        ⌥ VIEW ON GITHUB
      </a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ════════════════════════════════════════════
   SKILLS DATA & RENDERING
   ════════════════════════════════════════════ */
const skillsData = [
  {
    title: 'PROGRAMMING LANGUAGES',
    icon: '⌨',
    color: 'fill-green',
    items: [
      { name: 'C / C++', level: 92 },
      { name: 'Rust', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 75 },
      { name: 'JavaScript', level: 70 },
    ],
  },
  {
    title: 'DOMAIN EXPERTISE',
    icon: '◈',
    color: 'fill-cyan',
    items: [
      { name: 'Computer Networking', level: 88 },
      { name: 'Distributed Systems', level: 83 },
      { name: 'Operating Systems', level: 82 },
      { name: 'Signal Processing', level: 78 },
      { name: 'Digital Electronics', level: 85 },
    ],
  },
  {
    title: 'TOOLS & PLATFORMS',
    icon: '⚙',
    color: 'fill-purple',
    items: [
      { name: 'Linux / Bash', level: 90 },
      { name: 'AWS Cloud', level: 75 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'Docker', level: 72 },
      { name: 'Terraform', level: 65 },
    ],
  },
];

function populateSkills() {
  const list = document.getElementById('skills-list');
  if (!list) return;

  list.innerHTML = skillsData.map((cat, ci) => `
    <div class="skill-category fade-in" style="transition-delay: ${ci * 0.15}s">
      <div class="skill-category-title">
        <span class="skill-category-icon">${cat.icon}</span>
        ${cat.title}
      </div>
      <div class="skill-items">
        ${cat.items.map((item) => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${item.name}</span>
              <span class="skill-level">${item.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill ${cat.color}" data-width="${item.level}%" style="width: 0%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════
   CONTACT FORM
   ════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="btn-icon">◎</span> ENCRYPTING...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span class="btn-icon">✓</span> MESSAGE TRANSMITTED';
      btn.style.borderColor = 'var(--clr-green)';
      btn.style.color = 'var(--clr-green)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    }, 1500);
  });
}
