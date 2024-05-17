import type { Metadata } from 'next';
import { Providers } from './providers';
import { fonts } from './fonts';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'RBR Digital',
  description: 'Gerencialmento de funcionários.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
