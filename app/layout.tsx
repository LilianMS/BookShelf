import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import { FixedFooter } from './components/FixedFooter';
import { ThemeProvider } from '@/hooks/useTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Leafly",
  description: "Gerencie sua biblioteca pessoal com Leafly 🌿",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <FixedFooter />
          <footer className="w-full bg-green-100 dark:bg-green-900 text-center py-3 sm:py-4 mt-6 sm:mt-8 text-green-800 dark:text-green-200">
            <p className="text-xs sm:text-sm">&copy; 2025 Leafly. Todos os direitos reservados.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
