'use client';

import Slot from '@/components/slot';
import AboutContent from '@/components/aboutcontent';
import ContactContent from '@/components/contactcontent'; // Import ContactContent
import { useState } from 'react';

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false); // Add state for ContactContent

  return (
    <div className="relative h-screen overflow-hidden bg-transparent">
      {/* Slot Component */}
      <Slot 
        onAboutMeClick={() => setShowAbout(true)} 
        onContactClick={() => setShowContact(true)} // Show ContactContent when clicked
      />

      {/* AboutContent Draggable Popup */}
      {showAbout && (
        <AboutContent onClose={() => setShowAbout(false)} />
      )}

      {/* ContactContent Draggable Popup */}
      {showContact && (
        <ContactContent onClose={() => setShowContact(false)} /> // Show ContactContent when the state is true
      )}
    </div>
  );
}
