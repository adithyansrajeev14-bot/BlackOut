import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-black text-[#f4b400] font-orbitron">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-wider">Page Not Found</h2>
        <p className="text-gray-400 text-sm">
          The page or route you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ffc825] transition-colors inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
