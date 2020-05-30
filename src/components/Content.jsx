import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import React, { useEffect } from "react"

export function Content({ content, className }) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  })

  return (
    <main
      role="main"
      className="container pt-4 pl-2 pr-2 md:mx-auto xl:px-32 leading-loose"
    >
      <div className={className}>
        <h1>{content.document.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      </div>
    </main>
  )
}
