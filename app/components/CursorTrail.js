'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  var canvasRef = useRef(null);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: -100, y: -100 };
    var smoothMouse = { x: -100, y: -100 };
    var animationId;
    var isOnScreen = false;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function handleMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isOnScreen = true;

      // Spawn trail particles
      for (var i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 6,
          y: mouse.y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.8,
          life: 1,
          decay: 0.018 + Math.random() * 0.022,
          size: 1 + Math.random() * 2,
          type: 'trail',
        });
      }
    }

    function handleMouseLeave() {
      isOnScreen = false;
    }

    // Sparkle burst on click
    function handleClick(e) {
      for (var i = 0; i < 12; i++) {
        var angle = (Math.PI * 2 / 12) * i + (Math.random() - 0.5) * 0.5;
        var speed = 2 + Math.random() * 3;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.02 + Math.random() * 0.015,
          size: 1.5 + Math.random() * 2,
          type: 'spark',
        });
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse for glow
      if (isOnScreen) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.12;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.12;

        // Large soft glow behind cursor
        var glowGrad = ctx.createRadialGradient(
          smoothMouse.x, smoothMouse.y, 0,
          smoothMouse.x, smoothMouse.y, 200
        );
        glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
        glowGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.02)');
        glowGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.005)');
        glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 200, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        var coreGrad = ctx.createRadialGradient(
          smoothMouse.x, smoothMouse.y, 0,
          smoothMouse.x, smoothMouse.y, 40
        );
        coreGrad.addColorStop(0, 'rgba(255, 200, 60, 0.06)');
        coreGrad.addColorStop(1, 'rgba(255, 200, 60, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particles
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === 'trail') {
          p.vy += 0.015;
          p.vx *= 0.98;
        } else {
          // Sparks decelerate and have gravity
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.vy += 0.03;
        }

        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        var alpha = p.life * 0.7;
        var radius = p.size * p.life;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.type === 'spark') {
          // Sparks are brighter
          ctx.fillStyle = 'rgba(255, 200, 60, 1)';
          ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = 'rgba(245, 170, 40, 1)';
          ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
          ctx.shadowBlur = 6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Limit particles
      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return function() {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    />
  );
}