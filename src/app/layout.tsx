import './globals.css';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import Provider from '@/providers/Provider';

// 👇 Configure our font object
const montSerrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Serverless Auction',
  description: 'Serverless using AWS services and Next js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={montSerrat.className}>
        <Provider>
          <main className='container mx-auto h-full max-w-7xl pt-12'>
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}
