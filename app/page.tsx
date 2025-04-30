'use client';

import Slot from '@/components/slot';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Slot />
    </div>
  );
}
