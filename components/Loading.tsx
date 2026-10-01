export function Loading() {
  return (
    <div
      role="status"
      className="comic-shell flex h-screen w-full items-center justify-center bg-[var(--color-bg)]"
    >
      <span aria-hidden="true" className="comic-burst">
        <span>ZAP!</span>
      </span>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
