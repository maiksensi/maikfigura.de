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
    <main className="container pt-4 pl-2 pr-2 md:mx-auto xl:px-32 leading-loose">
      <div className="mt-16 max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold mb-2">{content.document.title}</h1>
        {/* HTML is sanitized at build time in lib/content.ts */}
        <div className="content" dangerouslySetInnerHTML={{ __html: content.html }} />
      </div>
    </main>
  )
}
