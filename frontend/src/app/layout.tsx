import type { Metadata } from 'next';
import { fonts } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import ClientProvider from '@/providers/index.';

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
        <Header />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
