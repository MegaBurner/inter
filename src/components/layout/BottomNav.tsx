'use client';

import { Navigation, UsersRound, Star, Route } from 'lucide-react';
import NavItem from './NavItem';

export default function BottomNav() {
  const navItems = [
    { href: '/', icon: Navigation, label: 'Navigate' },
    { href: '/occupancy', icon: UsersRound, label: 'Occupancy' },
    { href: '/favorites', icon: Star, label: 'Favorites' },
    { href: '/route-optimizer', icon: Route, label: 'Optimize' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-top z-50">
      <div className="container mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </div>
    </nav>
  );
}
