"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";


const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/livros", label: "Biblioteca" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-green-200/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-green-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-green-900 transition-colors duration-300 hover:text-green-600">
            Leafly 🌿
          </Link>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-green-800 hover:text-green-950 font-medium transition-colors duration-300 ${pathname === link.href
                      ? "underline decoration-2 underline-offset-4"
                      : ""
                    }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <ThemeToggleButton />
            <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300">
              Adicionar Livro
            </Button>
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
        <div className="md:hidden border-t bg-green-200 px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 px-2 rounded-md transition-colors ${pathname === link.href
                  ? "bg-green-300 font-semibold text-green-900"
                  : "text-green-800 hover:bg-green-300/50"
                }`}
              onClick={() => {
                setIsLocalMobileMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              setIsLocalMobileMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          >
            Adicionar Livro
          </Button>
        </div>)}
    </>
  );
}