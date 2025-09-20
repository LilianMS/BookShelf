"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"


const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/livros", label: "Biblioteca" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-green-200/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-green-200/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-900 transition-colors duration-300 hover:text-green-600">
          Leafly 🌿
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={`text-green-800 hover:text-green-950 font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300">
            Adicionar Livro
          </Button>
        </nav>
      </div>
    </header>
  );
}