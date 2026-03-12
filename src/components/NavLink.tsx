import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NavLinkCompatProps {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ href, className, activeClassName, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = 'NavLink';

export { NavLink };
