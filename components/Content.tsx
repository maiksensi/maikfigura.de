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
      id="main"
      tabIndex={-1}
      className="comic-shell pt-4 px-4 pb-16 leading-relaxed text-[var(--color-fg)] bg-[var(--color-bg)] min-h-screen focus:outline-none"
    >
      <div className="mt-24 mx-auto max-w-4xl">
        <h1 className="comic-heading text-4xl mb-8 md:text-5xl">{content.document.title}</h1>
        <div
          className="adoc-content comic-panel p-5 text-lg md:p-8"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </div>
    </main>
  )
}
