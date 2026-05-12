'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHANNELS = [
  {
    key: 'email',
    val: 'nikakoiava07@gmail.com',
    href: 'mailto:nikakoiava07@gmail.com',
  },
  {
    key: 'github',
    val: 'github.com/nikolozkoiava',
    href: 'https://github.com/nikolozkoiava',
  },
  {
    key: 'linkedin',
    val: '/in/nikolozkoiava',
    href: 'https://www.linkedin.com/in/nikolozkoiava/',
  },
];

export default function Contact() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      id="contact"
      className="section-padding"
      ref={ref}
    >
      <style>{`
        @keyframes borderGlow {
          0%, 100% {
            border-color: rgba(245, 158, 11, 0.15);
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.03), inset 0 1px 0 rgba(245, 158, 11, 0.05);
          }
          50% {
            border-color: rgba(245, 158, 11, 0.35);
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.08), 0 0 80px rgba(245, 158, 11, 0.03), inset 0 1px 0 rgba(245, 158, 11, 0.1);
          }
        }
        .contact-glow {
          animation: borderGlow 4s ease-in-out infinite;
        }
        .contact-glow:hover {
          animation: none;
          border-color: rgba(245, 158, 11, 0.5) !important;
          box-shadow: 0 0 60px rgba(245, 158, 11, 0.12), 0 0 120px rgba(245, 158, 11, 0.04), inset 0 1px 0 rgba(245, 158, 11, 0.15) !important;
        }
      `}</style>

      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header cosmic-float"
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: '#555',
            }}
          >
            04 —
          </span>

          <span
            style={{
              fontFamily: 'var(--mono)',
              color: '#f59e0b',
              fontWeight: 700,
            }}
          >
            @contact
          </span>

          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: '#555',
            }}
          >
            [ reach out ]
          </span>

          <span
            style={{
              flex: 1,
              height: 1,
              background: '#222',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="contact-box contact-glow cosmic-float"
          style={{
            position: 'relative',
            zIndex: 10,
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 36,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              let&apos;s build
              <br />
              something{' '}
              <span style={{ color: '#f59e0b' }}>
                solid.
              </span>
            </h2>

            <p
              style={{
                color: '#888',
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Open to DevOps engineering roles.
              Always learning, always building.
              Reach out via email or connect on
              LinkedIn.
            </p>

            <a
              href="mailto:nikakoiava07@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                background: '#f59e0b',
                color: '#000',
                fontFamily: 'var(--mono)',
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 6,
                textDecoration: 'none',
                position: 'relative',
                zIndex: 11,
              }}
            >
              $ nikakoiava07@gmail.com →
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.key}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : {}
                }
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.5,
                }}
                className="contact-link cosmic-float"
                style={{
                  position: 'relative',
                  zIndex: 11,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: '#666',
                      width: 64,
                    }}
                  >
                    {ch.key}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 14,
                      color: '#fff',
                    }}
                  >
                    {ch.val}
                  </span>
                </div>

                <span style={{ color: '#f59e0b' }}>
                  ↗
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid #1a1a1a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: '#444',
            }}
          >
            <span style={{ color: '#f59e0b' }}>© 2026 Nikoloz Koiava</span> 
          </p>
        </div>
      </div>
    </section>
  );
}