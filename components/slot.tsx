'use client';

import { useEffect, useState, useRef } from 'react';

const glitchFonts = [
  'monospace',
  'cursive',
  'fantasy',
  'serif',
  'sans-serif',
  '"Press Start 2P", cursive',
  '"Share Tech Mono", monospace',
];

function getRandomFont() {
  return glitchFonts[Math.floor(Math.random() * glitchFonts.length)];
}

function getGlitchText(text: string) {
  const chars = '!@#$%^&*()_+-=~';
  return text
    .split('')
    .map((c) => (Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : c))
    .join('');
}

const WORDS = ['Portofolio', 'Project', 'About Me', 'Contact', 'Music', 'Design'];

interface SlotProps {
  onAboutMeClick?: () => void;
  onContactClick?: () => void;
}

export default function Slot({ onAboutMeClick, onContactClick }: SlotProps) {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glitchFont, setGlitchFont] = useState('');
  const [glitchText, setGlitchText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const interval = setInterval(() => {
        setGlitchFont(getRandomFont());
        setGlitchText(getGlitchText(WORDS[hoveredIndex % WORDS.length]));
      }, 80);
      return () => clearInterval(interval);
    } else {
      setGlitchFont('');
      setGlitchText('');
    }
  }, [hoveredIndex]);

  // Create a duplicate list for infinite scrolling
  const fullList = [...WORDS, ...WORDS, ...WORDS]; // Triple the list for smoother scrolling

  return (
    <div className="relative overflow-hidden w-full flex flex-col items-start px-8"
      style={{
        height: 'calc(100vh - 52px - 56px)', // height minus footer and header
        marginTop: '56px',
        marginBottom: '52px',
        overflowY: 'hidden', // Prevent scrolling on mobile or dragging
      }}
    >
      <div 
        ref={scrollRef}
        className="flex flex-col items-start animate-infinite-scroll"
      >
        {fullList.map((item, i) => (
          <div
            key={i}
            className="text-5xl md:text-7xl font-extrabold my-4 px-6 transition-all duration-150 select-none text-left"
            style={{
              fontFamily: "'BOA-CONSTRUKTOR', monospace, sans-serif",
              color: hoveredIndex === i && glitchFont ? '#000' : '#fff',
              textShadow:
                hoveredIndex === i && glitchFont
                  ? `0 0 5px ${glitchFont}, 0 0 10px ${glitchFont}, 0 0 15px ${glitchFont}`
                  : 'none',
              cursor: (item === 'About Me' || item === 'Contact') ? 'pointer' : 'default',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (item === 'About Me') {
                onAboutMeClick ? onAboutMeClick() : window.location.href = '/about';
              }
              if (item === 'Contact') {
                onContactClick ? onContactClick() : window.location.href = '/contact';
              }
            }}
          >
            {hoveredIndex === i && glitchText ? glitchText : item}
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
