// filepath: c:\Users\ASUS\my-portfolio\components\footer.tsx
'use client';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 right-0 w-full flex justify-end items-center pointer-events-none"
      style={{
        background: '#fff',
        borderTop: '4px solid #E0E0E0',
        boxShadow: '0 -4px 0 #888',
        zIndex: 50,
        height: '52px',
        minHeight: '52px',
      }}
    >
      <div
        className="text-xs sm:text-sm text-right font-bold pointer-events-auto pr-3 sm:pr-8 hover:scale-105 transition-transform"
        style={{
          color: '#000',
          background: '#fff',
          border: '2px solid #000',
          padding: '6px 10px',
          boxShadow: '2px 2px 0 #2979FF', // glitch biru
          textTransform: 'uppercase',
          letterSpacing: '1px',
          maxWidth: '90vw',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        &copy; {new Date().getFullYear()} &mdash; Henry Yusuf Rizaldy / Portfolio
      </div>
    </footer>
  );
}
