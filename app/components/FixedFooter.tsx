'use client'
import { Home, BookOpen, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggleButton } from './ThemeToggleButton'
import Link from 'next/link'

export function FixedFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 md:hidden text-foreground">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
        
        <Link href="/livros">
          <Button variant="ghost" size="icon" className="rounded-full">
            <BookOpen className="h-4 w-4" />
          </Button>
        </Link>
        
        <ThemeToggleButton />
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-4 w-4" />
        </Button>
        
        <Link href="/livros/adicionar">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </footer>
  )
}