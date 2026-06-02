import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'ghost' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Style variant of the button
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the button takes up the full width of its container
   * @default false
   */
  block?: boolean;
  /**
   * Optional icon to render
   */
  icon?: ReactNode;
  /**
   * Position of the icon relative to the children text
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
}
