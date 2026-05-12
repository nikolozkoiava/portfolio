'use client';

import { useEffect } from 'react';

export default function DepthParallax() {
  useEffect(function () {
    var layers = [
      { selector: '.nebula-layer', speed: 0.02 },
      { selector: '.particle-layer', speed: 0.04 },
      { selector: '.grid-bg', speed: 0.06 },
    ];

    var rafId;
    var scrollY = window.scrollY;
    var currentY = scrollY;
    var ticking = false;

    function onScroll() {
      scrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    }

    function update() {
      currentY += (scrollY - currentY) * 0.08;

      var needsMore = Math.abs(scrollY - currentY) > 0.5;

      layers.forEach(function (layer) {
        var elements = document.querySelectorAll(layer.selector);
        var offset = currentY * layer.speed;
        elements.forEach(function (el) {
          el.style.transform = 'translate3d(0, ' + (-offset) + 'px, 0)';
        });
      });

      if (needsMore) {
        rafId = requestAnimationFrame(update);
      } else {
        ticking = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return function () {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}