import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="font-heading text-6xl font-black text-[#F59E0B]">404</span>
      <h1 className="font-heading text-2xl font-bold text-[#F8FAFC]">
        This Chad has ascended beyond our tracking.
      </h1>
      <p className="font-mono text-sm text-[#64748B]">
        The page you&apos;re looking for doesn&apos;t exist or has been mog&apos;d out of existence.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md border border-[#F59E0B] bg-[#F59E0B]/10 px-4 py-2 font-mono text-sm text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/20"
      >
        Back to Leaderboard
      </Link>
    </div>
  );
}
