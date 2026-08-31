import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Excubitor SAST",
  description: "Security Testing Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen relative overflow-x-hidden antialiased selection:bg-yellow-500/30 selection:text-white">
        
        {/* Subtle Edge-to-Edge Wireframe Grid Pattern */}
        <div className="fixed inset-0 bg-wireframe-grid pointer-events-none z-0" />

        {/* Screen-wide CSS Noise / Grain Overlay */}
        <div className="fixed inset-0 bg-grain-noise opacity-[0.04] pointer-events-none z-50 mix-blend-screen" />

        {children}
      </body>
    </html>
  );
}