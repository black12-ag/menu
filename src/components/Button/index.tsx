import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Button Variant Types
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';

/**
 * Button Size Types
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Props Interface
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Supports icons, loading state, and full-width layout.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 * 
 * <Button variant="outline" leftIcon={<Icon />} loading={isLoading}>
 *   Save Changes
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  /**
   * Base button styles
   */
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  /**
   * Variant styles
   */
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-400 text-white hover:bg-primary-500 focus:ring-primary-400 dark:focus:ring-offset-secondary-500',
    secondary: 'bg-secondary-500 text-cream-200 hover:bg-secondary-400 focus:ring-secondary-500 dark:bg-cream-200 dark:text-secondary-500 dark:hover:bg-cream-300',
    ghost: 'bg-transparent text-secondary-500 hover:bg-secondary-100/50 focus:ring-secondary-300 dark:text-cream-200 dark:hover:bg-secondary-400/50',
    outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white focus:ring-primary-400 dark:focus:ring-offset-secondary-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:focus:ring-offset-secondary-500',
  };

  /**
   * Size styles
   */
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  /**
   * Loading spinner component
   */
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5"
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
  );

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
