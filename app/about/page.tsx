'use client';

import { useEffect, useRef, useState } from 'react';
import DraggablePopup from '@/components/draggable-popup';
import DraggableContainer from '@/components/draggable-container';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [popups, setPopups] = useState<Array<'Frontend' | 'Backend' | 'Mobile'>>([]);
  const [popupPositions, setPopupPositions] = useState<Record<string, { x: number; y: number }>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skillData: Record<'Frontend' | 'Backend' | 'Mobile', string[]> = {
    Frontend: ['Next.js', 'Nuxt.js', 'React'],
    Backend: ['Golang', 'Express.js', 'Nest.js'],
    Mobile: ['Flutter'],
  };

  // Get random popup position
  const getRandomPosition = () => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    const x = Math.floor(Math.random() * (vw - 320)) + 40;
    const y = Math.floor(Math.random() * (vh - 220)) + 40;
    return { x, y };
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-24">
      {/* Easter Egg */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.85,
        }}
        aria-label="Easter Egg Emote"
      >
        😛
      </div>

      {centerPos && (
        <DraggableContainer initialPos={centerPos} title="About-Me">
          <div
            ref={contentRef}
            className="max-w-3xl w-full"
            style={{
              transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05) inset',
              padding: '2rem',
              color: '#000',
            }}
          >

            <div
              className="space-y-6 text-lg"
              style={{
                fontFamily: "var(--font-geist-mono), 'Fira Mono', 'monospace', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: '1.5',
                textAlign: 'justify',
              }}
            >
              <p>
                Hi, I'm <span
                  className="font-bold inline-block transition-transform duration-[1500ms] ease-in"
                  style={{
                    cursor: isDropped ? 'default' : 'pointer',
                    transform: isDropped ? 'translateY(120vh)' : 'none',
                  }}
                  onMouseEnter={() => {
                    if (!isDropped) setIsDropped(true);
                  }}
                >Henry Yusuf Rizaldy</span>! Welcome to my portfolio.
              </p>

              <p>
                I am a web and mobile developer with a strong focus on building modern, high-performance applications using technologies like React, Next.js, Nuxt.js, TypeScript, Golang, Express.js, Nest.js, and Flutter. I enjoy crafting clean, maintainable code and designing intuitive user interfaces that deliver great user experiences.
              </p>

              <p>
                My expertise covers both frontend and backend development, allowing me to create full-stack solutions from idea to deployment. I am passionate about UI/UX, creative coding, and always exploring new technologies. Besides coding, I also love making music as a hobby.
              </p>

              <div className="flex flex-row gap-6 justify-center items-center px-4">
  {(['Frontend', 'Backend', 'Mobile'] as const).map((cat) => (
    <button
      key={cat}
      className="font-bold text-lg w-[250px] px-6 py-3 bg-white hover:bg-[#274472] hover:text-white transition-all duration-150 cursor-pointer border-2 border-black rounded-md"
      onClick={() => {
        if (!popups.includes(cat)) {
          setPopups((prev) => [...prev, cat]);
          setPopupPositions((prev) => ({
            ...prev,
            [cat]: getRandomPosition(),
          }));
        }
      }}
      style={{
        fontFamily: "var(--font-geist-mono), 'Fira Mono', 'monospace', sans-serif",
      }}
    >
      {cat}
    </button>
  ))}
</div>
            </div>
          </div>
        </DraggableContainer>
      )}

      {popups.map((cat) => (
        <DraggablePopup
          key={cat}
          title={cat}
          items={skillData[cat]}
          onClose={() => setPopups((prev) => prev.filter((c) => c !== cat))}
          initialPos={popupPositions[cat] || getRandomPosition()}
        />
      ))}
    </div>
  );
}
