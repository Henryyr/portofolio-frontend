// filepath: c:\Users\ASUS\my-portfolio\components\footer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 right-0 w-full flex justify-end items-center pointer-events-none"
      style={{
        background: '#fff',
        borderBottom: '4px solid #E0E0E0',
        height: '56px',
        minHeight: '56px',
      }}
    >
      <motion.img
  src="/footer.svg"
  alt="Footer"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.2 }}
  whileHover={{ scale: 1.05, rotate: 1 }}
  transition={{
    type: 'spring',
    stiffness: 120,
    damping: 18,
  }}
  className="pointer-events-auto"
  style={{
    width: '260px', // atau lebih besar jika masih kurang lebar
    height: 'auto',
    display: 'block',
  }}
/>
    </footer>
  );
}
