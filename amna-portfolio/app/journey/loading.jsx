export default function LoadingJourney() {
  return (
    <div className="px-6 md:px-10 py-16 max-w-content mx-auto animate-pulse">
      <div className="h-4 w-32 bg-line/50 rounded mb-4" />
      <div className="h-12 w-2/3 bg-line/50 rounded mb-10" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-line rounded-sm p-6 h-44 bg-card" />
        ))}
      </div>
    </div>
  );
}
