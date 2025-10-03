'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleButtonProps {
  variant?: 'default' | 'navbar'
}

export function ThemeToggleButton({ variant = 'default' }: ThemeToggleButtonProps) {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />
      case 'dark': return <Moon className="h-4 w-4" />
      case 'system': return <Monitor className="h-4 w-4" />
    }
  }

  const getClassName = () => {
    if (variant === 'navbar') {
      return "rounded-full text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-100 dark:hover:bg-green-900/30"
    }
    return "rounded-full" // Estilo padrão para footer
  }

  const getAriaLabel = () => {
    switch (theme) {
      case 'light': return 'Mudar para tema escuro'
      case 'dark': return 'Mudar para tema do sistema'
      case 'system': return 'Mudar para tema claro'
      default: return 'Alternar tema'
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={getClassName()}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </Button>
  )
}