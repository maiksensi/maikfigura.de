import DOMPurify from 'dompurify'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

// Create a JSDOM window for server-side DOMPurify
const window = new JSDOM('').window
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as any)

export interface PageData {
  html: string
  document: {
    title: string
  }
  slug: string
}

export function getPageData(slug: string): PageData | null {
  const filePath = path.join(contentDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')

  // The first level-1 heading is the document title. Strip it from the body so
  // it is not rendered twice (the page renders the title separately).
  let title = slug
  const body = fileContent
    .replace(/^#\s+(.+?)\s*$/m, (_match, heading: string) => {
      title = heading
      return ''
    })
    .trimStart()

  // Convert and sanitize HTML at build time
  const rawHtml = marked.parse(body, { async: false })
  const sanitizedHtml = purify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'br', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return {
    html: sanitizedHtml,
    document: {
      title,
    },
    slug,
  }
}

export function getAllPageSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames.filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
}
