import { ReactNode } from 'react';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DialogProps {
  /**
   * Whether the Dialog is visible
   */
  open: boolean;
  /**
   * Callback fired when the Dialog requests to close (overlay click, escape key, or close button click)
   */
  onClose: () => void;
  /**
   * Title of the Dialog, rendered in the header
   */
  title?: ReactNode;
  /**
   * Content of the Dialog body
   */
  children: ReactNode;
  /**
   * Optional footer actions, typically buttons
   */
  footer?: ReactNode;
  /**
   * Size of the dialog modal width
   * @default 'md'
   */
  size?: DialogSize;
  /**
   * Whether to close the Dialog when clicking the overlay backdrop
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to show a close (X) button in the top-right corner
   * @default true
   */
  showClose?: boolean;
  /**
   * Additional custom CSS classes for the dialog card
   */
  className?: string;
  /**
   * Additional custom CSS classes for the overlay backdrop
   */
  overlayClassName?: string;
}
