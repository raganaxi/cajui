import { forwardRef } from 'react';
import { ButtonProps } from './interface';
import { cn } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      loading = false,
      block = false,
      icon,
      iconPosition = 'left',
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Size classes mapping
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs h-8',
      md: 'px-4 py-2 text-sm h-10',
      lg: 'px-6 py-3 text-base h-12',
    }[size];

    // Variant classes mapping
    const variantClasses = {
      primary: 'caj-btn-primary',
      success: 'caj-btn-success',
      danger:  'caj-btn-danger',
      warning: 'caj-btn-warning',
      ghost:   'caj-btn-ghost',
      text:    'caj-btn-text',
      default: 'caj-btn-default',
    }[variant];

    const isButtonDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={cn(
          variant === 'text' ? '' : 'caj-btn',
          variantClasses,
          sizeClasses,
          block && 'w-full flex',
          isButtonDisabled && 'opacity-40 pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon (only when not loading) */}
        {!loading && icon && iconPosition === 'left' && (
          <span className={cn(children ? 'mr-1.5' : '')}>{icon}</span>
        )}

        {/* Children (button content) */}
        {children && <span>{children}</span>}

        {/* Right Icon */}
        {!loading && icon && iconPosition === 'right' && (
          <span className={cn(children ? 'ml-1.5' : '')}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
