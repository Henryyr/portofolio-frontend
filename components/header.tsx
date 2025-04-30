// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <header
      className="w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4 fixed top-0 z-50 pointer-events-none"
      style={{
        background: '#fff',
        borderBottom: '4px solid #E0E0E0', // abu-abu netral
        boxShadow: '0 4px 0 #888', // abu-abu shadow
        height: '56px',
        minHeight: '56px',
      }}
    >
      {/* Kiri: Icon + Nama */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        <img
          src="/globe.svg"
          alt="Globe"
          width={24}
          height={24}
          style={{ filter: 'drop-shadow(0 0 2px #2979FF)' }} // glitch biru
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
        <h1
          className="font-extrabold font-boa text-lg sm:text-2xl"
          style={{
            fontFamily: "'BOA-CONSTRUKTOR', monospace, sans-serif",
            color: '#000',
            background: '#fff',
            padding: '2px 8px',
            border: '2px solid #000',
            boxShadow: '2px 2px 0 #888',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          Henry Yusuf Rizaldy
        </h1>
      </div>

      {/* Kanan: Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center pointer-events-auto"
        style={{
          width: 36,
          height: 36,
          background: isDark ? '#000' : '#fff',
          border: '3px solid #888',
          borderRadius: 0,
          color: isDark ? '#fff' : '#000',
          boxShadow: '2px 2px 0 #E0E0E0',
          transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
        }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <img src="/file.svg" alt="Dark Mode" width={22} height={22} style={{ filter: 'invert(100%) drop-shadow(0 0 2px #FF1744)' }} />
        ) : (
          <img src="/globe.svg" alt="Light Mode" width={22} height={22} style={{ filter: 'drop-shadow(0 0 2px #2979FF)' }} />
        )}
      </button>
    </header>
  );
}
