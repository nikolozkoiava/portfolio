'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: '~/skills', href: '#skills', id: 'skills' },
  { label: '// projects', href: '#projects', id: 'projects' },
  { label: '$ history', href: '#experience', id: 'experience' },
  { label: '@contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', onScroll);
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(function() {
    var observers = [];
    var timeout = setTimeout(function() {
      NAV_ITEMS.forEach(function(item) {
        var el = document.getElementById(item.id);
        if (!el) return;
        var observer = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) setActiveSection(item.id);
            });
          },
          { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      });

      var heroEl = document.getElementById('hero');
      if (heroEl) {
        var heroObserver = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) setActiveSection('');
            });
          },
          { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
        );
        heroObserver.observe(heroEl);
        observers.push(heroObserver);
      }
    }, 500);

    return function() {
      clearTimeout(timeout);
      observers.forEach(function(obs) { obs.disconnect(); });
    };
  }, []);

  useEffect(function() {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return function() { window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(function() {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return function() { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <style>{`
        .burger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #888;
          transition: color 0.2s;
        }
        .burger-btn:hover { color: #f59e0b; }
        .desktop-nav { display: flex; }

        @media (max-width: 768px) {
          .burger-btn { display: flex; align-items: center; justify-content: center; }
          .desktop-nav { display: none !important; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          transition: 'all 0.3s',
          background: scrolled || menuOpen ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #222' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1152, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#" onClick={handleNavClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{
              width: 32, height: 32, borderRadius: 4,
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f59e0b', fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
            }}>NK</span>
          </a>

          {/* Desktop Nav - centered */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_ITEMS.map(function(item) {
              var isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 13,
                    color: isActive ? '#f59e0b' : '#888',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    textShadow: isActive ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
                    position: 'relative',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: -8, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%',
                      background: '#f59e0b',
                      boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)',
                    }} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 13 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: '#888' }}>online</span>
            </span>

            <button
              className="burger-btn"
              onClick={function() { setMenuOpen(function(v) { return !v; }); }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - full overlay, covers EVERYTHING */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, top: 64, zIndex: 9998,
              background: 'rgba(10, 10, 10, 0.99)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {NAV_ITEMS.map(function(item, i) {
              var isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 700,
                    color: isActive ? '#f59e0b' : '#888',
                    textDecoration: 'none',
                    padding: '24px 0',
                    textShadow: isActive ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none',
                    transition: 'color 0.2s ease',
                    width: '100%', textAlign: 'center',
                    borderBottom: '1px solid #1a1a1a',
                  }}
                >
                  {item.label}
                </motion.a>
              );
            })}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#444', marginTop: 32 }}
            >
              press <span style={{ border: '1px solid #333', padding: '2px 6px', borderRadius: 3, color: '#666' }}>Ctrl+K</span> for commands
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}