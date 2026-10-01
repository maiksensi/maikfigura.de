import { GetStaticPaths, GetStaticProps } from 'next'
import { Content } from '@/components/Content'
import Navigation from '@/components/Navigation'
import { SEO } from '@/components/SEO'
import { siteConfig } from '@/lib/config'
import { getAllPageSlugs, getPageData, PageData } from '@/lib/content'

interface PageProps {
  content: PageData
}

export default function Page({ content }: PageProps) {
  if (!content) {
    return <div>Page not found</div>
  }

  return (
    <>
      <SEO
        title={content.document.title}
        canonical={`${siteConfig.headerMetadata.siteUrl}/${content.slug}`}
      />
      <Navigation />
      <Content content={content} />
    </>
  )
}

// about renders its own page; work.md only feeds the timeline on /about.
const SLUGS_WITHOUT_ROUTE = ['about', 'work']

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPageSlugs().filter((slug) => !SLUGS_WITHOUT_ROUTE.includes(slug))

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    }
  }

  const content = getPageData(params.slug)

  if (!content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      content,
    },
  }
}
