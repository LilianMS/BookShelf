"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Image from "next/image";


const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/livros", label: "Biblioteca" },
  { href: "/livros#search", label: "Buscar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-green-50/95 dark:bg-green-950/95 shadow-md backdrop-blur border-b border-green-200/50 dark:border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-200 transition-colors duration-300 hover:text-green-600 dark:hover:text-green-300 flex items-center gap-2">
            <Image 
              src="/favicon-16x16.png" 
              alt="Leafly Logo" 
              width={24} 
              height={24}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
            Leafly
          </Link>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium transition-colors duration-300 ${pathname === link.href
                      ? "underline decoration-2 underline-offset-4 text-green-900 dark:text-green-100"
                      : ""
                    }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <ThemeToggleButton variant="navbar" />
            <Link href="/livros/add">
              <Button className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white transition-colors duration-300">
                Adicionar Livro
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu pathname={pathname} setIsMobileMenuOpen={setIsMenuOpen} />
      )}
    </>
  );
}

function MobileMenu({ pathname, setIsMobileMenuOpen }: { pathname: string; setIsMobileMenuOpen: (open: boolean) => void; }) {
  const [isLocalMobileMenuOpen, setIsLocalMobileMenuOpen] = useState(true);

  return (
    <>  
      {isLocalMobileMenuOpen && (
        <div 
          id="mobile-menu"
          role="navigation"
          aria-label="Menu de navegação mobile"
          className="md:hidden border-t border-green-200/50 dark:border-green-800/50 bg-green-50/95 dark:bg-green-950/95 px-4 py-3 space-y-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 px-3 rounded-md transition-colors text-base ${pathname === link.href
                  ? "bg-green-200 dark:bg-green-800 font-semibold text-green-900 dark:text-green-100"
                  : "text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 active:bg-green-200 dark:active:bg-green-800"
                }`}
              onClick={() => {
                setIsLocalMobileMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/livros/add">
            <Button
              className="w-full mt-3 py-3 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white text-base font-medium"
              onClick={() => {
                setIsLocalMobileMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
              aria-label="Ir para página de adicionar novo livro"
            >
              Adicionar Livro
            </Button>
          </Link>
        </div>)}
    </>
  );
}