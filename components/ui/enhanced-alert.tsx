"use client";

import React from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Info,
  X,
  RefreshCw,
  Camera,
  Upload,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "error" | "warning" | "success" | "info";

interface EnhancedAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
  showMascot?: boolean;
  contextualIcon?: "camera" | "upload" | "network" | "default";
}

const alertVariants = {
  error: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800/50",
    text: "text-red-800 dark:text-red-200",
    icon: XCircle,
    iconColor: "text-red-600 dark:text-red-400",
    actionBg:
      "bg-red-100 hover:bg-red-200 dark:bg-red-800/50 dark:hover:bg-red-800/70",
    actionText: "text-red-700 dark:text-red-200",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800/50",
    text: "text-amber-800 dark:text-amber-200",
    icon: AlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
    actionBg:
      "bg-amber-100 hover:bg-amber-200 dark:bg-amber-800/50 dark:hover:bg-amber-800/70",
    actionText: "text-amber-700 dark:text-amber-200",
  },
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800/50",
    text: "text-emerald-800 dark:text-emerald-200",
    icon: CheckCircle,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    actionBg:
      "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800/50 dark:hover:bg-emerald-800/70",
    actionText: "text-emerald-700 dark:text-emerald-200",
  },
  info: {
    bg: "bg-forest/5 dark:bg-forest/10",
    border: "border-forest/20 dark:border-forest/30",
    text: "text-forest dark:text-mint",
    icon: Info,
    iconColor: "text-forest dark:text-mint",
    actionBg:
      "bg-forest/10 hover:bg-forest/20 dark:bg-mint/20 dark:hover:bg-mint/30",
    actionText: "text-forest dark:text-mint",
  },
};

const contextualIcons = {
  camera: Camera,
  upload: Upload,
  network: WifiOff,
  default: undefined,
};

export function EnhancedAlert({
  variant = "error",
  title,
  children,
  onDismiss,
  onRetry,
  retryText = "Try Again",
  className,
  showMascot = false,
  contextualIcon = "default",
}: EnhancedAlertProps) {
  const config = alertVariants[variant];
  const IconComponent = config.icon;
  const ContextualIcon = contextualIcons[contextualIcon];

  return (
    <div
      className={cn(
        config.bg,
        config.border,
        config.text,
        "border rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md font-poppins",
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Main Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <IconComponent className={cn("h-5 w-5", config.iconColor)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
          <div className="text-sm leading-relaxed mb-3">{children}</div>

          {/* Contextual hint with icon */}
          {ContextualIcon && (
            <div className="flex items-center gap-2 text-xs opacity-75 mb-3">
              <ContextualIcon className="h-3 w-3" />
              <span>
                {contextualIcon === "camera" &&
                  "Make sure your browser allows camera permissions"}
                {contextualIcon === "upload" &&
                  "Supported formats: JPG, PNG (max 10MB)"}
                {contextualIcon === "network" &&
                  "Check your internet connection and try again"}
              </span>
            </div>
          )}

          {/* Action buttons */}
          {(onRetry || onDismiss) && (
            <div className="flex items-center gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    config.actionBg,
                    config.actionText
                  )}
                >
                  <RefreshCw className="h-3 w-3" />
                  {retryText}
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dismiss X button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Enhanced Toast Component
interface EnhancedToastProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  autoClose?: boolean;
  duration?: number;
  contextualIcon?: "camera" | "upload" | "network" | "default";
}

export function EnhancedToast({
  variant = "error",
  title,
  children,
  onDismiss,
  autoClose = true,
  duration = 5000,
  contextualIcon = "default",
}: EnhancedToastProps) {
  const toastVariants = {
    error: "bg-red-600 text-white border-red-700",
    warning: "bg-amber-600 text-white border-amber-700",
    success: "bg-forest text-white border-forest",
    info: "bg-mint text-white border-mint",
  };

  const ContextualIcon = contextualIcons[contextualIcon];

  React.useEffect(() => {
    if (autoClose && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onDismiss, duration]);

  return (
    <div
      className={cn(
        toastVariants[variant],
        "border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform animate-in slide-in-from-top-5 font-poppins"
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {ContextualIcon && (
          <div className="flex-shrink-0 mt-0.5">
            <ContextualIcon className="h-4 w-4 text-white/80" />
          </div>
        )}
        <div className="flex-1">
          {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
          <p className="text-sm opacity-90">{children}</p>

          {/* Contextual hint */}
          {ContextualIcon && (
            <p className="text-xs opacity-70 mt-1">
              {contextualIcon === "camera" && "Check camera permissions"}
              {contextualIcon === "upload" && "Supported: JPG, PNG (max 10MB)"}
              {contextualIcon === "network" && "Check your connection"}
            </p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Form Error Component
interface EnhancedFormErrorProps {
  errors: Record<string, string>;
  className?: string;
}

export function EnhancedFormError({
  errors,
  className = "",
}: EnhancedFormErrorProps) {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {Object.entries(errors).map(([field, message]) => (
        <div
          key={field}
          className="flex items-start gap-2 text-red-600 dark:text-red-400"
        >
          <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      ))}
    </div>
  );
}

// Empty/Error State Components
interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "error" | "warning" | "info";
}

export function EmptyState({
  icon: IconComponent = WifiOff,
  title,
  description,
  action,
  variant = "info",
}: EmptyStateProps) {
  const iconBgVariants = {
    error: "bg-red-100 dark:bg-red-900/30",
    warning: "bg-amber-100 dark:bg-amber-900/30",
    info: "bg-forest/10 dark:bg-forest/20",
  };

  const iconColorVariants = {
    error: "text-red-600 dark:text-red-400",
    warning: "text-amber-600 dark:text-amber-400",
    info: "text-forest dark:text-mint",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 font-poppins">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
          iconBgVariants[variant]
        )}
      >
        <IconComponent className={cn("h-8 w-8", iconColorVariants[variant])} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors text-sm font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Loading State Component
interface LoadingStateProps {
  message?: string;
  progress?: number;
  showProgress?: boolean;
}

export function LoadingState({
  message = "Analyzing plant image...",
  progress = 67,
  showProgress = true,
}: LoadingStateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 font-poppins">
      <div className="flex items-center gap-3 mb-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-forest"></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
      </div>
      {showProgress && (
        <>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-forest h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This may take up to 30 seconds for complex analysis
          </p>
        </>
      )}
    </div>
  );
}
