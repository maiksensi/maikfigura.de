import { Content } from '@/components/Content'
import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'
import { getPageData, getAllPageSlugs, PageData } from '@/lib/content'
import { siteConfig } from '@/lib/config'
import { GetStaticPaths, GetStaticProps } from 'next'

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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPageSlugs()

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
