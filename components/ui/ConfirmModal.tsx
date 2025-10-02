'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
  variant = 'danger'
}: ConfirmModalProps) {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      confirmButton: 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white',
      icon: 'text-red-600 dark:text-red-400'
    },
    warning: {
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white',
      icon: 'text-yellow-600 dark:text-yellow-400'
    },
    info: {
      confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white',
      icon: 'text-blue-600 dark:text-blue-400'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="
          relative w-full max-w-md 
          bg-card border border-border rounded-lg shadow-xl
          transform transition-all duration-200
          animate-in zoom-in-95 fade-in-0
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-card-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="
              p-1 rounded-md text-muted-foreground hover:text-card-foreground 
              hover:bg-muted transition-colors disabled:opacity-50
            "
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {description && (
            <p id="modal-description" className="text-muted-foreground mb-6">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 sm:justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="
                px-4 py-2 text-sm font-medium rounded-md
                bg-secondary text-secondary-foreground
                hover:bg-secondary/80 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${styles.confirmButton}
              `}
            >
              {isLoading ? 'Processando...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}