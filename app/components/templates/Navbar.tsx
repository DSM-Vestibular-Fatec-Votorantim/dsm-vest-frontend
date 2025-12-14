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
  const [activeSection, setActiveSection] = useState('/');

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

  // Detecta a seção ativa baseada no hash da URL e scroll
  useEffect(() => {
    const updateActiveSection = () => {
      const hash = window.location.hash;
      
      if (hash) {
        // Se tem hash na URL, usa ele
        setActiveSection(`${pathname}${hash}`);
      } else if (pathname === '/') {
        // Se está na home sem hash, detecta qual seção está visível
        const sections = ['Relatos', 'Projetos', 'Calendario', 'Duvidas', 'Contatos'];
        let currentSection = '/';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Se a seção está visível na viewport (considerando o navbar)
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = `/#${section}`;
              break;
            }
          }
        }
        
        setActiveSection(currentSection);
      } else {
        // Para outras páginas
        setActiveSection(pathname);
      }
    };

    // Atualiza imediatamente
    updateActiveSection();

    // Atualiza no scroll (apenas se estiver na home)
    const handleScroll = () => {
      if (pathname === '/' && !window.location.hash) {
        updateActiveSection();
      }
    };

    // Atualiza quando o hash muda
    const handleHashChange = () => {
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/#Relatos', label: 'Relatos' },
    { href: '/#Projetos', label: 'Projetos' },
    { href: '/#Calendario', label: 'Calendário' },
    { href: '/#Duvidas', label: <>Dúvidas<br />Frequentes</> },
    { href: '/#Contatos', label: <>Fale<br />Conosco</> },
  ];

  const menuItems = [
    ...navItems,
    ...(isAuthenticated
      ? [
          { href: '/pages/admin', label: 'Administradores' },
          { href: '#logout', label: 'Logout', onClick: logout },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    // Para home, verifica se está exatamente na home sem hash
    if (href === '/') {
      return activeSection === '/';
    }
    // Para outros links, verifica se corresponde à seção ativa
    return activeSection === href;
  };

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
            <NavMenu items={navItems} isActive={isActive} />

            {/* Botões de autenticação */}
            {isAuthenticated && (
              <div className="flex items-center gap-2 ml-4">
                <a
                  href="/pages/admin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Administradores
                </a>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
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