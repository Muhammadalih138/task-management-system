import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskSync - Task Management System",
  description: "Atomic component-driven task management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Stripped out the font class variable to completely stop font file generation */}
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
