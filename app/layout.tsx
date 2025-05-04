import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FadeTransition from "@/components/fade-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#274472" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          backgroundColor: "#274472", 
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -1,
            background: `linear-gradient(45deg, white 25%, transparent 25%) 0 0,
              linear-gradient(-45deg, white 25%, transparent 25%) 0 0,
              linear-gradient(45deg, transparent 75%, white 75%) 0 0,
              linear-gradient(-45deg, transparent 75%, white 75%) 0 0`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0, 10px 10px, 10px 10px",
          }}
        ></div>

        <Header />

        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            borderLeft: "2px solid white",
            zIndex: 1,
          }}
        ></div>

        <main className="relative min-h-screen overflow-hidden">
          <FadeTransition>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {children}
            </div>
          </FadeTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
