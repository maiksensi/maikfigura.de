interface ContentProps {
  content: {
    html: string
    document: {
      title: string
    }
  }
}

export function Content({ content }: ContentProps) {
  return (
    <main
      role="main"
      className="container pt-4 pl-4 pr-4 md:mx-auto xl:px-32 leading-loose text-[var(--color-fg)] bg-[var(--color-bg)] min-h-screen font-mono"
    >
      <div className="mt-16 max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[var(--color-accent)]">
          <span className="text-[var(--color-accent)]/50">&gt;</span> {content.document.title}
        </h1>
        <div
          className="adoc-content terminal-text"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </div>
    </main>
  )
}
