'use client';

import { useEffect, useState, useRef } from 'react';

export default function DraggableContainer({
  children,
  initialPos,
  title,
  onClose,
}: {
  children: React.ReactNode;
  initialPos: { x: number; y: number };
  title: string;
  onClose?: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>(initialPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: MouseEvent) => {
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
      ref={containerRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 50,
        minWidth: 260,
        maxWidth: '100vw',
        maxHeight: '100vh',
        background: '#fff',
        border: '2px solid #000',
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        userSelect: dragging ? 'none' : 'auto',
      }}
      className="shadow-lg"
    >
      <div
        className="flex items-center justify-between px-4 py-2 text-white rounded-t cursor-move select-none"
        style={{
          borderBottom: '2px solid #000',
          backgroundColor: '#274472',
          fontFamily: "var(--font-geist-mono), 'Fira Mono', monospace, sans-serif",
        }}
        onMouseDown={onMouseDown}
      >
        <span className="font-bold">{title.toUpperCase()}</span>
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-2 px-2 py-0.5 rounded bg-white text-black border border-black hover:bg-red-500 hover:text-white transition"
            style={{ fontWeight: 700, fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
