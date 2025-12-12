
import React, { useState, useEffect } from 'react';
import Logo from '../molecules/Logo';
import HamburgerButton from '../atoms/HamburgerButton';
import NavMenu from '../molecules/NavMenu';
import MobileMenu from '../molecules/MobileMenu';

interface NavItem {
  href: string;
  label: React.ReactNode;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnNavigate = () => setOpen(false);
    window.addEventListener('hashchange', closeOnNavigate);
    window.addEventListener('popstate', closeOnNavigate);
    return () => {
      window.removeEventListener('hashchange', closeOnNavigate);
      window.removeEventListener('popstate', closeOnNavigate);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/relatos', label: 'Relatos' },
    { href: '/#Calendario', label: 'Calendário' },
    { href: '/#Duvidas', label: <>Dúvidas<br />Frequentes</> },
    { href: '/#Contatos', label: <>Fale<br />Conosco</> },
  ];

  const isActive = (href: string) =>
    typeof window !== 'undefined' && window.location.pathname === href;

  return (
    <header>
      <nav
        className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-300 overflow-y-hidden"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex items-center justify-between gap-3 min-w-0">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 py-3 flex-shrink-0">
              <Logo />
            </a>

            {/* Hamburger Button (mobile) */}
            <HamburgerButton
              isOpen={open}
              onClick={() => setOpen((prev) => !prev)}
            />

            {/* Desktop Menu */}
            <NavMenu items={navItems} isActive={isActive} />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            items={navItems}
            isActive={isActive}
            isOpen={open}
            onItemClick={() => setOpen(false)}
          />
        </div>
      </nav>
      <div className="h-[64px]" />
    </header>
  );
};

export default Navbar;
