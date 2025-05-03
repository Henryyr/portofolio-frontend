'use client';

import { useEffect, useState } from 'react';
import DraggableContainer from '@/components/draggable-container';

export default function ContactPage() {
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

  const emailAddress = 'henry.360420@gmail.com';
  const subject = 'Let\'s Connect!';
  const body = `Hi Henry,

I would like to get in touch with you regarding your portfolio.

Best regards,
[Your Name]`;

  // Gmail compose link format
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div>
      {centerPos && (
        <DraggableContainer initialPos={centerPos} title="Contact Me">
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
            <div className="mb-4">
              <span className="block text-gray-700 font-semibold">To:</span>
              <span className="block text-base sm:text-lg text-blue-700 font-mono select-all">
                {emailAddress}
              </span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 font-semibold">Subject:</span>
              <span className="block text-base sm:text-lg text-gray-800 font-mono">
                {subject}
              </span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 font-semibold">Message:</span>
              <div className="mt-2 text-base sm:text-lg text-gray-900 font-mono whitespace-pre-line">
                {body}
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href={gmailLink} // Gmail compose link
                target="_blank"  // Open in a new tab
                rel="noopener noreferrer"  // Security measure for opening in new tab
                className="inline-block px-4 py-2 bg-[#274472] text-white rounded hover:bg-[#1f3b5a] transition"
                >                Send Email
              </a>
            </div>
          </div>
        </DraggableContainer>
      )}
    </div>
  );
}
