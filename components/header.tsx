'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header
      className="w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4 fixed top-0 z-50 pointer-events-none"
      style={{
        background: '#fff',
        borderBottom: '4px solid #E0E0E0',
        height: '56px',
        minHeight: '56px',
      }}
    >
      <div className="cursor-pointer flex items-center justify-center pointer-events-auto">
        {/* Animated Image for Header with Hover Effect */}
        <motion.img
          src="/header.svg"
          alt="header"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          whileHover={{
            scale: 1.05, // Scale up slightly on hover
            rotate: 3,  // Add a slight rotation
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
          }}
          className="pointer-events-auto"
          style={{
            width: '12vw', // Width relative to viewport width for smaller screens
            maxWidth: '180px', // Cap max width
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Right: Social Icons + Toggle Button */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* GitHub */}
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
