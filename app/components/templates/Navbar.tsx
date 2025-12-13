"use client";

import React, { useState, useEffect } from 'react';
import Logo from '../molecules/Logo';
import HamburgerButton from '../atoms/HamburgerButton';
import NavMenu from '../molecules/NavMenu';
import MobileMenu from '../molecules/MobileMenu';
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";


interface NavItem {
  href: string;
  label: React.ReactNode;
}

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
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
    { href: '/#Relatos', label: 'Relatos' },
    { href: '/#Calendario', label: 'Calendário' },
    { href: '/#Duvidas', label: <>Dúvidas<br />Frequentes</> },
    { href: '/#Contatos', label: <>Fale<br />Conosco</> },
  ];

  const menuItems = [
    ...navItems,
    ...(isAuthenticated
      ? [
          { href: '/pages/admin', label: <a href="/pages/admin" className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 text-center">Administradores</a> },
          { href: '#logout', label: <button onClick={logout} className="bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700">Logout</button> },
        ]
      : []),
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <nav
        className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-300 overflow-y-hidden"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-5 py-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Logo />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavMenu items={menuItems} isActive={isActive} />
          </div>

          {/* Hamburger Button (mobile) */}
          <HamburgerButton
            isOpen={open}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          items={menuItems}
          isActive={isActive}
          isOpen={open}
          onItemClick={() => setOpen(false)}
        />
      </nav>
      <div className="h-[64px]" />
    </header>
  );
};

export default Navbar;
