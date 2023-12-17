import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// comoponents
import { Header } from '@/components/Header';
import ToastProvider from '@/providers/ToastProvider';

// state

// constants and functions
import { APP_NAME, APP_DESCRIPTION } from '@/constants';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex  min-h-screen w-screen flex-col">
          <ToastProvider />
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
