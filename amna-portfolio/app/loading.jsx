export default function Loading() {
  return (
    <div className="px-6 md:px-10 py-24 max-w-content mx-auto animate-pulse">
      <div className="h-4 w-40 bg-line/50 rounded mb-4" />
      <div className="h-14 w-3/4 bg-line/50 rounded mb-3" />
      <div className="h-14 w-1/2 bg-line/50 rounded mb-8" />
      <div className="h-4 w-full max-w-md bg-line/40 rounded mb-2" />
      <div className="h-4 w-3/4 max-w-md bg-line/40 rounded" />
    </div>
  );
}
