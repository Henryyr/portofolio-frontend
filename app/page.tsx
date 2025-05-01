'use client';

import { useRouter } from 'next/navigation';
import Slot from '@/components/slot';

export default function Home() {
  const router = useRouter();

  const handleAboutMeClick = () => {
    router.push('/about');
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Slot Component */}
      <Slot onAboutMeClick={handleAboutMeClick} />
    </div>
  );
}
