import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, JetBrains_Mono } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${mono.variable} ${inter.variable} font-mono bg-[var(--color-bg)] text-[var(--color-fg)] min-h-screen`}
    >
      <Component {...pageProps} />
    </div>
  )
}
