import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepWise Lite",
  description: "AI-powered study plan generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-indigo-600">
            📚 PrepWise Lite
          </a>
          
          <a href="/plans" className="text-sm font-medium text-gray-600 hover:text-indigo-600
             My Plans
           </a>
        </nav>
        <main className="max-w-2xl mx-auto px-4 py-10">
          {children}
        </main>
      </body>
    </html>
  )}