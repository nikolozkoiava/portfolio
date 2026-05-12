'use client';

import { useEffect, useRef } from 'react';

const ICONS = [
  // Docker whale
  '<svg viewBox="0 0 256 185" width="40" height="30"><path d="M250.7 78.6c-3-2-9.8-2.8-15-1.7-1.7-11.8-8.5-22.1-16.6-28.5l-3.3-2.7-2.8 3.2c-3.6 4.2-6.2 9-7.7 14.2-.6 2.3-1 4.7-1 7 .2 5.2 1.5 10.2 3.8 14.8-2.5 1.5-5.3 2.6-8.2 3.3-4.3 1.2-9 1.8-13.5 1.8H.4l-.4 2c-1 9.2-.7 18.4.8 27.5 2.4 12.8 7.4 24.3 15 33.8 8.5 10.5 20.6 18.8 36.1 24.5 18.1 6.7 38 10.1 59.2 10.1 17.5 0 34.6-2.5 50.8-7.7 12.7-4.1 24.5-10.3 34.9-18.5 8.7-7 16.5-15 23.2-23.9 10.5-14 16.8-29.2 21.5-42.7h1.9c11.5 0 18.6-4.6 22.5-8.5 2.6-2.4 4.6-5.4 5.9-8.7l.8-2.5-2.4-1.5" fill="currentColor"/></svg>',
  // Python
  '<svg viewBox="0 0 256 255" width="35" height="35"><path d="M126.9.072c-64.8 0-60.8 28.1-60.8 28.1l.1 29.1h61.9v8.7H41.6S.1 61.4.1 126.8c0 65.4 36.2 63.1 36.2 63.1h21.6v-30.4s-1.2-36.2 35.6-36.2h61.4s34.5.6 34.5-33.3V33.97S194.7.072 126.9.072z" fill="currentColor"/><path d="M128.8 254.1c64.8 0 60.8-28.1 60.8-28.1l-.1-29.1H127.6v-8.7h86.4s41.5 4.7 41.5-60.7c0-65.4-36.2-63.1-36.2-63.1h-21.6v30.4s1.2 36.2-35.6 36.2h-61.4s-34.5-.6-34.5 33.3v56s-5.2 33.9 62.5 33.9z" fill="currentColor"/></svg>',
  // Git
  '<svg viewBox="0 0 256 256" width="32" height="32"><path d="M251.2 116.6L139.4 4.8a16.5 16.5 0 00-23.3 0l-23.2 23.2 29.4 29.4a19.6 19.6 0 0124.8 25l28.4 28.4a19.6 19.6 0 11-11.8 11l-26.5-26.5v69.6a19.6 19.6 0 11-16.1-.6V94.2a19.6 19.6 0 01-10.7-25.7L81.5 39.4 4.8 116.1a16.5 16.5 0 000 23.3l111.8 111.8a16.5 16.5 0 0023.3 0l111.3-111.3a16.5 16.5 0 000-23.3" fill="currentColor"/></svg>',
  // Kubernetes helm
  '<svg viewBox="0 0 256 249" width="34" height="34"><path d="M128 0a14.8 14.8 0 00-6.8 1.7L23.8 52.3a14.8 14.8 0 00-7.7 10.3l-15.7 106a14.8 14.8 0 003.1 12.4l68.2 82.2a14.8 14.8 0 0011.7 5.6h92.3a14.8 14.8 0 0011.6-5.6l68.3-82.2a14.8 14.8 0 003-12.4l-15.7-106a14.8 14.8 0 00-7.7-10.3L137.8 1.7A14.8 14.8 0 00128 0z" fill="currentColor"/></svg>',
  // HTML5
  '<svg viewBox="0 0 512 512" width="30" height="30"><path fill="currentColor" d="M71 460L30 0h451l-41 460-185 52"/></svg>',
  // JS
  '<svg viewBox="0 0 256 256" width="28" height="28"><rect width="256" height="256" fill="currentColor" rx="12"/></svg>',
  // Linux tux simplified
  '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 2C9 2 7 5.7 7 9.5c0 2 .6 4 1.6 5.5C7 16.5 5 18 5 20c0 1.3 1.2 2 3 2h8c1.8 0 3-.7 3-2 0-2-2-3.5-3.6-5 1-1.5 1.6-3.5 1.6-5.5C17 5.7 15 2 12 2z" fill="currentColor"/></svg>',
  // Database
  '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  // Terminal
  '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><polyline points="7 10 10 13 7 16"/><line x1="13" y1="16" x2="17" y2="16"/></svg>',
  // Cloud (AWS)
  '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
  // Network/Globe
  '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  // Gear/Cog
  '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
];

export default function FloatingIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = [];

    for (let i = 0; i < ICONS.length; i++) {
      const el = document.createElement('div');
      el.innerHTML = ICONS[i];
      el.style.cssText = 'position:absolute;color:rgba(245,158,11,0.06);pointer-events:none;transition:color 0.5s;';

      const size = 0.6 + Math.random() * 0.8;
      el.style.transform = 'scale(' + size + ')';

      items.push({
        el: el,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 0.12 + Math.random() * 0.08,
      });

      container.appendChild(el);
    }

    let animationId;

    function animate() {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.rotationSpeed;

        // Wrap around
        if (item.x > 105) item.x = -5;
        if (item.x < -5) item.x = 105;
        if (item.y > 105) item.y = -5;
        if (item.y < -5) item.y = 105;

        item.el.style.left = item.x + '%';
        item.el.style.top = item.y + '%';
        item.el.style.transform = 'rotate(' + item.rotation + 'deg) scale(' + (0.6 + Math.random() * 0.01) + ')';
        item.el.style.color = 'rgba(245,158,11,' + item.opacity + ')';
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      items.forEach(item => item.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
