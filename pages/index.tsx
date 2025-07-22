import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SEO } from '@/components/SEO'
import { Loading } from '@/components/Loading'

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
