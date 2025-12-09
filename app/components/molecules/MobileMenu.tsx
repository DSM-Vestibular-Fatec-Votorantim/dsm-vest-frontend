import React from 'react';
import NavLink from '../atoms/NavLink';

interface MobileMenuItem {
  href: string;
  label: React.ReactNode;
}

interface MobileMenuProps {
  items: MobileMenuItem[];
  isActive: (href: string) => boolean;
  isOpen: boolean;
  onItemClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  isActive,
  isOpen,
  onItemClick,
}) => {
  return (
    <div
      id="primary-menu"
      className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-2 border-t border-gray-200 pt-2`}
    >
      <ul className="flex flex-col gap-1 pb-2">
        {items.map((item) => (
          <li key={typeof item.label === 'string' ? item.label : item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              isActive={isActive(item.href)}
              onClick={onItemClick}
              variant="mobile"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
