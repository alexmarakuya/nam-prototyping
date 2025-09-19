import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAM Prototype - Support Ticket Interface",
  description: "AI-powered support ticket interface with smart response generation",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
