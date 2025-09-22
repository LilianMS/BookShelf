import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Leafly",
  description: "Gerencie sua biblioteca pessoal com Leafly 🌿",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="w-full bg-green-100 text-center py-3 sm:py-4 mt-6 sm:mt-8 text-green-800">
          <p className="text-xs sm:text-sm">&copy; 2025 Leafly. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
