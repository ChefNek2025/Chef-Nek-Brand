export default function Loading() {
  return (
    <div className="container-x pt-40" aria-busy="true" aria-label="Loading">
      <div className="skeleton h-3 w-40 rounded-full" />
      <div className="skeleton mt-6 h-16 w-3/4 max-w-2xl rounded-2xl" />
      <div className="skeleton mt-4 h-5 w-1/2 max-w-lg rounded-full" />
      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="skeleton aspect-[3/4] rounded-3xl" />)}
      </div>
    </div>
  );
}
