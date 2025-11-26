import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const linesRef = useRef<Line[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, (_) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    // Initialize geometric lines
    const lineCount = 15;
    linesRef.current = Array.from({ length: lineCount }, (_) => ({
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(20, 25, 35, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated geometric lines
      linesRef.current.forEach((line, i) => {
        const offset = Math.sin(time + i * 0.5) * 50;
        ctx.strokeStyle = `rgba(100, 200, 255, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1 + offset, line.y1);
        ctx.lineTo(line.x2 - offset, line.y2);
        ctx.stroke();

        // Slowly move lines
        line.x1 += Math.sin(time * 0.5) * 0.1;
        line.y1 += Math.cos(time * 0.5) * 0.1;
        line.x2 += Math.cos(time * 0.5) * 0.1;
        line.y2 += Math.sin(time * 0.5) * 0.1;

        // Wrap around
        if (line.x1 < 0) line.x1 = canvas.width;
        if (line.x1 > canvas.width) line.x1 = 0;
        if (line.y1 < 0) line.y1 = canvas.height;
        if (line.y1 > canvas.height) line.y1 = 0;
        if (line.x2 < 0) line.x2 = canvas.width;
        if (line.x2 > canvas.width) line.x2 = 0;
        if (line.y2 < 0) line.y2 = canvas.height;
        if (line.y2 > canvas.height) line.y2 = 0;
      });

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
