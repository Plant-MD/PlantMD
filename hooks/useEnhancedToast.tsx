'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { EnhancedToast, AlertVariant } from '@/components/ui/enhanced-alert';

interface ToastData {
  id: string;
  variant: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
  contextualIcon?: 'camera' | 'upload' | 'network' | 'default';
}

interface ToastContextType {
  showToast: (variant: AlertVariant, title: string, message: string, duration?: number, contextualIcon?: 'camera' | 'upload' | 'network' | 'default') => void;
  error: (title: string, message: string, duration?: number, contextualIcon?: 'camera' | 'upload' | 'network' | 'default') => void;
  success: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function EnhancedToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((variant: AlertVariant, title: string, message: string, duration = 5000, contextualIcon = 'default') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = { id, variant, title, message, duration, contextualIcon };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const error = useCallback((title: string, message: string, duration?: number, contextualIcon?: 'camera' | 'upload' | 'network' | 'default') => {
    showToast('error', title, message, duration, contextualIcon);
  }, [showToast]);

  const success = useCallback((title: string, message: string, duration?: number) => {
    showToast('success', title, message, duration);
  }, [showToast]);

  const warning = useCallback((title: string, message: string, duration?: number) => {
    showToast('warning', title, message, duration);
  }, [showToast]);

  const info = useCallback((title: string, message: string, duration?: number) => {
    showToast('info', title, message, duration);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, error, success, warning, info }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map(toast => (
          <EnhancedToast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            onDismiss={() => removeToast(toast.id)}
            duration={toast.duration}
            contextualIcon={toast.contextualIcon}
          >
            {toast.message}
          </EnhancedToast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useEnhancedToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useEnhancedToast must be used within an EnhancedToastProvider');
  }
  return context;
}

// Enhanced toast with contextual icons
export function useEnhancedToastWithContext() {
  const toast = useEnhancedToast();
  
  return {
    ...toast,
    uploadError: (title: string, message: string, duration?: number) => {
      toast.error(title, message, duration);
    },
    networkError: (title: string, message: string, duration?: number) => {
      toast.error(title, message, duration);
    },
    analysisError: (title: string, message: string, duration?: number) => {
      toast.error(title, message, duration);
    }
  };
}