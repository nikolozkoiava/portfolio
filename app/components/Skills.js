'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FloatingIcons from './FloatingIcons';

function Icon({ type }) {
  var s = { width: 28, height: 28, stroke: '#f59e0b', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  var icons = {
    server: <svg viewBox="0 0 24 24" style={s}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="#f59e0b"/><circle cx="6" cy="18" r="1" fill="#f59e0b"/></svg>,
    cog: <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    terminal: <svg viewBox="0 0 24 24" style={s}><rect x="2" y="3" width="20" height="18" rx="2"/><polyline points="7 10 10 13 7 16"/><line x1="13" y1="16" x2="17" y2="16"/></svg>,
    code: <svg viewBox="0 0 24 24" style={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20" style={{stroke: '#f59e0b', strokeWidth: 1.5}}/></svg>,
    database: <svg viewBox="0 0 24 24" style={s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    globe: <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  };
  return icons[type] || icons.code;
}

var SKILLS = [
  { icon: 'server', name: 'infrastructure', items: 'Active Directory · Exchange · Microsoft 365 · Cloudflare' },
  { icon: 'cog', name: 'automation', items: 'n8n · Docker · Kubernetes · Bash' },
  { icon: 'terminal', name: 'systems', items: 'Linux · Git' },
  { icon: 'code', name: 'languages', items: 'JavaScript · Python · HTML · CSS' },
  { icon: 'database', name: 'databases', items: 'PostgreSQL · SQLite' },
  { icon: 'globe', name: 'networking', items: 'DNS · TCP/UDP · VPN · Firewalls' },
];

function TiltCard({ children }) {
  var ref = useRef(null);
  function handleMouseMove(e) {
    var card = ref.current;
    if (!card) return;
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var rotateX = (y - rect.height / 2) / 12;
    var rotateY = (rect.width / 2 - x) / 12;
    card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.03)';
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
  }
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d', height: '100%' }}>
      {children}
    </div>
  );
}

export default function Skills() {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding" ref={ref} style={{ position: 'relative' }}>
  <FloatingIcons />
  <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>01 —</span>
          <span style={{ fontFamily: 'var(--mono)', color: '#f59e0b', fontWeight: 700 }}>~/skills</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>[ stack ]</span>
          <span style={{ flex: 1, height: 1, background: '#222' }}></span>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {SKILLS.map(function(skill, i) {
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
              >
                <TiltCard>
                  <div className="card"
                    onMouseMove={function(e) {
                      var rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                      e.currentTarget.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
                    }}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <Icon type={skill.icon} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#fff', marginBottom: 8, fontSize: 15 }}>
                      {skill.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#888', lineHeight: 1.6 }}>
                      {skill.items}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: repeat(3"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}