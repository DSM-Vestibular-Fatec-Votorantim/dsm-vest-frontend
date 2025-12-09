import React from 'react';
import NavLink from '../atoms/NavLink';

interface NavMenuItem {
  href: string;
  label: React.ReactNode;
}

interface NavMenuProps {
  items: NavMenuItem[];
  isActive: (href: string) => boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ items, isActive }) => {
  return (
    <ul className="hidden lg:flex items-center gap-2 justify-end">
      {items.map((item) => (
        <li key={typeof item.label === 'string' ? item.label : item.href}>
          <NavLink
            href={item.href}
            label={item.label}
            isActive={isActive(item.href)}
            variant="desktop"
          />
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
