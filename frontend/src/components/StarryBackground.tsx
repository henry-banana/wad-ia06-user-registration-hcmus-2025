import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Star[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Create shooting stars
    const shootingStars: ShootingStar[] = [];
    const maxShootingStars = 20;

    const createShootingStar = (): ShootingStar => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.5),
      length: Math.random() * 80 + 50,
      speed: Math.random() * 15 + 10,
      opacity: 1,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // ~45 degrees
      active: true,
    });

    // Animation loop
    let animationId: number;
    let lastShootingStarTime = 0;

    const animate = (timestamp: number) => {
      ctx.fillStyle = 'rgba(10, 10, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(30, 20, 60, 0.3)');
      gradient.addColorStop(0.5, 'rgba(20, 10, 40, 0.5)');
      gradient.addColorStop(1, 'rgba(10, 5, 20, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Add glow effect for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity * 0.3})`;
          ctx.fill();
        }
      });

      // Create new shooting star periodically
      if (timestamp - lastShootingStarTime > 1000 + Math.random() * 3000) {
        if (shootingStars.filter((s) => s.active).length < maxShootingStars) {
          shootingStars.push(createShootingStar());
          lastShootingStarTime = timestamp;
        }
      }

      // Draw and animate shooting stars
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        if (
          star.opacity <= 0 ||
          star.x > canvas.width + 100 ||
          star.y > canvas.height + 100
        ) {
          star.active = false;
          shootingStars.splice(index, 1);
          return;
        }

        // Draw shooting star trail
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const trailGradient = ctx.createLinearGradient(
          tailX,
          tailY,
          star.x,
          star.y
        );
        trailGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        trailGradient.addColorStop(0.5, `rgba(180, 200, 255, ${star.opacity * 0.5})`);
        trailGradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw head glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 180, 255, ${star.opacity * 0.4})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom, #0a0a1e, #1a1a3e, #0f0f2f)' }}
    />
  );
};
