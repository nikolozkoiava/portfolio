'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  var progress = 0;
  var [width, setWidth] = useState(0);

  useEffect(function() {
    function handleScroll() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrolled);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return function() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      zIndex: 9999,
      background: 'transparent',
    }}>
      <div style={{
        height: '100%',
        width: width + '%',
        background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)',
        boxShadow: '0 0 12px rgba(245,158,11,0.6), 0 0 4px rgba(245,158,11,0.3)',
        transition: 'width 0.1s ease-out',
        borderRadius: '0 2px 2px 0',
      }} />
    </div>
  );
}
