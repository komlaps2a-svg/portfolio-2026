'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // WHY: Graceful Degradation. Deteksi layar HP. Jika di HP, matikan WebGL/Canvas untuk hemat baterai.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -100, y: -100 }; // Kursor di luar layar secara default

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Track mouse TANPA useState agar tidak memicu re-render reaktif React yang menghancurkan performa.
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop (Simulasi fluida/jejak sederhana)
    const render = () => {
      // Teknik alpha-blending untuk menciptakan efek 'trail' (jejak) yang perlahan menghilang.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gambar gelembung yang mengikuti kursor
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      // Warna biru elektrik khas startup/tech
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'; 
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(59, 130, 246, 1)';
      ctx.fill();
      ctx.closePath();

      // Reset shadow agar tidak mempengaruhi fillRect background
      ctx.shadowBlur = 0; 

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // WHY: Cleanup memory mutlak saat komponen mati.
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black md:bg-transparent"
    />
  );
}
