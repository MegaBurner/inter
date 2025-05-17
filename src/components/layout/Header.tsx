import { Compass } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90">
          <Compass size={28} />
          <h1 className="text-xl font-semibold">Campus Guide</h1>
        </Link>
      </div>
    </header>
  );
}
