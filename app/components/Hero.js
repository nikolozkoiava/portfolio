'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function LoopingText({ text, delay = 800 }) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let timeout;

    if (!isDeleting && displayed === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayed === '') {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
        setGlowPulse(true);
        setTimeout(() => setGlowPulse(false), 200);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, text, started]);

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span
        style={{
          position: 'relative',
          textShadow: glowPulse
            ? '0 0 20px rgba(245, 158, 11, 0.6), 0 0 40px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.1)'
            : '0 0 8px rgba(245, 158, 11, 0.2)',
          transition: 'text-shadow 0.2s ease-out',
        }}
      >
        {displayed}
      </span>
      <span
        className="cursor-blink"
        style={{
          color: '#f59e0b',
          fontSize: '0.7em',
          verticalAlign: 'middle',
          textShadow: glowPulse
            ? '0 0 12px rgba(245, 158, 11, 0.8)'
            : '0 0 4px rgba(245, 158, 11, 0.3)',
          transition: 'text-shadow 0.15s ease-out',
        }}
      >
        |
      </span>
    </span>
  );
}

function TerminalLine({ line, delay }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const full = line.key + ': ' + line.val;
      let i = 0;
      const interval = setInterval(() => {
        setText(full.slice(0, i + 1));
        i++;
        if (i >= full.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [line, delay]);

  const parts = text.split(':');

  return (
    <p style={{ marginLeft: 16 }}>
      <span style={{ color: '#f59e0b', fontWeight: 700 }}>{parts[0]}</span>
      {text.includes(':') && (
        <>
          <span style={{ color: '#555' }}>: </span>
          <span style={{ color: line.accent ? '#4ade80' : '#ccc' }}>
            {parts.slice(1).join(':').trimStart()}
          </span>
        </>
      )}
    </p>
  );
}

const TERMINAL_LINES = [
  { key: 'name', val: 'Nikoloz Koiava' },
  { key: 'role', val: 'IT support · automation · devops' },
  { key: 'based', val: 'tbilisi, georgia' },
  { key: 'status', val: '● transitioning to devops', accent: true },
];

export default function Hero() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowTerminal(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  function runCommand(e) {
    if (e.key !== 'Enter') return;
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    }

    // Easter egg commands
    if (cmd === 'sudo hire me') {
      setHistory((prev) => [...prev, { command: cmd, output: '⚡ ACCESS GRANTED — nikoloz.exe is ready to deploy! Contact: nikakoiava07@gmail.com' }]);
      setCommand('');
      // Trigger visual effect
      try {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:999997;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.9);backdrop-filter:blur(12px);';
        overlay.innerHTML = '<div style="text-align:center;font-family:var(--mono)"><p style="color:#22c55e;font-size:14px;margin-bottom:16px">$ sudo hire me</p><p style="color:#f59e0b;font-size:48px;font-weight:700;margin-bottom:8px">ACCESS GRANTED ⚡</p><p style="color:#888;font-size:16px;margin-bottom:32px">nikoloz.exe is ready to deploy</p><p style="color:#555;font-size:13px">nikakoiava07@gmail.com</p><p style="color:#444;font-size:11px;margin-top:24px">click anywhere to close</p></div>';
        overlay.onclick = function() { overlay.style.opacity = '0'; overlay.style.transition = 'opacity 0.3s'; setTimeout(function() { document.body.removeChild(overlay); }, 300); };
        document.body.appendChild(overlay);
      } catch(err) {}
      return;
    }

    if (cmd === 'matrix') {
      setHistory((prev) => [...prev, { command: cmd, output: '◉ Entering the Matrix...' }]);
      setCommand('');
      try {
        var c = document.createElement('canvas');
        c.style.cssText = 'position:fixed;inset:0;z-index:999997;pointer-events:none;';
        c.width = window.innerWidth; c.height = window.innerHeight;
        document.body.appendChild(c);
        var cx = c.getContext('2d');
        var cols = Math.floor(c.width / 16);
        var drops = []; for (var di = 0; di < cols; di++) drops[di] = Math.random() * -50;
        var chars = 'ニコロズ01アウトメーション'; var fr = 0;
        function drawMatrix() {
          cx.fillStyle = 'rgba(0,0,0,0.05)'; cx.fillRect(0,0,c.width,c.height);
          cx.font = '14px monospace';
          for (var mi = 0; mi < drops.length; mi++) {
            cx.fillStyle = Math.random() > 0.9 ? '#fff' : 'rgba(245,158,11,' + (0.4 + Math.random() * 0.6) + ')';
            cx.fillText(chars[Math.floor(Math.random() * chars.length)], mi * 16, drops[mi] * 16);
            if (drops[mi] * 16 > c.height && Math.random() > 0.975) drops[mi] = 0;
            drops[mi]++;
          }
          fr++;
          if (fr < 180) { requestAnimationFrame(drawMatrix); }
          else { var op = 1; (function fade() { c.style.opacity = op; op -= 0.02; if (op > 0) requestAnimationFrame(fade); else document.body.removeChild(c); })(); }
        }
        drawMatrix();
      } catch(err) {}
      return;
    }

    if (cmd === 'coffee') {
      setHistory((prev) => [...prev, { command: cmd, output: '    ( (\n     ) )\n  .______.\n  |      |]\n  \\      /\n   `----\'\n ☕ Here\'s your coffee!' }]);
      setCommand('');
      return;
    }

    if (cmd === 'hack') {
      setHistory((prev) => [...prev, { command: cmd, output: '[▓▓▓▓▓▓▓▓▓▓] 100% — HACKED! just kidding 😄' }]);
      setCommand('');
      return;
    }

    if (cmd === 'whoami') {
      setHistory((prev) => [...prev, { command: cmd, output: 'nikoloz — uid=1000(niko) gid=1000(devops) groups=1000(devops),27(sudo),999(docker)' }]);
      setCommand('');
      return;
    }

    if (cmd === 'uptime') {
      var days = Math.floor((Date.now() - new Date('2025-01-01')) / 86400000);
      setHistory((prev) => [...prev, { command: cmd, output: 'up ' + days + ' days, mass-automating since 2025' }]);
      setCommand('');
      return;
    }

    if (cmd === 'neofetch') {
      setHistory((prev) => [...prev, { command: cmd, output: '  NK  nikoloz@portfolio\n  --  OS: Web/Next.js 15\n      Shell: zsh 5.9\n      Terminal: browser\n      Theme: cosmic-amber\n      Status: 🟢 online' }]);
      setCommand('');
      return;
    }

    const responses = {
      help: 'commands: about, skills, projects, contact, clear\n  easter eggs: sudo hire me, matrix, coffee, hack, whoami, uptime, neofetch',
      about: 'Nikoloz Koiava — IT support specialist transitioning into DevOps engineering.',
      skills: 'Docker · Kubernetes · Linux · Bash · n8n · PostgreSQL · Automation',
      projects: 'projects: automation tools, duty bot, CS2 server, DevOps lab',
      contact: 'email: nikakoiava07@gmail.com | github: github.com/nikolozkoiava | linkedin: /in/nikolozkoiava',
    };

    setHistory((prev) => [
      ...prev,
      { command: cmd, output: responses[cmd] || 'command not found: ' + cmd + '. type "help"' },
    ]);
    setCommand('');
  }

  function focusInput() {
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <header id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 64 }}>
      <style>{`
        @keyframes scanLine {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .photo-frame:hover .scan-line {
          animation: scanLine 2s linear infinite;
        }
        .photo-frame:hover {
          border-color: rgba(245, 158, 11, 0.4) !important;
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.1);
        }
      `}</style>

      <div className="container-main" style={{ width: '100%' }}>
        <div className="hero-grid">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#888', marginBottom: 16 }}
            >
              <span style={{ color: '#4ade80' }}>›</span>{' '}
              <span style={{ color: '#4ade80' }}>~/whoami</span> — Nikoloz Koiava
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 700, fontFamily: 'var(--mono)', lineHeight: 1.1, marginBottom: 24 }}
            >
              <span style={{ color: '#fff' }}>i </span>
              <span style={{ color: '#f59e0b' }}>
                <LoopingText text="automate" delay={800} />
              </span>
              <br />
              <span style={{ color: '#fff' }}>everything</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ fontSize: 17, color: '#999', maxWidth: 500, lineHeight: 1.7, marginBottom: 32 }}
            >
              IT support specialist at Bank of Georgia, transitioning into DevOps
              engineering. building automation tools, managing hybrid
              infrastructure, and learning every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ display: 'flex', gap: 16, marginBottom: 40, position: 'relative', zIndex: 10 }}
            >
              <a
                href="#contact"
                className="hero-btn-primary"
                onMouseEnter={function(e) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#f59e0b';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(245,158,11,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.background = '#f59e0b';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', background: '#f59e0b', color: '#000',
                  fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13,
                  borderRadius: 6, textDecoration: 'none',
                  border: '2px solid #f59e0b',
                  transition: 'all 0.3s ease',
                }}
              >$ get in touch →</a>

              <a
                href="#projects"
                className="hero-btn-secondary"
                onMouseEnter={function(e) {
                  e.currentTarget.style.borderColor = '#f59e0b';
                  e.currentTarget.style.color = '#f59e0b';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.color = '#e5e5e5';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', background: 'transparent', color: '#e5e5e5',
                  fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700,
                  borderRadius: 6, textDecoration: 'none',
                  border: '2px solid #333',
                  transition: 'all 0.3s ease',
                }}
              >view projects</a>
            </motion.div>

            {showTerminal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={focusInput}
                style={{
                  background: '#0d0d0d', border: '1px solid #222',
                  borderRadius: 8, overflow: 'hidden', maxWidth: 480,
                  cursor: 'text',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 16px', borderBottom: '1px solid #222', background: '#111',
                }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333' }} />
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333' }} />
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#555' }}>~ — zsh — 80×8</span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, color: '#555',
                    border: '1px solid #333', padding: '1px 6px', borderRadius: 3,
                  }}>tmux:0</span>
                </div>

                <div style={{ padding: 16, fontFamily: 'var(--mono)', fontSize: 13 }}>
                  <p style={{ color: '#888' }}>
                    <span style={{ color: '#f59e0b' }}>$</span> cat about.yml
                  </p>

                  {TERMINAL_LINES.map((line, i) => (
                    <TerminalLine key={line.key} line={line} delay={400 + i * 700} />
                  ))}

                  <p style={{ color: '#444', fontSize: 11, marginTop: 4 }}># last updated 2026-05-10</p>

                  <div
                    ref={historyRef}
                    style={{ maxHeight: 170, overflowY: 'auto', overflowX: 'hidden', paddingRight: 6 }}
                  >
                    {history.map((item, index) => (
                      <div key={index}>
                        <p style={{ color: '#ccc' }}>
                          <span style={{ color: '#f59e0b' }}>$</span> {item.command}
                        </p>
                        <p style={{ color: '#888', marginLeft: 16 }}>{item.output}</p>
                      </div>
                    ))}

                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#f59e0b' }}>$</span>
                      <input
                        ref={inputRef}
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={runCommand}
                        autoComplete="off"
                        spellCheck="false"
                        style={{
                          flex: 1, background: 'transparent', border: 'none', outline: 'none',
                          color: '#ccc', fontFamily: 'var(--mono)', fontSize: 13, caretColor: '#f59e0b',
                        }}
                      />
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div
              className="photo-frame"
              style={{
                width: 256, height: 320, border: '1px solid #333', borderRadius: 8,
                background: '#111', overflow: 'hidden',
                transition: 'border-color 0.5s, box-shadow 0.5s',
                cursor: 'default',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.jpg"
                alt="Nikoloz Koiava"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'grayscale(0.15) contrast(1.05)',
                  transition: 'filter 0.4s ease',
                }}
              />

              {/* Subtle amber gradient overlay at bottom */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(245, 158, 11, 0.06) 100%)',
                pointerEvents: 'none',
              }} />

              {/* Scan line on hover */}
              <div
                className="scan-line"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                  pointerEvents: 'none',
                  opacity: 0.6,
                  top: '-10%',
                }}
              />

              {/* Corner targeting brackets */}
              <div style={{ position: 'absolute', top: 8, left: 8, width: 12, height: 12, borderTop: '1px solid rgba(245,158,11,0.3)', borderLeft: '1px solid rgba(245,158,11,0.3)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, width: 12, height: 12, borderTop: '1px solid rgba(245,158,11,0.3)', borderRight: '1px solid rgba(245,158,11,0.3)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 8, left: 8, width: 12, height: 12, borderBottom: '1px solid rgba(245,158,11,0.3)', borderLeft: '1px solid rgba(245,158,11,0.3)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 12, height: 12, borderBottom: '1px solid rgba(245,158,11,0.3)', borderRight: '1px solid rgba(245,158,11,0.3)', pointerEvents: 'none' }} />
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 8,
              fontFamily: 'var(--mono)', fontSize: 11, color: '#555',
            }}>
              <span><span style={{ color: '#f59e0b' }}>›</span> portrait.jpg</span>
              <span>4:5 · color</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}