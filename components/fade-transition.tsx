'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FadeTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={`fade-wrapper${show ? ' fade-in' : ' fade-out'}`}>
      {children}
      <style jsx global>{`
        .fade-wrapper {
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
          opacity: 1;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
