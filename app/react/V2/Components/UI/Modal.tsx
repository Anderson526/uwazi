/* eslint-disable react/no-multi-comp */
import React, { MouseEventHandler } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface ModalProps {
  children: string | React.ReactNode;
  show: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
}

const Modal = ({ show, children, size }: ModalProps) => {
  const hidden = show ? '' : 'hidden';

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xxl: 'max-w-2xl',
    xxxl: 'max-w-3xl',
  };

  return (
    <div
      aria-hidden="false"
      className={`${hidden} fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden 
        md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50`}
      data-testid="modal"
      role="dialog"
      aria-label="Modal"
    >
      <div className={`relative h-full w-full p-4 md:h-auto ${sizes[size]}`}>
        <div className="relative rounded-lg bg-white shadow">{children}</div>
      </div>
    </div>
  );
};

interface ModalChildrenProps {
  children?: string | React.ReactNode;
  className?: string;
}

Modal.Header = ({ children, className }: ModalChildrenProps) => (
  <div
    className={`flex items-start justify-between rounded-t ${
      children ? 'border-b p-5' : 'p-2'
    } ${className}`}
  >
    {children}
  </div>
);

Modal.Body = ({ children }: ModalChildrenProps) => (
  <div className="p-6" data-testid="modal-body">
    {children}
  </div>
);

Modal.Footer = ({ children }: ModalChildrenProps) => (
  <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 border-t">
    {children}
  </div>
);

Modal.CloseButton = ({
  className,
  onClick,
}: ModalChildrenProps & { onClick?: MouseEventHandler }) => (
  <button
    onClick={onClick}
    aria-label="Close modal"
    className={`ml-auto inline-flex items-center rounded-lg bg-transparent 
    p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 ${className}`}
    type="button"
  >
    <XMarkIcon className="w-4" />
  </button>
);

export type { ModalProps };
export { Modal };