
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-md bg-zinc-700 ${className}`} {...props} />
}

export default function Loading() {
  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <aside className="w-80 border-r border-zinc-700 p-6 flex flex-col items-center">
        <Skeleton className="w-32 h-32 !rounded-full" />
        <Skeleton className="h-6 w-40 mt-4" />
        <Skeleton className="h-4 w-32 mt-2" />
        
        <div className="w-full space-y-3 mt-8">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg bg-zinc-700/50" />
          ))}
        </div>
        
        <div className="mt-auto flex gap-4 pt-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded-full" />
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 items-center flex">
        <div className="max-w-3xl">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </main>
    </div>
  )
}
