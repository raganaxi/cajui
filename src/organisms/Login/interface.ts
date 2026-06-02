import { ReactNode } from 'react';

export interface LoginCredentials {
  pin?: string;
  email?: string;
  password?: string;
}

export interface LoginProps {
  /**
   * Callback triggered when a login attempt is submitted
   */
  onLogin: (credentials: LoginCredentials) => void;
  /**
   * Whether to allow PIN-based fast access using the NumPad
   * @default true
   */
  allowPin?: boolean;
  /**
   * Whether to allow classic email/password credentials access
   * @default true
   */
  allowCredentials?: boolean;
  /**
   * Optional custom Branding node to display at the top of the login card
   */
  companyBranding?: ReactNode;
  /**
   * Optional error message to display in the login interface
   */
  error?: string;
  /**
   * Whether the login process is in an active loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Additional CSS classes to apply to the outermost wrapper
   */
  className?: string;
}
