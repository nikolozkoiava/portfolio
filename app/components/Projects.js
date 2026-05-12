'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PROJECTS = [
  {
    year: '2025 — present',
    title: 'Duty Bot',
    meta: 'n8n · PostgreSQL · Slack · Docker',
    desc: 'Automated shift scheduling bot built for my team at Bank of Georgia. Parses Georgian-language Slack commands, generates weekly schedules, handles swap requests, vacations, and weekend fairness — all automatically.',
    stats: [
      { v: 'Slack', k: 'platform' },
      { v: 'Auto', k: 'scheduling' },
      { v: 'Georgian', k: 'language' },
    ],
    tags: ['n8n', 'postgresql', 'slack', 'docker'],
  },
  {
    year: '2025 — present',
    title: 'Break Bot',
    meta: 'n8n · PostgreSQL · Slack · Docker',
    desc: 'Automated break scheduling bot for the same team. Assigns daily break slots, prevents conflicts, handles team constraints, and ensures full coverage throughout the day.',
    stats: [
      { v: 'Slack', k: 'platform' },
      { v: 'Auto', k: 'scheduling' },
      { v: 'Georgian', k: 'language' },
    ],
    tags: ['n8n', 'postgresql', 'slack', 'docker'],
  },
];

function TiltCard({ children }) {
  var ref = useRef(null);
  function handleMouseMove(e) {
    var card = ref.current;
    if (!card) return;
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var rotateX = (y - rect.height / 2) / 14;
    var rotateY = (rect.width / 2 - x) / 14;
    card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d', height: '100%' }}>
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>02 —</span>
          <span style={{ fontFamily: 'var(--mono)', color: '#f59e0b', fontWeight: 700 }}>// projects</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555' }}>[ selected ]</span>
          <span style={{ flex: 1, height: 1, background: '#222' }} />
        </motion.div>

        <div className="grid-2" style={{ alignItems: 'stretch' }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
            >
              <TiltCard>
                <div
                  className="card"
                  onMouseMove={function(e) {
                    var rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                    e.currentTarget.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
                  }}
                  style={{ padding: 32, display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#f59e0b' }}>
                      <span style={{ color: '#555' }}>›</span> {project.year}
                    </span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#333' }}>0{i + 1}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#666', marginBottom: 16 }}>{project.meta}</p>
                  <p style={{ fontSize: 14, color: '#999', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{project.desc}</p>

                  <div style={{ display: 'flex', gap: 32, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #1a1a1a' }}>
                    {project.stats.map((stat) => (
                      <div key={stat.k}>
                        <p style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#fff', fontSize: 14 }}>{stat.v}</p>
                        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#666' }}>{stat.k}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: 'var(--mono)', fontSize: 11, padding: '4px 10px',
                        border: '1px solid #333', borderRadius: 4, color: '#888',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}