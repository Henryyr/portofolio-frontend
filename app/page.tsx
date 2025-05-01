'use client';

import { useEffect, useState, useRef } from 'react';
import Slot from '@/components/slot';
import { useRouter } from 'next/navigation';

// Otomatisasi: generate nama file bg.jpg, bg2.jpg, ..., bg5.jpg
const bgCount = 5;
const backgrounds = Array.from({ length: bgCount }, (_, i) =>
  i === 0 ? '/bg.jpg' : `/bg${i + 1}.jpg`
);

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const router = useRouter();
  const bgLen = useRef(backgrounds.length);

  const handleAboutMeClick = () => {
    router.push('/about');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgLen.current);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Slot Component */}
      <Slot onAboutMeClick={handleAboutMeClick} />
    </div>
  );
}
