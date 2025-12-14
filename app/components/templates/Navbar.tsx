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

  // Detecta a seção ativa baseada no scroll
  useEffect(() => {
    const updateActiveSection = () => {
      // Se não estiver na home, usa o pathname
      if (pathname !== '/') {
        setActiveSection(pathname);
        return;
      }

      // Se estiver na home, detecta qual seção está visível
      const sections = ['Relatos', 'Projetos', 'Calendario', 'Duvidas', 'Contatos'];
      const scrollPosition = window.scrollY + 200; // Offset para considerar o navbar
      
      // Verifica se está no topo da página
      if (window.scrollY < 100) {
        setActiveSection('/');
        return;
      }

      // Procura qual seção está visível
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Se a posição do scroll está dentro desta seção
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(`/#${section}`);
            return;
          }
        }
      }
    };

    // Atualiza imediatamente
    updateActiveSection();

    // Atualiza no scroll
    const handleScroll = () => {
      if (pathname === '/') {
        updateActiveSection();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
          <a 
            href="/" 
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('/');
              window.history.pushState({}, '', '/');
            }}
          >
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