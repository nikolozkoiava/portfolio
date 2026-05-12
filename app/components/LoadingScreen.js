'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> booting nikoloz.dev...', delay: 0 },
  { text: '> loading modules', delay: 400, dots: true },
  { text: '> initializing UI', delay: 1200, dots: true },
  { text: '> connecting services', delay: 1800, dots: true },
  { text: '> ready.', delay: 2400, accent: true },
];

function BootLine({ line, onDone }) {
  const [text, setText] = useState('');
  const [dots, setDots] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setText(line.text.slice(0, i + 1));
        i++;
        if (i >= line.text.length) {
          clearInterval(interval);
          if (line.dots) {
            let d = 0;
            const dotInterval = setInterval(() => {
              d++;
              setDots('.'.repeat(d));
              if (d >= 8) {
                clearInterval(dotInterval);
                setDone(true);
                if (onDone) onDone();
              }
            }, 50);
          } else {
            setDone(true);
            if (onDone) onDone();
          }
        }
      }, 25);
      return () => clearInterval(interval);
    }, line.delay);
    return () => clearTimeout(timeout);
  }, [line]);

  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14,
      color: line.accent ? '#4ade80' : '#888',
      marginBottom: 6,
      minHeight: 20,
    }}>
      <span>{text}</span>
      {line.dots && <span style={{ color: '#555' }}>{dots}</span>}
      {line.dots && done && <span style={{ color: '#4ade80', marginLeft: 4 }}>✓</span>}
    </p>
  );
}

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 420, width: '100%', padding: 24 }}>
        {/* Terminal window */}
        <div style={{
          background: '#0d0d0d',
          border: '1px solid #222',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          {/* Title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 16px',
            borderBottom: '1px solid #222',
            background: '#111',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#555',
              marginLeft: 'auto',
            }}>nikoloz.dev</span>
          </div>

          {/* Boot content */}
          <div style={{ padding: 20 }}>
            {BOOT_LINES.map((line, i) => (
              <BootLine key={i} line={line} />
            ))}

            {/* Progress bar */}
            <div style={{
              marginTop: 16,
              height: 3,
              background: '#1a1a1a',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  borderRadius: 2,
                  boxShadow: '0 0 8px rgba(245,158,11,0.4)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
