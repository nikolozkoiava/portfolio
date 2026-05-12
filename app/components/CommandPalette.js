'use client';

import { useState, useEffect, useRef } from 'react';

var COMMANDS = [
  { cmd: 'skills', label: 'Go to ~/skills', action: 'navigate', target: '#skills', icon: '→' },
  { cmd: 'projects', label: 'Go to // projects', action: 'navigate', target: '#projects', icon: '→' },
  { cmd: 'history', label: 'Go to $ history', action: 'navigate', target: '#experience', icon: '→' },
  { cmd: 'contact', label: 'Go to @contact', action: 'navigate', target: '#contact', icon: '→' },
  { cmd: 'top', label: 'Scroll to top', action: 'navigate', target: '#hero', icon: '↑' },
  { cmd: 'github', label: 'Open GitHub', action: 'link', target: 'https://github.com/nikolozkoiava', icon: '↗' },
  { cmd: 'linkedin', label: 'Open LinkedIn', action: 'link', target: 'https://www.linkedin.com/in/nikolozkoiava/', icon: '↗' },
  { cmd: 'email', label: 'Send email', action: 'link', target: 'mailto:nikakoiava07@gmail.com', icon: '✉' },
  { cmd: 'matrix', label: 'Easter egg: Matrix rain', action: 'easter', target: 'matrix', icon: '◉' },
  { cmd: 'sudo hire me', label: 'Easter egg: Hire me!', action: 'easter', target: 'hire', icon: '⚡' },
];

export default function CommandPalette() {
  var [open, setOpen] = useState(false);
  var [query, setQuery] = useState('');
  var [selected, setSelected] = useState(0);
  var inputRef = useRef(null);

  var filtered = COMMANDS.filter(function(c) {
    var q = query.toLowerCase();
    return c.cmd.includes(q) || c.label.toLowerCase().includes(q);
  });

  useEffect(function() {
    function onKeyDown(e) {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(function(v) { return !v; });
        setQuery('');
        setSelected(0);
      }
      // Escape
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return function() { window.removeEventListener('keydown', onKeyDown); };
  }, []);

  useEffect(function() {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(function() {
    setSelected(0);
  }, [query]);

  function executeCommand(cmd) {
    setOpen(false);
    setQuery('');

    if (cmd.action === 'navigate') {
      var el = document.querySelector(cmd.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'link') {
      window.open(cmd.target, '_blank');
    } else if (cmd.action === 'easter') {
      if (cmd.target === 'matrix') {
        triggerMatrix();
      } else if (cmd.target === 'hire') {
        triggerHireMe();
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(function(s) { return Math.min(s + 1, filtered.length - 1); });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(function(s) { return Math.max(s - 1, 0); });
    } else if (e.key === 'Enter' && filtered[selected]) {
      executeCommand(filtered[selected]);
    }
  }

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes paletteIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={function() { setOpen(false); }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999998,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          animation: 'overlayIn 0.15s ease',
        }}
      />

      {/* Palette */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        width: '100%',
        maxWidth: 520,
        animation: 'paletteIn 0.2s ease',
      }}>
        <div style={{
          background: '#111',
          border: '1px solid #333',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.05)',
        }}>
          {/* Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderBottom: '1px solid #222',
          }}>
            <span style={{ color: '#f59e0b', fontFamily: 'var(--mono)', fontSize: 14 }}>$</span>
            <input
              ref={inputRef}
              value={query}
              onChange={function(e) { setQuery(e.target.value); }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e5e5e5',
                fontFamily: 'var(--mono)',
                fontSize: 14,
                caretColor: '#f59e0b',
              }}
            />
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: '#555',
              border: '1px solid #333',
              padding: '2px 6px',
              borderRadius: 4,
            }}>ESC</span>
          </div>

          {/* Results */}
          <div style={{
            maxHeight: 320,
            overflowY: 'auto',
            padding: '8px 0',
          }}>
            {filtered.length === 0 && (
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: '#555',
                padding: '16px 20px',
                textAlign: 'center',
              }}>
                command not found
              </p>
            )}

            {filtered.map(function(cmd, i) {
              var isSelected = i === selected;
              return (
                <div
                  key={cmd.cmd}
                  onClick={function() { executeCommand(cmd); }}
                  onMouseEnter={function() { setSelected(i); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '2px solid #f59e0b' : '2px solid transparent',
                    transition: 'background 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      color: isSelected ? '#f59e0b' : '#555',
                      fontSize: 14,
                      width: 20,
                      textAlign: 'center',
                    }}>{cmd.icon}</span>
                    <div>
                      <p style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 13,
                        color: isSelected ? '#fff' : '#999',
                      }}>{cmd.label}</p>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: '#444',
                  }}>{cmd.cmd}</span>
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div style={{
            padding: '10px 20px',
            borderTop: '1px solid #222',
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#444' }}>
              <span style={{ border: '1px solid #333', padding: '1px 4px', borderRadius: 3, marginRight: 4 }}>↑↓</span> navigate
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#444' }}>
              <span style={{ border: '1px solid #333', padding: '1px 4px', borderRadius: 3, marginRight: 4 }}>↵</span> select
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#444' }}>
              <span style={{ border: '1px solid #333', padding: '1px 4px', borderRadius: 3, marginRight: 4 }}>esc</span> close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// Easter egg: Matrix rain
function triggerMatrix() {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:999997;pointer-events:none;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var cols = Math.floor(canvas.width / 16);
  var drops = [];
  for (var i = 0; i < cols; i++) drops[i] = Math.random() * -50;

  var chars = 'ニコロズ01アウトメーション';
  var frame = 0;

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '14px monospace';

    for (var i = 0; i < drops.length; i++) {
      var char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.9 ? '#fff' : 'rgba(245, 158, 11, ' + (0.4 + Math.random() * 0.6) + ')';
      ctx.fillText(char, i * 16, drops[i] * 16);

      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    frame++;
    if (frame < 180) {
      requestAnimationFrame(draw);
    } else {
      // Fade out
      var fadeOut = function(opacity) {
        canvas.style.opacity = opacity;
        if (opacity > 0) {
          requestAnimationFrame(function() { fadeOut(opacity - 0.02); });
        } else {
          document.body.removeChild(canvas);
        }
      };
      fadeOut(1);
    }
  }
  draw();
}

// Easter egg: sudo hire me
function triggerHireMe() {
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:999997;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.9);backdrop-filter:blur(12px);animation:overlayIn 0.3s ease;';

  overlay.innerHTML = '<div style="text-align:center;font-family:var(--mono)">' +
    '<p style="color:#22c55e;font-size:14px;margin-bottom:16px">$ sudo hire me</p>' +
    '<p style="color:#f59e0b;font-size:48px;font-weight:700;margin-bottom:8px">ACCESS GRANTED ⚡</p>' +
    '<p style="color:#888;font-size:16px;margin-bottom:32px">nikoloz.exe is ready to deploy</p>' +
    '<p style="color:#555;font-size:13px">nikakoiava07@gmail.com</p>' +
    '<p style="color:#444;font-size:11px;margin-top:24px">click anywhere to close</p>' +
    '</div>';

  overlay.onclick = function() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    setTimeout(function() { document.body.removeChild(overlay); }, 300);
  };

  document.body.appendChild(overlay);
}
