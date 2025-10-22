import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AXION SCIENTIFICS - Empowering Animal Health Naturally',
  description: 'Herbal Feed Supplements for Poultry, Aqua, Dairy & Meat Animals. Where Science Meets Nature.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

