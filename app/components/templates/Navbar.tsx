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

  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <nav
        className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-300 overflow-y-hidden"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex items-center justify-between gap-3 min-w-0 pr-12">
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
            {isAuthenticated && (
              <div className="hidden md:flex flex-col gap-2 absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-2 py-1 text-sm rounded-md hover:bg-red-700"
                >
                  Logout
                </button>

                <a
                  href="/pages/admin"
                  className="bg-blue-600 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-700 text-center"
                >
                  Administradores
                </a>
              </div>
            )}

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
