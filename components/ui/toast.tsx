'use client';

import { useToast, Toast as ToastType } from './toast-context';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const variantStyles = {
  success: {
    container: 'bg-green-100 dark:bg-green-900/90 border-green-300 dark:border-green-700',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-100',
    description: 'text-green-700 dark:text-green-200',
  },
  error: {
    container: 'bg-red-100 dark:bg-red-900/90 border-red-300 dark:border-red-700',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-100',
    description: 'text-red-700 dark:text-red-200',
  },
  warning: {
    container: 'bg-yellow-100 dark:bg-yellow-900/90 border-yellow-300 dark:border-yellow-700',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-100',
    description: 'text-yellow-700 dark:text-yellow-200',
  },
  info: {
    container: 'bg-blue-100 dark:bg-blue-900/90 border-blue-300 dark:border-blue-700',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-100',
    description: 'text-blue-700 dark:text-blue-200',
  },
};

function ToastItem({ toast }: { toast: ToastType }) {
  const { removeToast } = useToast();
  const Icon = iconMap[toast.variant];
  const styles = variantStyles[toast.variant];

  return (
    <div
      className={`
        ${styles.container}
        relative flex items-start gap-3 p-4 rounded-lg border shadow-lg
        animate-in slide-in-from-top-2 duration-300
        max-w-sm w-full pointer-events-auto
      `}
    >
      {/* Ícone */}
      <Icon className={`${styles.icon} h-5 w-5 mt-0.5 flex-shrink-0`} />
      
      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p className={`${styles.title} text-sm font-semibold`}>
          {toast.title}
        </p>
        {toast.description && (
          <p className={`${styles.description} text-sm mt-1`}>
            {toast.description}
          </p>
        )}
      </div>

      {/* Botão de fechar */}
      <button
        onClick={() => removeToast(toast.id)}
        className={`
          ${styles.icon} hover:opacity-70 transition-opacity
          p-1 rounded-md flex-shrink-0
        `}
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div 
      className="
        fixed top-16 right-0 z-50
        flex flex-col gap-2 p-4 
        max-h-screen overflow-hidden
        pointer-events-none
        sm:top-20 sm:right-4
        sm:max-w-md
      "
      aria-live="polite"
      aria-label="Notificações"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}