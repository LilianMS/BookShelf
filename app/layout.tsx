import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import { FixedFooter } from './components/FixedFooter';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToastProvider } from '@/components/ui/toast-context';
import ToastContainer from '@/components/ui/toast';

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
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
            <FixedFooter />
            <ToastContainer />
            <footer className="w-full bg-green-50 dark:bg-green-950 text-center py-3 sm:py-4 text-green-700 dark:text-green-300 border-t border-green-200/50 dark:border-green-800/50">
              <p className="text-xs sm:text-sm">&copy; 2025 Leafly. Todos os direitos reservados.</p>
            </footer>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
