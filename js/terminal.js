/* ============================================
   INTERACTIVE TERMINAL
   ============================================ */

const Terminal = (() => {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  if (!output || !input) return { init() {} };

  const commandHistory = [];
  let historyIndex = -1;

  // ─── Command Definitions ───
  const commands = {
    help: {
      description: 'Show available commands',
      execute() {
        return [
          { type: 'system', text: 'Available commands:' },
          { type: 'divider' },
          { type: 'default', text: '  about       → System profile & bio' },
          { type: 'default', text: '  projects    → Classified project files' },
          { type: 'default', text: '  skills      → Capability scan results' },
          { type: 'default', text: '  contact     → Secure channel info' },
          { type: 'default', text: '  education   → Academic records' },
          { type: 'default', text: '  experience  → Work history' },
          { type: 'default', text: '  goals       → Current objectives' },
          { type: 'default', text: '  whoami      → Quick identity check' },
          { type: 'default', text: '  date        → Current timestamp' },
          { type: 'default', text: '  clear       → Wipe terminal output' },
          { type: 'default', text: '  neofetch    → System info display' },
          { type: 'default', text: '  sudo        → Try superuser mode...' },
          { type: 'default', text: '  exit        → Close terminal session' },
          { type: 'divider' },
          { type: 'warning', text: 'TIP: Try typing "sudo reveal" for secrets 🔓' },
        ];
      }
    },

    about: {
      description: 'Display bio',
      execute() {
        return [
          { type: 'system', text: '╔══════════════════════════════════════════╗' },
          { type: 'system', text: '║          SYSTEM PROFILE: LOADED          ║' },
          { type: 'system', text: '╚══════════════════════════════════════════╝' },
          { type: 'default', text: '' },
          { type: 'success', text: '  Name:       Saurab Poudel' },
          { type: 'default', text: '  Role:       Electronics & Communication Engineer' },
          { type: 'default', text: '  Focus:      VLSI Design | Signal Processing | Systems' },
          { type: 'default', text: '  Location:   Nepal' },
          { type: 'default', text: '' },
          { type: 'default', text: '  I build systems from first principles — from' },
          { type: 'default', text: '  transistor gates to cloud architectures.' },
          { type: 'default', text: '' },
          { type: 'default', text: '  Passionate about VLSI design, low-latency' },
          { type: 'default', text: '  engineering, and distributed systems.' },
          { type: 'default', text: '' },
          { type: 'default', text: '  Currently: Preparing for GATE exam + building' },
          { type: 'default', text: '  production-grade systems-level projects.' },
        ];
      }
    },

    projects: {
      description: 'List classified projects',
      execute() {
        return [
          { type: 'warning', text: '⚠ CLASSIFIED FILES — AUTHORIZED ACCESS ONLY' },
          { type: 'divider' },
          { type: 'success', text: '  [MODULE-001] kv-store' },
          { type: 'default', text: '    └─ Tech: Go, LSM-Tree, Distributed Systems' },
          { type: 'default', text: '    └─ Status: OPERATIONAL   ★ 1' },
          { type: 'default', text: '' },
          { type: 'success', text: '  [MODULE-002] api-gateway' },
          { type: 'default', text: '    └─ Tech: Go, HTTP, Reverse Proxy' },
          { type: 'default', text: '    └─ Status: OPERATIONAL' },
          { type: 'default', text: '' },
          { type: 'success', text: '  [MODULE-003] IronTick' },
          { type: 'default', text: '    └─ Tech: Rust, Game Server, Networking' },
          { type: 'default', text: '    └─ Status: OPERATIONAL' },
          { type: 'default', text: '' },
          { type: 'success', text: '  [MODULE-004] khoj-nepal' },
          { type: 'default', text: '    └─ Tech: TypeScript, Next.js, Full-Stack' },
          { type: 'default', text: '    └─ Status: DEPLOYED' },
          { type: 'default', text: '' },
          { type: 'success', text: '  [MODULE-005] nepali-date' },
          { type: 'default', text: '    └─ Tech: TypeScript, JSR Library' },
          { type: 'default', text: '    └─ Status: PUBLISHED' },
          { type: 'default', text: '' },
          { type: 'success', text: '  [MODULE-006] slitherio-rust' },
          { type: 'default', text: '    └─ Tech: Rust, Multiplayer, Real-Time' },
          { type: 'default', text: '    └─ Status: OPERATIONAL' },
          { type: 'divider' },
          { type: 'system', text: 'Scroll down to PROJECTS section for details.' },
        ];
      }
    },

    skills: {
      description: 'Show tech stack',
      execute() {
        return [
          { type: 'system', text: '>>> Running capability scan...' },
          { type: 'divider' },
          { type: 'success', text: '  ◈ PROGRAMMING' },
          { type: 'default', text: '    C++  ████████████████████░  92%' },
          { type: 'default', text: '    Rust ██████████████████░░░  85%' },
          { type: 'default', text: '    Py   █████████████████░░░░  80%' },
          { type: 'default', text: '    SQL  ████████████████░░░░░  75%' },
          { type: 'default', text: '' },
          { type: 'success', text: '  ◈ DOMAINS' },
          { type: 'default', text: '    Networking     ██████████████████░░  88%' },
          { type: 'default', text: '    OS Internals   █████████████████░░░  82%' },
          { type: 'default', text: '    Signal Proc.   ████████████████░░░░  78%' },
          { type: 'default', text: '    Dist. Systems  █████████████████░░░  83%' },
          { type: 'default', text: '' },
          { type: 'success', text: '  ◈ TOOLS' },
          { type: 'default', text: '    Linux | AWS | Git | Docker | Terraform' },
          { type: 'default', text: '    Wireshark | GDB | Valgrind | MATLAB' },
          { type: 'divider' },
          { type: 'system', text: 'Scan complete. All systems nominal.' },
        ];
      }
    },

    contact: {
      description: 'Show contact info',
      execute() {
        return [
          { type: 'system', text: '>>> Establishing secure channel...' },
          { type: 'success', text: '    Connection encrypted [AES-256-GCM]' },
          { type: 'divider' },
          { type: 'default', text: '  ✉  Email:    poudelsaurab20@gmail.com' },
          { type: 'default', text: '  ⌥  GitHub:   github.com/SaurabPoudel' },
          { type: 'default', text: '  ◉  LinkedIn: linkedin.com/in/saurab-poudel' },
          { type: 'default', text: '  ✕  X:        x.com/SaurabPoudel07' },
          { type: 'divider' },
          { type: 'system', text: 'Scroll down to CONTACT section to send a message.' },
        ];
      }
    },

    education: {
      description: 'Show academic records',
      execute() {
        return [
          { type: 'system', text: '>>> Decrypting academic records...' },
          { type: 'divider' },
          { type: 'success', text: '  ◈ DEGREE' },
          { type: 'default', text: '    B.E. in Electronics & Communication Engineering' },
          { type: 'default', text: '    Status: IN PROGRESS' },
          { type: 'default', text: '' },
          { type: 'success', text: '  ◈ PREPARATIONS' },
          { type: 'default', text: '    GATE Examination — Active preparation' },
          { type: 'default', text: '    Focus: ECE + CS core subjects' },
          { type: 'default', text: '' },
          { type: 'success', text: '  ◈ CORE SUBJECTS' },
          { type: 'default', text: '    Signal & Systems | Digital Electronics' },
          { type: 'default', text: '    Computer Networks | Microprocessors' },
          { type: 'default', text: '    Electromagnetic Theory | VLSI Design' },
          { type: 'default', text: '    Control Systems | Analog & Digital Circuits' },
        ];
      }
    },

    experience: {
      description: 'Work history',
      execute() {
        return [
          { type: 'system', text: '>>> Loading work history...' },
          { type: 'divider' },
          { type: 'default', text: '  Building production-grade personal projects' },
          { type: 'default', text: '  focused on systems-level engineering:' },
          { type: 'default', text: '' },
          { type: 'success', text: '  ► Low-latency server architectures' },
          { type: 'success', text: '  ► Network protocol implementations' },
          { type: 'success', text: '  ► Cloud infrastructure automation' },
          { type: 'success', text: '  ► Signal processing pipelines' },
          { type: 'default', text: '' },
          { type: 'system', text: '  Open to internship & full-time opportunities.' },
        ];
      }
    },

    goals: {
      description: 'Current objectives',
      execute() {
        return [
          { type: 'system', text: '>>> Mission Objectives:' },
          { type: 'divider' },
          { type: 'success', text: '  [ACTIVE]  Crack GATE with top percentile' },
          { type: 'success', text: '  [ACTIVE]  Master VLSI design & chip architecture' },
          { type: 'success', text: '  [ACTIVE]  Build production-grade systems portfolio' },
          { type: 'default', text: '  [QUEUED]  Contribute to major open-source projects' },
          { type: 'default', text: '  [QUEUED]  Research in signal processing & VLSI' },
          { type: 'default', text: '  [QUEUED]  Work on chip design at a leading firm' },
        ];
      }
    },

    whoami: {
      description: 'Quick identity',
      execute() {
        return [
          { type: 'success', text: 'saurab_poudel — Electronics Engineer | Systems Builder' },
        ];
      }
    },

    date: {
      description: 'Current timestamp',
      execute() {
        const now = new Date();
        return [
          { type: 'success', text: `  ${now.toUTCString()}` },
          { type: 'default', text: `  Unix: ${Math.floor(now.getTime() / 1000)}` },
        ];
      }
    },

    clear: {
      description: 'Clear terminal',
      execute() {
        output.innerHTML = '';
        return [];
      }
    },

    neofetch: {
      description: 'System info',
      execute() {
        return [
          { type: 'success', text: '       ██████████       saurab@portfolio' },
          { type: 'success', text: '     ██          ██     ──────────────────' },
          { type: 'success', text: '   ██    ██████    ██   OS:      HackerOS v2.0' },
          { type: 'success', text: '  ██   ██      ██   ██  Host:    saurabpoudel.io' },
          { type: 'success', text: '  ██   ██  SP  ██   ██  Kernel:  Portfolio 2.0' },
          { type: 'success', text: '  ██   ██      ██   ██  Shell:   /bin/hacker' },
          { type: 'success', text: '   ██    ██████    ██   Theme:   Cyberpunk [dark]' },
          { type: 'success', text: '     ██          ██     Terminal: xterm-256color' },
          { type: 'success', text: '       ██████████       CPU:     Neural Engine v3' },
          { type: 'default', text: '' },
          { type: 'default', text: '  ████████████████████████████████' },
        ];
      }
    },

    exit: {
      description: 'Close session',
      execute() {
        return [
          { type: 'warning', text: '  Session terminated. Goodbye, operator.' },
          { type: 'system', text: '  (Just kidding — you can\'t escape this easily 😏)' },
        ];
      }
    },

    sudo: {
      description: 'Superuser mode',
      execute(args) {
        if (args === 'reveal') {
          return [
            { type: 'warning', text: '  🔓 SUPERUSER ACCESS GRANTED' },
            { type: 'divider' },
            { type: 'success', text: '  ◈ SECRET LOG — Easter Egg Found!' },
            { type: 'default', text: '' },
            { type: 'default', text: '  "The best code is the code that doesn\'t need to exist."' },
            { type: 'default', text: '    — Saurab Poudel, probably' },
            { type: 'default', text: '' },
            { type: 'default', text: '  Fun Fact: This site was built with zero frameworks,' },
            { type: 'default', text: '  just raw HTML, CSS, and JavaScript.' },
            { type: 'default', text: '  Because real hackers don\'t need React. 🔥' },
            { type: 'default', text: '' },
            { type: 'system', text: '  Congrats! You found the secret. Try "matrix" next.' },
          ];
        }
        return [
          { type: 'error', text: '  [sudo] permission denied. Nice try, operator.' },
          { type: 'system', text: '  Hint: Try "sudo reveal" for a surprise.' },
        ];
      }
    },

    matrix: {
      description: 'Enter the Matrix',
      execute() {
        // Intensify matrix rain temporarily
        const matrixCanvas = document.getElementById('matrix-canvas');
        if (matrixCanvas) {
          matrixCanvas.style.transition = 'opacity 0.5s ease';
          matrixCanvas.style.opacity = '0.5';
          setTimeout(() => { matrixCanvas.style.opacity = '0.12'; }, 4000);
        }
        return [
          { type: 'success', text: '  ▒▒▒ ENTERING THE MATRIX ▒▒▒' },
          { type: 'default', text: '' },
          { type: 'default', text: '  "Unfortunately, no one can be told what' },
          { type: 'default', text: '   the Matrix is. You have to see it for' },
          { type: 'default', text: '   yourself."' },
          { type: 'default', text: '' },
          { type: 'system', text: '  Matrix rain intensified for 4 seconds...' },
        ];
      }
    },

    hack: {
      description: 'Hack the planet',
      execute() {
        return [
          { type: 'success', text: '  >>> Initiating hack sequence...' },
          { type: 'default', text: '  [██████████████████████] 100%' },
          { type: 'default', text: '' },
          { type: 'warning', text: '  ⚠ ACCESS TO PLANET MAINFRAME: DENIED' },
          { type: 'system', text: '  Nice try. But this isn\'t a movie. 😄' },
          { type: 'default', text: '  You are welcome to explore the portfolio though!' },
        ];
      }
    },
  };

  // ─── Core Functions ───
  function addLine(type, text) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');

    if (type === 'divider') {
      line.classList.add('terminal-divider');
      line.textContent = '═══════════════════════════════════════════';
    } else if (type === 'command') {
      line.innerHTML = `<span class="terminal-prompt">saurab@portfolio:~$ </span>${escapeHTML(text)}`;
    } else {
      const spanClass = type === 'system' ? 'terminal-system'
        : type === 'success' ? 'terminal-success'
        : type === 'error' ? 'terminal-error'
        : type === 'warning' ? 'terminal-warning'
        : '';

      if (spanClass) {
        line.innerHTML = `<span class="${spanClass}">${escapeHTML(text)}</span>`;
      } else {
        line.textContent = text;
      }
    }

    output.appendChild(line);
    scrollToBottom();
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Echo command
    addLine('command', trimmed);

    const parts = trimmed.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1).join(' ');

    if (commands[cmd]) {
      const result = commands[cmd].execute(args);
      // Animate output lines with delay
      result.forEach((line, i) => {
        setTimeout(() => {
          addLine(line.type, line.text);
        }, i * 30);
      });
    } else {
      setTimeout(() => {
        addLine('error', `  Command not found: ${cmd}`);
        addLine('system', '  Type "help" for available commands.');
      }, 50);
    }
  }

  function init() {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        processCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
      }
    });

    // Focus terminal input when clicking terminal body
    terminalBody.addEventListener('click', () => {
      input.focus();
    });
  }

  return { init };
})();
