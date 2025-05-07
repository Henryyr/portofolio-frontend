'use client';

import { useState } from 'react';

const WORDS = ['Portofolio', 'Project', 'About Me', 'Contact', 'Music', 'Design'];

interface SlotProps {
  onAboutMeClick?: () => void;
  onContactClick?: () => void;
  onDesignClick?: () => void;
}

export default function Slot({ onAboutMeClick, onContactClick, onDesignClick }: SlotProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fullList = [...WORDS, ...WORDS, ...WORDS]; // Triple list for scroll illusion

  return (
    <div
      className="relative overflow-hidden w-full flex flex-col items-start px-8"
      style={{
        height: 'calc(100vh - 52px - 56px)',
        marginTop: '56px',
        marginBottom: '52px',
        overflowY: 'hidden',
      }}
    >
      <div className="flex flex-col items-start animate-infinite-scroll">
        {fullList.map((item, i) => (
          <div
            key={i}
            className="text-5xl md:text-7xl font-extrabold my-4 px-6 transition-transform duration-200 ease-in-out select-none text-left"
            style={{
              color: '#fff',
              transform: hoveredIndex === i ? 'scale(1.1)' : 'scale(1)',
              cursor: item === 'About Me' || item === 'Contact' || item === 'Design' ? 'pointer' : 'default',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (item === 'About Me') {
                onAboutMeClick ? onAboutMeClick() : (window.location.href = '/about');
              }
              if (item === 'Contact') {
                onContactClick ? onContactClick() : (window.location.href = '/contact');
              }
              if (item === 'Design') {
                onDesignClick ? onDesignClick() : (window.location.href = '/design');
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-100% / 3));
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
