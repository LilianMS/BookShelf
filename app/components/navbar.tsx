"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button" 
import { useState } from "react";
import { Menu, X, PlusCircle, LibraryBig } from "lucide-react";
import { cn } from "@/lib/utils"; 

const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/livros", label: "Livros" }, 
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-green-200/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-green-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-green-900 transition-colors duration-300 hover:text-green-600">
                        <LibraryBig className="w-6 h-6" />
                        BookShelf 📚
                    </Link>
                    
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                    
                    
                    <nav className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            
                            return (
                                
                                <Link key={link.href} href={link.href} passHref legacyBehavior> 
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "text-green-800 hover:text-green-950 font-medium transition-colors duration-300",
                                            { "underline decoration-2 underline-offset-4": isActive }
                                        )}
                                    >
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}
                        
                        
                        <Link href="/livros/adicionar" passHref legacyBehavior>
                            <Button 
                                className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Adicionar Livro
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>
            
            
            {isMenuOpen && (
                <MobileMenu pathname={pathname} setIsMobileMenuOpen={setIsMenuOpen} />
            )}
        </>
    );
}

function MobileMenu({ pathname, setIsMobileMenuOpen }: { pathname: string; setIsMobileMenuOpen: (open: boolean) => void; }) {
    return (
        <div className="md:hidden border-t bg-green-200 px-4 py-2 space-y-2">
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "block py-3 px-2 rounded-md transition-colors text-green-800 hover:bg-green-300/50",
                        { "bg-green-300 font-semibold text-green-900": pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) }
                    )}
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                    }}
                >
                    {link.label}
                </Link>
            ))}
            
            <Link href="/livros/adicionar" passHref legacyBehavior> 
                <Button
                    className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Livro
                </Button>
            </Link>
        </div>
    );
}