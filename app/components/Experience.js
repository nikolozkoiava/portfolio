'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCE = [
  {
    role: 'Advance Customer Rights Management Specialist',
    company: 'Bank of Georgia',
    span: '2025 → present',
    current: true,
    blurb: 'Managing customer rights and IT support operations. Building automation tools to streamline team workflows.',
    bullets: [
      'Built Duty Bot — automated shift scheduling system using n8n + PostgreSQL + Slack',
      'Built Break Bot — team break coordination system',
      'Managing hybrid Exchange and Microsoft 365 environments',
    ],
    stack: ['active directory', 'exchange', 'o365', 'windows server', 'powershell'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>03 —</span>
          <span style={{ fontFamily: 'var(--mono)', color: '#f59e0b', fontWeight: 700 }}>$ history --pretty</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>[ work ]</span>
          <span style={{ flex: 1, height: 1, background: '#222' }} />
        </motion.div>

        <style>{`
          .exp-layout {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 32px;
          }
          .exp-sidebar {
            position: sticky;
            top: 96px;
            height: fit-content;
            z-index: 1;
          }
          @media (max-width: 768px) {
            .exp-layout {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .exp-sidebar {
              position: relative;
              top: 0;
            }
          }
        `}</style>

        <div className="exp-layout">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card exp-sidebar"
          >
            <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 13, color: '#fff', marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
              current role
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>○ past role</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#444', marginTop: 12 }}>1y in tech</p>
          </motion.div>

          <div>
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                style={{ position: 'relative', paddingLeft: 32, borderLeft: '1px solid #222' }}
              >
                <span style={{
                  position: 'absolute', left: -7, top: 8,
                  width: 12, height: 12, borderRadius: '50%',
                  border: job.current ? '2px solid #f59e0b' : '2px solid #444',
                  background: job.current ? 'rgba(245,158,11,0.2)' : '#111',
                }} />

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                  <h3 style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#fff', fontSize: 17 }}>
                    {job.role.toLowerCase()}{' '}
                    <span style={{ color: '#f59e0b' }}>@ {job.company.toLowerCase()}</span>
                  </h3>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#666' }}>{job.span}</span>
                </div>

                <p style={{ fontSize: 14, color: '#888', marginBottom: 16, lineHeight: 1.7 }}>{job.blurb}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {job.bullets.map((bullet) => (
                    <div key={bullet} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#aaa' }}>
                      <span style={{ color: '#f59e0b', marginTop: 2, flexShrink: 0 }}>→</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {job.stack.map((tech) => (
                    <span key={tech} style={{
                      fontFamily: 'var(--mono)', fontSize: 11, padding: '4px 10px',
                      border: '1px solid #222', borderRadius: 4, color: '#666',
                    }}>{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}