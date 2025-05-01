'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function Slot({ onAboutMeClick }: { onAboutMeClick?: () => void }) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glitchFont, setGlitchFont] = useState('');
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    if (hoveredIndex !== null) {
      const interval = setInterval(() => {
        const i = hoveredIndex % WORDS.length;
        setGlitchFont(getRandomFont());
        setGlitchText(getGlitchText(WORDS[i]));
      }, 80);
      return () => clearInterval(interval);
    } else {
      setGlitchFont('');
      setGlitchText('');
    }
  }, [hoveredIndex]);

  const fullList = [...WORDS, ...WORDS];

  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center"
      style={{
        height: 'calc(100vh - 52px - 56px)', // tinggi viewport dikurangi footer dan header
        marginTop: '56px', // mulai setelah header
        marginBottom: '52px', // berhenti sebelum footer
      }}
    >
      <div
        className="flex flex-col items-center animate-scroll-up"
        style={{
          animationDuration: '18s', // lebih lambat agar lebih besar
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {fullList.map((item, i) => (
          <div
            key={i}
            className="text-7xl font-extrabold font-boa my-10 px-6 transition-all duration-150 select-none"
            style={{
              fontFamily: "'BOA-CONSTRUKTOR', monospace, sans-serif",
              color: hoveredIndex === i && glitchFont ? '#FF1744' : '#fff',
              textShadow:
                hoveredIndex === i && glitchFont
                  ? '2px 2px 0 #000, 0 0 8px #2979FF, -2px -2px 0 #fff'
                  : '',
              cursor: item === 'About Me' ? 'pointer' : 'default',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (item === 'About Me') {
                onAboutMeClick ? onAboutMeClick() : router.push('/about');
              }
            }}
          >
            {hoveredIndex === i && glitchText ? glitchText : item}
          </div>
        ))}
      </div>

      <button
        onClick={() => (onAboutMeClick ? onAboutMeClick() : router.push('/about'))}
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-800 text-white rounded shadow-lg z-10 relative"
      >
        About me
      </button>

      {/* Tambahkan keyframes langsung di sini */}
      <style jsx>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(calc(100vh - 52px - 56px));
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-scroll-up {
          animation-name: scroll-up;
        }
      `}</style>
    </div>
  );
}
