'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  var [visible, setVisible] = useState(false);

  useEffect(function() {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <style>{`
        @keyframes scrollTopPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(245, 158, 11, 0.15); }
          50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
        }
        .scroll-top-btn:hover {
          background: rgba(245, 158, 11, 0.15) !important;
          border-color: rgba(245, 158, 11, 0.6) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 0 24px rgba(245, 158, 11, 0.3) !important;
        }
      `}</style>
      <button
        onClick={scrollUp}
        className="scroll-top-btn"
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 40,
          width: 44,
          height: 44,
          borderRadius: 8,
          background: 'rgba(17, 17, 17, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#f59e0b',
          fontFamily: 'var(--mono)',
          fontSize: 18,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
          animation: visible ? 'scrollTopPulse 3s ease-in-out infinite' : 'none',
        }}
      >
        ↑
      </button>
    </>
  );
}
