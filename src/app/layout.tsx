// apps/web/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { VoiceNavigation } from '@/components/rural/VoiceNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dream2Skill AI - Learn Skills for Rural India',
  description: 'AI-powered education platform for rural India with multi-language support and offline learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <main className="pt-16">
              {children}
            </main>
            <VoiceNavigation />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}