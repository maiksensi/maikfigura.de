export function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg)]">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-[var(--color-accent)]"></div>
    </div>
  )
}
