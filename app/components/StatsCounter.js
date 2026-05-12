'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, suffix, label, duration }) {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-80px' });
  var [count, setCount] = useState(0);

  useEffect(function() {
    if (!inView) return;

    var start = 0;
    var end = target;
    var dur = (duration || 2) * 1000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / dur, 1);

      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * end);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '42px',
        fontWeight: 800,
        color: '#f59e0b',
        lineHeight: 1,
        marginBottom: '8px',
        textShadow: '0 0 20px rgba(245,158,11,0.3)',
      }}>
        {count}{suffix || ''}
      </div>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '2px',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  var stats = [
    { target: 2, suffix: '+', label: 'Years Experience' },
    { target: 10, suffix: '+', label: 'Technologies' },
    { target: 2, suffix: '', label: 'Projects Built' },
    { target: 50, suffix: '+', label: 'Workflows Automated' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      padding: '32px 0',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
    }}>
      {stats.map(function(stat, i) {
        return (
          <AnimatedCounter
            key={stat.label}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            duration={1.5 + i * 0.3}
          />
        );
      })}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
