export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <span className="loading loading-spinner text-[#2c523d] w-12 h-12"></span>
      <p className="mt-4 text-slate-500 font-medium">Loading data...</p>
    </div>
  );
}
