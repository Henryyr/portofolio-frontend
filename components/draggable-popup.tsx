'use client';

import { useEffect, useState, useRef } from 'react';

export default function DraggablePopup({
  title,
  items,
  onClose,
  initialPos,
}: {
  title: string;
  items: string[];
  onClose: () => void;
  initialPos?: { x: number; y: number };
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>(initialPos ?? { x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

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
      ref={popupRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 50,
        minWidth: 260,
        background: '#fff',
        border: '2px solid #000',
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        userSelect: dragging ? 'none' : 'auto',
      }}
      className="shadow-lg"
      onMouseMove={(e) => e.stopPropagation()} // Prevent drag during mousemove inside popup
    >
      <div
        className="flex items-center justify-between px-4 py-2 text-white rounded-t cursor-move select-none"
        style={{
          borderBottom: '2px solid #000',
          backgroundColor: '#274472',
        }}
        onMouseDown={onMouseDown}
      >
        <span className="font-bold">{title}</span>
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-2 px-2 py-1 rounded bg-white text-black border border-black hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
            style={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1,
              borderRadius: '4px', // Square shape, not rounded
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            ×
          </button>
        )}
      </div>
      <ul className="p-4 space-y-2 font-mono text-base text-black">
        {items.map((item) => (
          <li key={item} className="px-2 py-1 rounded hover:bg-gray-100">{item}</li>
        ))}
      </ul>
    </div>
  );
}
