import { GetStaticProps } from 'next'
import Navigation from '@/components/Navigation'
import { SEO } from '@/components/SEO'
import { siteConfig } from '@/lib/config'
import { getPageData, PageData } from '@/lib/content'

interface AboutPageProps {
  aboutContent: PageData
  workContent: PageData
}

export default function AboutPage({ aboutContent, workContent }: AboutPageProps) {
  if (!aboutContent || !workContent) {
    return <div>Page not found</div>
  }

  return (
    <>
      <SEO
        title={aboutContent.document.title}
        canonical={`${siteConfig.headerMetadata.siteUrl}/${aboutContent.slug}`}
      />
      <Navigation />
      <main
        id="main"
        tabIndex={-1}
        className="comic-shell relative isolate min-h-screen overflow-hidden pt-4 pl-4 pr-4 pb-8 leading-relaxed text-[var(--color-fg)] bg-[var(--color-bg)] focus:outline-none"
      >
        <div className="relative z-10 mt-20 mx-auto max-w-6xl px-0 md:px-8 xl:px-16">
          <section className="comic-panel comic-hero mb-14 px-4 pt-6 pb-12 md:px-10 md:pt-8 md:pb-14">
            <p className="comic-caption mb-6 text-xs md:text-sm -rotate-1">
              Issue #1 &middot; System architect / resilient software / human-centered craft
            </p>
            <h1 className="comic-title mb-10 md:mb-12">
              <span className="sr-only">About </span>Maik Figura
            </h1>
            <p className="speech-bubble max-w-2xl text-base font-bold md:text-xl">
              Building resilient systems with domain language, observability, and a bias for useful
              software!
            </p>
            <span
              aria-hidden="true"
              className="comic-burst absolute right-3 top-3 hidden sm:inline-block md:right-8 md:top-6"
            >
              <span>POW!</span>
            </span>
          </section>

          <ul
            aria-label="Highlights"
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-16"
          >
            <li className="stat-card">
              <span className="stat-card-value">10</span>
              <span className="stat-card-label">Years Exp</span>
            </li>
            <li className="stat-card">
              <span className="stat-card-value">People</span>
              <span className="stat-card-label">Before systems</span>
            </li>
            <li className="stat-card">
              <span className="stat-card-value">Resilience</span>
              <span className="stat-card-label">By design</span>
            </li>
            <li className="stat-card">
              <span className="stat-card-value">Collaboration</span>
              <span className="stat-card-label">Before Processes</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="comic-heading text-3xl mb-8">Origin story</h2>
              <div
                className="adoc-content comic-panel p-5 text-lg md:p-6"
                dangerouslySetInnerHTML={{ __html: aboutContent.html }}
              />
            </div>

            <div>
              <h2 className="comic-heading text-3xl mb-4">The adventures so far</h2>
              <div
                className="adoc-content timeline-cards"
                dangerouslySetInnerHTML={{ __html: workContent.html }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const aboutContent = getPageData('about')
  const workContent = getPageData('work')

  if (!aboutContent || !workContent) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      aboutContent,
      workContent,
    },
  }
}
