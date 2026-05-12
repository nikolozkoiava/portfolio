'use client';

import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let scrollY = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function handleScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Stars at different depths
    const stars = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * 3000 - 500,
        y: Math.random() * 8000,
        size: Math.random() * 2 + 0.3,
        depth: Math.random() * 3 + 1,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
        isAmber: Math.random() < 0.15,
        // Repel state
        offsetX: 0,
        offsetY: 0,
        // Screen position cache
        screenX: 0,
        screenY: 0,
      });
    }

    // Shooting stars
    const shootingStars = [];
    let lastShootTime = 0;

    function spawnShootingStar(time) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.5,
        length: 80 + Math.random() * 120,
        speed: 8 + Math.random() * 6,
        angle: (Math.PI / 6) + Math.random() * (Math.PI / 6),
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
      });
      lastShootTime = time;
    }

    // Nebula positions
    const nebulae = [
      { x: 0.2, y: 0.15, radius: 300, color: '245, 158, 11' },
      { x: 0.8, y: 0.4, radius: 250, color: '139, 92, 246' },
      { x: 0.3, y: 0.65, radius: 280, color: '245, 158, 11' },
      { x: 0.7, y: 0.85, radius: 220, color: '59, 130, 246' },
    ];

    var repelRadius = 160;
    var repelStrength = 50;
    var constellationDist = 120;

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var totalHeight = document.documentElement.scrollHeight;

      // Draw nebulae
      nebulae.forEach(function(neb) {
        var nebY = neb.y * totalHeight - scrollY;
        if (nebY > -400 && nebY < canvas.height + 400) {
          var gradient = ctx.createRadialGradient(
            neb.x * canvas.width, nebY, 0,
            neb.x * canvas.width, nebY, neb.radius
          );
          gradient.addColorStop(0, 'rgba(' + neb.color + ', 0.04)');
          gradient.addColorStop(0.5, 'rgba(' + neb.color + ', 0.015)');
          gradient.addColorStop(1, 'rgba(' + neb.color + ', 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      });

      // Compute star screen positions + mouse repel
      var visibleStars = [];

      stars.forEach(function(star) {
        var parallaxY = star.y - scrollY * (star.depth * 0.15);
        var baseY = ((parallaxY % (canvas.height + 100)) + canvas.height + 100) % (canvas.height + 100) - 50;
        var baseX = ((star.x % (canvas.width + 100)) + canvas.width + 100) % (canvas.width + 100) - 50;

        // Mouse repel
        var dx = baseX - mouseX;
        var dy = baseY - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);

        var targetOffX = 0;
        var targetOffY = 0;

        if (dist < repelRadius && dist > 0) {
          var force = Math.pow(1 - dist / repelRadius, 2) * repelStrength;
          targetOffX = (dx / dist) * force;
          targetOffY = (dy / dist) * force;
        }

        // Smooth lerp
        star.offsetX += (targetOffX - star.offsetX) * 0.08;
        star.offsetY += (targetOffY - star.offsetY) * 0.08;

        star.screenX = baseX + star.offsetX;
        star.screenY = baseY + star.offsetY;

        // Only track visible stars for constellation
        if (star.screenX > -20 && star.screenX < canvas.width + 20 &&
            star.screenY > -20 && star.screenY < canvas.height + 20) {
          visibleStars.push(star);
        }
      });

      // Draw constellation lines between nearby visible stars
      ctx.lineWidth = 0.5;
      for (var i = 0; i < visibleStars.length; i++) {
        var a = visibleStars[i];
        for (var j = i + 1; j < visibleStars.length; j++) {
          var b = visibleStars[j];
          var dx = a.screenX - b.screenX;
          var dy = a.screenY - b.screenY;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < constellationDist) {
            var lineAlpha = (1 - dist / constellationDist) * 0.12;

            // Brighter near mouse
            var midX = (a.screenX + b.screenX) / 2;
            var midY = (a.screenY + b.screenY) / 2;
            var mouseDist = Math.sqrt((midX - mouseX) * (midX - mouseX) + (midY - mouseY) * (midY - mouseY));

            if (mouseDist < 200) {
              var boost = (1 - mouseDist / 200) * 0.25;
              lineAlpha += boost;
              ctx.strokeStyle = 'rgba(245, 158, 11, ' + lineAlpha + ')';
            } else {
              ctx.strokeStyle = 'rgba(255, 255, 255, ' + lineAlpha + ')';
            }

            ctx.beginPath();
            ctx.moveTo(a.screenX, a.screenY);
            ctx.lineTo(b.screenX, b.screenY);
            ctx.stroke();
          }
        }
      }

      // Draw stars
      stars.forEach(function(star) {
        var twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset));
        var alpha = twinkle * (0.3 + star.depth * 0.15);

        // Stars near mouse glow brighter
        var dx = star.screenX - mouseX;
        var dy = star.screenY - mouseY;
        var mouseDist = Math.sqrt(dx * dx + dy * dy);
        if (mouseDist < 180) {
          var glow = (1 - mouseDist / 180) * 0.4;
          alpha = Math.min(1, alpha + glow);
        }

        ctx.beginPath();
        ctx.arc(star.screenX, star.screenY, star.size, 0, Math.PI * 2);

        if (star.isAmber) {
          ctx.fillStyle = 'rgba(245, 158, 11, ' + alpha + ')';
          if (star.size > 1.5) {
            ctx.shadowColor = 'rgba(245, 158, 11, 0.3)';
            ctx.shadowBlur = 6;
          }
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.7) + ')';
          // Near mouse, white stars get subtle amber tint
          if (mouseDist < 140) {
            var tint = (1 - mouseDist / 140) * 0.5;
            ctx.fillStyle = 'rgba(' + Math.round(255 - tint * 10) + ', ' + Math.round(255 - tint * 97) + ', ' + Math.round(255 - tint * 244) + ', ' + (alpha * 0.7) + ')';
            ctx.shadowColor = 'rgba(245, 158, 11, ' + (tint * 0.3) + ')';
            ctx.shadowBlur = 4;
          } else {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Spawn shooting stars
      if (time - lastShootTime > 3000 + Math.random() * 3000) {
        spawnShootingStar(time);
      }

      // Draw shooting stars
      for (var s = shootingStars.length - 1; s >= 0; s--) {
        var ss = shootingStars[s];

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= ss.decay;

        if (ss.life <= 0) {
          shootingStars.splice(s, 1);
          continue;
        }

        var tailX = ss.x - Math.cos(ss.angle) * ss.length * ss.life;
        var tailY = ss.y - Math.sin(ss.angle) * ss.length * ss.life;

        var gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0)');
        gradient.addColorStop(0.7, 'rgba(245, 158, 11, ' + (ss.life * 0.3) + ')');
        gradient.addColorStop(1, 'rgba(255, 255, 255, ' + (ss.life * 0.8) + ')');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (ss.life * 0.9) + ')';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    }

    animate(0);

    return function() {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}