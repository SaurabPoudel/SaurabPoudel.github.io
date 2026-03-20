/* ============================================
   EFFECTS — Typing, Radar, Sound, Glitch
   ============================================ */

/* ─── Typing Effect ─── */
const TypingEffect = (() => {
  const phrases = [
    'Electronics Engineer | VLSI Design | Systems Builder',
    'Signal Processing | Low-Latency Systems',
    'From Transistors to Cloud Architecture',
    'GATE Aspirant | Building Systems from First Principles',
    'VLSI Design | Distributed Computing | Networking',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let element = null;

  function type() {
    if (!element) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  function init() {
    element = document.getElementById('hero-subtitle');
    if (element) {
      setTimeout(type, 1000);
    }
  }

  return { init };
})();

/* ─── Radar Chart ─── */
const RadarChart = (() => {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return { init() {}, animate() {} };
  const ctx = canvas.getContext('2d');

  const skills = [
    { label: 'C++', value: 92 },
    { label: 'Rust', value: 85 },
    { label: 'Network', value: 88 },
    { label: 'OS', value: 82 },
    { label: 'Signal', value: 78 },
    { label: 'Python', value: 80 },
    { label: 'Cloud', value: 75 },
    { label: 'Systems', value: 83 },
  ];

  let animProgress = 0;
  let animId = null;
  let hasAnimated = false;

  function drawRadar(progress) {
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.parentElement.offsetWidth, 400);
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.38;
    const levels = 5;
    const n = skills.length;
    const angleStep = (2 * Math.PI) / n;

    ctx.clearRect(0, 0, size, size);

    // Draw grid rings
    for (let l = 1; l <= levels; l++) {
      const r = (maxR / levels) * l;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 255, 65, ${0.08 + l * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axis lines
    for (let i = 0; i < n; i++) {
      const angle = angleStep * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = angleStep * idx - Math.PI / 2;
      const r = (skills[idx].value / 100) * maxR * progress;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    gradient.addColorStop(0, 'rgba(0, 255, 65, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 229, 255, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.7)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw data points
    for (let i = 0; i < n; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const r = (skills[i].value / 100) * maxR * progress;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff41';
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw labels
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const labelR = maxR + 22;
      const x = cx + labelR * Math.cos(angle);
      const y = cy + labelR * Math.sin(angle);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
      ctx.fillText(skills[i].label, x, y);
    }
  }

  function animate() {
    if (hasAnimated) return;
    hasAnimated = true;
    animProgress = 0;

    function step() {
      animProgress += 0.025;
      if (animProgress > 1) animProgress = 1;
      drawRadar(animProgress);
      if (animProgress < 1) {
        animId = requestAnimationFrame(step);
      }
    }
    step();
  }

  function init() {
    drawRadar(0);
    window.addEventListener('resize', () => {
      drawRadar(hasAnimated ? 1 : 0);
    });
  }

  return { init, animate };
})();

/* ─── Sound Effects (Web Audio API synthesized) ─── */
const SFX = (() => {
  let audioCtx = null;
  let enabled = false;

  function getCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playKeypress() {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) { /* silent fail */ }
  }

  function playBoot() {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) { /* silent fail */ }
  }

  function playGlitch() {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      source.connect(gain).connect(ctx.destination);
      source.start(ctx.currentTime);
    } catch (e) { /* silent fail */ }
  }

  function enable() {
    enabled = true;
    getCtx(); // Initialize on user gesture
  }

  return { playKeypress, playBoot, playGlitch, enable };
})();

/* ─── Intersection Observer for Animations ─── */
const ScrollAnimations = (() => {
  function init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger radar animation when skills section is visible
            if (entry.target.closest('#skills')) {
              RadarChart.animate();
              // Animate skill bars
              entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
                const width = bar.dataset.width;
                setTimeout(() => {
                  bar.style.width = width;
                  bar.classList.add('animated');
                }, 200);
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in, .project-card, .skill-category').forEach((el) => {
      observer.observe(el);
    });
  }

  return { init };
})();

/* ─── Uptime Counter ─── */
const UptimeCounter = (() => {
  let startTime = Date.now();
  let element = null;

  function update() {
    if (!element) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    element.textContent = `${h}:${m}:${s}`;
    requestAnimationFrame(update);
  }

  function init() {
    element = document.getElementById('uptime-counter');
    if (element) update();
  }

  return { init };
})();
