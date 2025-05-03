'use client';

import { useRouter } from 'next/navigation';
import Slot from '@/components/slot';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about');
    router.push('/contact');
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Slot Component */}
      <Slot onAboutMeClick={() => router.push('/about')} onContactClick={() => router.push('/contact')} />
      
    </div>
  );
}
