import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-[#2c523d]/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#2c523d" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Lost in the Keeper?</h2>
      <p className="text-[#64748B] text-lg max-w-md mb-10">
        The page you are looking for doesn&apos;t exist or has been moved to a different timeline.
      </p>
      
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-8 py-3 bg-[#2c523d] text-white text-base font-semibold rounded-lg shadow-lg shadow-[#2c523d]/20 hover:bg-[#1a3225] hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Go back home
      </Link>
    </div>
  );
}
