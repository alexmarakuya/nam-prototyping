import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAM Studio - Multi-Stakeholder Prototyping",
  description: "Interactive prototyping platform with stakeholder-specific branding and experiences",
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
