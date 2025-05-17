'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center p-2 rounded-md transition-colors w-1/4',
        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
      )}
    >
      <Icon size={24} className="mb-0.5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
