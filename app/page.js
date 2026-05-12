'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ParticleField from './components/ParticleField';
import CosmicBackground from './components/CosmicBackground';
import ScrollProgress from './components/ScrollProgress';
import CursorTrail from './components/CursorTrail';
import StatsCounter from './components/StatsCounter';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import CommandPalette from './components/CommandPalette';
// Lightweight cinematic additions
import SectionFog from './components/SectionFog';
import DepthParallax from './components/DepthParallax';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(function() {
    if (!loaded) return;

    var elements = Array.from(
      document.querySelectorAll('.cosmic-float, .card')
    );

    var mouseX = -9999;
    var mouseY = -9999;
    var rafId;

    elements.forEach(function(el) {
      var rect = el.getBoundingClientRect();

      el.floatData = {
        baseX: rect.left + rect.width / 2,
        baseY: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,

       durationX: 24 + Math.random() * 22,
durationY: 26 + Math.random() * 24,
durationR: 32 + Math.random() * 26,

        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseR: Math.random() * Math.PI * 2,

       xRange: 6 + Math.random() * 10,
yRange: 8 + Math.random() * 14,
rotRange: 0.08 + Math.random() * 0.22,

        currentX: 0,
        currentY: 0,
        currentR: 0,
      };

      el.style.willChange = 'transform';
      el.style.transform = 'translate3d(0, 0, 0)';
    });

    function updateBasePositions() {
      elements.forEach(function(el) {
        var data = el.floatData;
        if (!data) return;

        var rect = el.getBoundingClientRect();

        data.baseX = rect.left + rect.width / 2 - data.currentX;
        data.baseY = rect.top + rect.height / 2 - data.currentY;
        data.width = rect.width;
        data.height = rect.height;
      });
    }

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', updateBasePositions);
    window.addEventListener('scroll', updateBasePositions, { passive: true });

    function animate() {
      var now = performance.now() / 1000;

      elements.forEach(function(el) {
        var data = el.floatData;
        if (!data) return;

        var floatX =
          Math.sin((now / data.durationX) * Math.PI * 2 + data.phaseX) *
          data.xRange;

        var floatY =
          Math.cos((now / data.durationY) * Math.PI * 2 + data.phaseY) *
          data.yRange;

        var dx = data.baseX + floatX - mouseX;
        var dy = data.baseY + floatY - mouseY;
        var distance = Math.sqrt(dx * dx + dy * dy);

var repelDistance = 170;
var repelPower = 12;

        var repelX = 0;
        var repelY = 0;

        if (distance < repelDistance) {
          var force = Math.pow(1 - distance / repelDistance, 2) * repelPower;
          var angle = Math.atan2(dy, dx);

          repelX = Math.cos(angle) * force;
          repelY = Math.sin(angle) * force;
        }

        var collisionX = 0;
        var collisionY = 0;

        elements.forEach(function(other) {
          if (other === el) return;

          var otherData = other.floatData;
          if (!otherData) return;

          var ex = data.baseX + data.currentX;
          var ey = data.baseY + data.currentY;

          var ox = otherData.baseX + otherData.currentX;
          var oy = otherData.baseY + otherData.currentY;

          var diffX = ex - ox;
          var diffY = ey - oy;
          var dist = Math.sqrt(diffX * diffX + diffY * diffY);

          var sizeA = Math.max(data.width, data.height);
          var sizeB = Math.max(otherData.width, otherData.height);
          var minDist = Math.min(180, Math.max(90, (sizeA + sizeB) * 0.22));

          if (dist > 0 && dist < minDist) {
            var push = Math.pow(1 - dist / minDist, 2) * 8;
            collisionX += (diffX / dist) * push;
            collisionY += (diffY / dist) * push;
          }
        });

        var rotate =
          Math.sin((now / data.durationR) * Math.PI * 2 + data.phaseR) *
          data.rotRange;

        var targetX = floatX + repelX + collisionX;
        var targetY = floatY + repelY + collisionY;

      data.currentX += (targetX - data.currentX) * 0.052;
data.currentY += (targetY - data.currentY) * 0.052;
data.currentR += (rotate - data.currentR) * 0.038;

        el.style.transform =
          'translate3d(' +
          data.currentX +
          'px, ' +
          data.currentY +
          'px, 0) rotate(' +
          data.currentR +
          'deg)';
      });

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return function() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', updateBasePositions);
      window.removeEventListener('scroll', updateBasePositions);
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CommandPalette />

      <main
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <ScrollProgress />
        <CursorTrail />
        <ParticleField />
        <CosmicBackground />
        <DepthParallax />
        <SectionFog />
        <ScrollToTop />
        <Navbar />
        <Hero />

        <section
          className="section-padding"
          style={{ paddingTop: 0, paddingBottom: 48 }}
        >
          <div className="container-main">
            <StatsCounter />
          </div>
        </section>

        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}