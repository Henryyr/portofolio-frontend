// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

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
        <button
          type="button"
          aria-label="Home"
          onClick={() => router.push('/')}
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
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '32px',
          }}
          className="font-extrabold font-boa text-lg sm:text-2xl hover:scale-105 transition-transform"
        >
          <AnimatePresence mode="wait" initial={false}>
            {pathname === '/' ? (
              <motion.span
                key="portfolio"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Portfolio
              </motion.span>
            ) : (
              <motion.span
                key="homeicon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {/* Simple Home Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                  aria-hidden="true"
                >
                  <path d="M3 12L12 3l9 9" />
                  <path d="M9 21V9h6v12" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Kanan: Social Icons + Toggle Button */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* Github */}
        <a
          href="https://github.com/henryyr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:scale-110 transition-transform"
          style={{
            width: '32px',
            height: '32px',
          }}
        >
          <img
            src="/github.gif"
            alt="GitHub"
            width={32}
            height={32}
          />
        </a>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/henryyusufrizaldy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:scale-110 transition-transform"
        >
          <img
            src="/linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
          />
        </a>
        {/* Instagram */}
        <a
          href="https://instagram.com/henryyr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:scale-110 transition-transform"
        >
          <img
            src="/instagram.svg"
            alt="Instagram"
            width={32}
            height={32}
          />
        </a>
      </div>
    </header>
  );
}
