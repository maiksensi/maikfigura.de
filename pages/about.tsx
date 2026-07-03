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
        role="main"
        className="ambient-shell relative isolate min-h-screen overflow-hidden pt-4 pl-4 pr-4 leading-loose text-[var(--color-fg)] bg-[var(--color-bg)] font-mono"
      >
        <h1 className="sr-only">About Maik Figura</h1>
        <div className="relative z-10 mt-16 mx-auto max-w-6xl px-0 md:px-8 xl:px-16">
          <section className="terminal-panel mb-12 overflow-hidden rounded-sm">
            <div className="px-4 py-8 md:px-8 md:py-10">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[var(--color-accent)]/70">
                system architect / resilient software / human-centered craft
              </p>
              <pre
                aria-hidden="true"
                className="hero-ascii max-w-full text-[var(--color-accent)] leading-none overflow-x-auto whitespace-pre"
              >
                {`
 __  __    _    ___ _  __   _____ ___  ____ _   _ ____      _    
|  \\/  |  / \\  |_ _| |/ /  |  ___|_ _|/ ___| | | |  _ \\    / \\   
| |\\/| | / _ \\  | || ' /   | |_   | || |  _| | | | |_) |  / _ \\  
| |  | |/ ___ \\ | || . \\   |  _|  | || |_| | |_| |  _ <  / ___ \\ 
|_|  |_/_/   \\_\\___|_|\\_\\  |_|   |___|\\____|\\___/|_| \\_\\/_/   \\_\\
`}
              </pre>
              <p className="mt-6 max-w-3xl text-sm text-[var(--color-fg)]/75 md:text-base">
                maik@figura:~$ building resilient systems with domain language, observability, and a
                bias for useful software{' '}
                <span className="terminal-caret text-[var(--color-accent)]">_</span>
              </p>
            </div>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-t border-b border-[var(--color-accent)]/30 py-8">
            <div className="stat-card terminal-panel rounded-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="stat-card-value">10</div>
              <div className="stat-card-label">Years Exp</div>
            </div>
            <div className="stat-card terminal-panel rounded-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="stat-card-value">People</div>
              <div className="stat-card-label">Before systems</div>
            </div>
            <div className="stat-card terminal-panel rounded-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="stat-card-value">Resilience</div>
              <div className="stat-card-label">By design</div>
            </div>
            <div className="stat-card terminal-panel rounded-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="stat-card-value">Collaboration</div>
              <div className="stat-card-label">Before Processes</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-accent)]">
                <span className="text-[var(--color-accent)]/50">&gt;</span> whoami
              </h2>
              <div
                className="adoc-content terminal-text"
                dangerouslySetInnerHTML={{ __html: aboutContent.html }}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-accent)]">
                <span className="text-[var(--color-accent)]/50">&gt;</span> cat experience.log
              </h2>
              <div className="space-y-6">
                <div
                  className="adoc-content timeline-cards"
                  dangerouslySetInnerHTML={{ __html: workContent.html }}
                />
              </div>
            </div>
          </div>

          <footer className="mt-16 border-t border-[var(--color-card-border)] py-8 text-sm text-[var(--color-fg)]/70">
            <p>
              maik@figura:~$ open collaboration.log{' '}
              <span className="terminal-caret text-[var(--color-accent)]">_</span>
            </p>
          </footer>
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
