'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // WHY: Inisialisasi Lenis untuk menormalkan scroll lintas perangkat.
    // Membantu GSAP ScrollTrigger bekerja dengan presisi inersia.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // WHY: Aturan Mutlak Performa - Mencegah memory leak saat root di-unmount.
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
