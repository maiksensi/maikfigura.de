import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Loading } from '@/components/Loading'
import { SEO } from '@/components/SEO'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Client-side redirect for static export
    router.replace('/about')
  }, [router])

  return (
    <>
      <SEO title="Welcome" />
      <Loading />
    </>
  )
}
