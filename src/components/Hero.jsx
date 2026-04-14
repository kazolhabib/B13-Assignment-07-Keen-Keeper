export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-15 px-4 md:pt-20 pb-10">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6 tracking-tight">
        Friends to keep close in your life
      </h1>
      <p className="text-[#64748B] max-w-xl text-base mb-8 leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>
      <button className="flex items-center gap-2 bg-[#2c523d] text-white px-5 py-3 rounded-md font-medium hover:bg-[#234331] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c523d]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add a Friend
      </button>
    </section>
  );
}
