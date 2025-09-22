import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Button simples para laboratório
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LabButton({ 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  // Variants com cores Tailwind puras
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    destructive: "bg-red-600 text-white hover:bg-red-700", 
    outline: "border border-slate-300 bg-white hover:bg-slate-50",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    ghost: "hover:bg-slate-100 text-slate-900",
    link: "text-blue-600 underline-offset-4 hover:underline bg-transparent"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-9 px-4",
    lg: "h-10 px-6",
    icon: "h-9 w-9"
  };

  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant styles
        variants[variant],
        // Size styles  
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Card simples para laboratório
interface CardProps {
  children: ReactNode;
  className?: string;
}

export function LabCard({ children, className = '' }: CardProps) {
  return (
    <div className={cn(
      "rounded-lg border border-slate-200 bg-white shadow-sm",
      className
    )}>
      {children}
    </div>
  );
}

export function LabCardHeader({ children, className = '' }: CardProps) {
  return (
    <div className={cn("p-6 pb-0", className)}>
      {children}
    </div>
  );
}

export function LabCardTitle({ children, className = '' }: CardProps) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function LabCardContent({ children, className = '' }: CardProps) {
  return (
    <div className={cn("p-6 pt-4", className)}>
      {children}
    </div>
  );
}

export function LabCardFooter({ children, className = '' }: CardProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}
