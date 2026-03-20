/* ============================================
   MATRIX RAIN — Falling Code Animation
   ============================================ */

const MatrixRain = (() => {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return { init() {}, destroy() {} };

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let columns = [];
  let drops = [];
  let frameCount = 0;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|=+-*&^%$#@!';
  const charArray = chars.split('');
  const fontSize = 14;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () =>
      Math.random() * -100
    );
  }

  function draw() {
    frameCount++;

    // Only update every 3rd frame for a slower, more cinematic feel
    if (frameCount % 3 !== 0) {
      animationId = requestAnimationFrame(draw);
      return;
    }

    // Slower fade for longer trails
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // First character (head) is brighter
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#00ff41';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + Math.random() * 0.5})`;
        ctx.shadowBlur = 0;
      }

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillText(char, x, y);
      ctx.shadowBlur = 0;

      // Reset drops randomly or when off screen
      if (y > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  function destroy() {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  }

  return { init, destroy };
})();
