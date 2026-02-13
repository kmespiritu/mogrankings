'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Leaderboard' },
  { href: '/archetypes', label: 'Archetypes' },
  { href: '/compare', label: 'Who Mogs Who' },
  { href: '/submit', label: 'Submit' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-black tracking-tight text-[#F59E0B]">
            MOG
          </span>
          <span className="font-heading text-2xl font-black tracking-tight text-[#F8FAFC]">
            RANKINGS
          </span>
          <span className="ml-1 rounded bg-[#F59E0B]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#F59E0B]">
            v1.0
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                    : 'text-[#64748B] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
