import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  ariaLabel?: string;
  ariaControls?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  ariaLabel = 'Abrir menu',
  ariaControls = 'primary-menu',
}) => {
  return (
    <button
      type="button"
      className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-controls={ariaControls}
      aria-expanded={isOpen ? 'true' : 'false'}
      onClick={onClick}
    >
      <span className="sr-only">{ariaLabel}</span>
      <svg
        className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;
