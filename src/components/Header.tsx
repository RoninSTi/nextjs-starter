'use client';

import Link from 'next/link';
import UserMenu from './auth/UserMenu';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ui/mode-toggle';
import { buttonVariants } from './ui/button';

export default function Header() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/telemetry-dashboard', label: 'Telemetry' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg font-bold">Next.js Starter</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  item.href === '/' ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile logo - shown only on small screens */}
        <div className="md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Next.js</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}