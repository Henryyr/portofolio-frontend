'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function FadeTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Using pathname correctly
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevChildrenRef = useRef(children);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prevChildrenRef.current === children) return; // No need to transition if children haven't changed

    setFadeState('out');
    timeoutRef.current = setTimeout(() => {
      setDisplayChildren(children);
      prevChildrenRef.current = children;
      setFadeState('in');
    }, 250);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname, children]); // Add children to the dependencies array

  return (
    <div className={`fade-wrapper${fadeState === 'in' ? ' fade-in' : ' fade-out'}`}>
      {displayChildren}
      <style jsx global>{`
        .fade-wrapper {
          transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1);
          opacity: 1;
        }
        .fade-in {
          opacity: 1;
          pointer-events: auto;
        }
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
