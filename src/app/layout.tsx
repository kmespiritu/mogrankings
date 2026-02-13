import type { Metadata } from 'next';
import { Oswald, JetBrains_Mono, DM_Sans } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

const oswald = Oswald({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ChadBlade — The Definitive Chad Ranking Platform',
  description:
    'Real-time social media analytics, composite scoring, and archetype classification for the internet\'s most aesthetic individuals.',
  keywords: ['chad', 'leaderboard', 'aesthetics', 'looksmaxxing', 'social blade', 'rankings'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${oswald.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}
      >
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        <footer className="border-t border-[#1E293B] py-8 text-center">
          <p className="font-heading text-sm font-bold tracking-wider text-[#64748B]">
            WE&apos;RE ALL GONNA MAKE IT.
          </p>
          <p className="mt-2 font-mono text-[10px] text-[#334155]">
            ChadBlade v1.0 — Not affiliated with Social Blade
          </p>
        </footer>
      </body>
    </html>
  );
}
