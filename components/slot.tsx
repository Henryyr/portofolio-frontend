'use client';

import { useEffect, useState } from 'react';

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
  // Simple glitch: randomly replace some chars with symbols
  const chars = '!@#$%^&*()_+-=~';
  return text
    .split('')
    .map((c) => (Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : c))
    .join('');
}

export default function Slot() {
  const [slotItems, setSlotItems] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glitchFont, setGlitchFont] = useState<string>('');
  const [glitchText, setGlitchText] = useState<string>('');

  const generateRandomText = () => {
    const words = ['Portofolio', 'Project', 'About Me', 'Contact', 'Music', 'Design'];
    return Array.from({ length: 1 }, () => words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    setSlotItems(generateRandomText());

    const interval = setInterval(() => {
      setSlotItems(generateRandomText());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Glitch effect on hover
  useEffect(() => {
    if (hoveredIndex !== null) {
      const interval = setInterval(() => {
        setGlitchFont(getRandomFont());
        setGlitchText(getGlitchText(slotItems[0] || ''));
      }, 80);
      return () => clearInterval(interval);
    } else {
      setGlitchFont('');
      setGlitchText('');
    }
  }, [hoveredIndex, slotItems]);

  return (
    <div className="overflow-hidden h-full w-full">
      <div className="slot-scroll flex flex-col items-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="slot-item transition-all duration-150 font-extrabold text-2xl font-boa"
            style={{
              fontFamily: "'BOA-CONSTRUKTOR', monospace, sans-serif",
              color: hoveredIndex === i && glitchFont ? '#FF1744' : '#fff',
              textShadow: hoveredIndex === i && glitchFont ? '2px 2px 0 #000, 0 0 8px #2979FF, -2px -2px 0 #fff' : '',
              padding: '4px 16px',
              margin: '6px 0',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i && glitchText ? glitchText : slotItems[0]}
          </div>
        ))}
      </div>
    </div>
  );
}
