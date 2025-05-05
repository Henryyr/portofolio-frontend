'use client';

import { useEffect, useState } from 'react';
import DraggableContainer from '@/components/draggable-container';

export default function DesignContent({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Get center position
  const getCenterPosition = () => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const width = 720;
    const height = 600;
    const x = Math.max((window.innerWidth - width) / 2, 0);
    const y = Math.max((window.innerHeight - height) / 2, 0);
    return { x, y };
  };

  const [centerPos, setCenterPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    setCenterPos(getCenterPosition());
  }, []);


  return (
    <div>
      {centerPos && (
        <DraggableContainer initialPos={centerPos} title="Design" onClose={onClose}>
          <div
            className="w-[350px] sm:w-[480px] bg-white rounded-lg shadow-lg p-6 border border-gray-200 
              transition-all duration-700 ease-in-out"
            style={{
              fontFamily: "'Fira Mono', 'monospace', 'BOA-CONSTRUKTOR', sans-serif",
              minHeight: 220,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
          </div>
        </DraggableContainer>
      )}
    </div>
  );
}
