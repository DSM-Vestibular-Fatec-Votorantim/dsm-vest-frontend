import React from 'react';

interface NavLinkProps {
  href: string;
  label: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  variant?: 'desktop' | 'mobile';
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  isActive,
  onClick,
  variant = 'desktop',
}) => {
  const baseStyles = 'text-gray-800 transition leading-snug box-border';
  
  const desktopStyles = [
    baseStyles,
    'px-5 py-3',
    'flex items-center justify-center text-[1.05rem]',
    'text-center whitespace-normal',
    'border-b-[3px]',
    isActive
      ? 'bg-gray-200 border-[#8b1d1d]'
      : 'border-transparent hover:bg-gray-100',
  ].join(' ');

  const mobileStyles = [
    baseStyles,
    'block px-3 py-2 rounded',
    isActive
      ? 'bg-gray-200 border-b-[3px] border-[#8b1d1d]'
      : 'hover:bg-gray-100 border-b-[3px] border-transparent',
  ].join(' ');

  const className = variant === 'desktop' ? desktopStyles : mobileStyles;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = window.location.pathname;
    
    // Verifica se estamos fora da home (em qualquer outra página)
    const isNotOnHome = currentPath !== '/';
    
    // Se não estamos na home, deixa o navegador fazer o redirecionamento normal
    if (isNotOnHome) {
      // Não previne o comportamento padrão, deixa o link funcionar normalmente
      if (onClick) {
        onClick();
      }
      return;
    }
    
    // Se estamos na home, faz scroll suave
    e.preventDefault();
    
    // Se for link com hash (âncora)
    if (href.includes('#') && href.startsWith('/')) {
      const hash = href.split('#')[1];
      
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState({}, '', href);
        }
      }
    } else if (href === '/') {
      // Se for o home, rola para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState({}, '', '/');
    }
    
    // Chama o onClick adicional se existir
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={href}
      className={className}
      style={variant === 'desktop' ? { minHeight: '56px' } : undefined}
      onClick={handleClick}
    >
      <span className={variant === 'desktop' ? 'block' : 'block text-left'}>
        {label}
      </span>
    </a>
  );
};

export default NavLink;