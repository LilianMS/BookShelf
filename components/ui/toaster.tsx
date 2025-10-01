'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import * as React from 'react';
import { useToast } from "@/lib/services/use-toast" 
import { Loader2, CheckCircle, XCircle } from "lucide-react" 

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        let Icon = null;
        const isloading = variant === 'loading';
        
        if (isloading) {
            Icon = <Loader2 className="mr-3 h-5 w-5 animate-spin" />;
        } else if (variant === 'success' || variant === 'default') {
            Icon = <CheckCircle className="mr-3 h-5 w-5" />;
        } else if (variant === 'destructive') {
            Icon = <XCircle className="mr-3 h-5 w-5" />;
        }
       

        return (
          <Toast key={id} variant={variant} {...props} className={isloading ? 'min-w-[200px]' : ''}>
            <div className="grid gap-1">
              <ToastTitle>
                <div className="flex items-center">
                  {Icon}
                  {title}
                </div>
              </ToastTitle>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>        
            {action && React.isValidElement(action) ? action : null} 
            {!isloading && <ToastClose />} 
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
