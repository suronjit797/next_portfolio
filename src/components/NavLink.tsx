// components/NavLink.tsx
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  activeClassName = 'active',
  className = '',
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
