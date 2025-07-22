import fs from 'fs'
import path from 'path'
import Asciidoctor from 'asciidoctor'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const asciidoctor = Asciidoctor()
const contentDirectory = path.join((process as any).cwd(), 'content')

// Create a JSDOM window for server-side DOMPurify
const window = new JSDOM('').window
const purify = DOMPurify(window as any)

export interface PageData {
  html: string
  document: {
    title: string
  }
  slug: string
}

export function getPageData(slug: string): PageData | null {
  const filePath = path.join(contentDirectory, `${slug}.adoc`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const doc = asciidoctor.load(fileContent)
  
  // Convert and sanitize HTML at build time
  const rawHtml = doc.convert()
  const sanitizedHtml = purify.sanitize(rawHtml as string, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'br', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  })

  return {
    html: sanitizedHtml,
    document: {
      title: String(doc.getDocumentTitle() || slug),
    },
    slug,
  }
}

export function getAllPageSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter((name) => name.endsWith('.adoc'))
    .map((name) => name.replace(/\.adoc$/, ''))
}
