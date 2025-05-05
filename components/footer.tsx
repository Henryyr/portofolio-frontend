'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 right-0 w-full flex justify-end items-center pointer-events-none"
      style={{
        background: '#fff',
        height: '56px',
        minHeight: '56px',
      }}
    >
      <motion.div
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
      >
        <Image
          src="/footer.svg"
          alt="Footer"
          width={260}
          height={200} // Specify a fixed height if needed
        />
      </motion.div>
    </footer>
  );
}
