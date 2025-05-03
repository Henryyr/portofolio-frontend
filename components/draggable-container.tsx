'use client';

import { useEffect, useState } from 'react';

export default function DraggableContainer({
  children,
  initialPos,
  title,
}: {
  children: React.ReactNode;
  initialPos: { x: number; y: number };
  title: string;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>(initialPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: globalThis.MouseEvent) => {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, offset]);

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 20,
        maxWidth: '100vw',
        maxHeight: '100vh',
        background: '#fff',
        border: '2px solid #000',
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}
    >
      <div
        className="cursor-move select-none"
        style={{
          width: '100%',
          height: 32,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          background: '#274472',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          fontWeight: 600,
          fontFamily: "var(--font-geist-mono), 'Fira Mono', 'monospace', sans-serif",
          userSelect: 'none',
          borderBottom: '2px solid #000',
        }}
        onMouseDown={onMouseDown}
      >
        {title.toUpperCase()}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
