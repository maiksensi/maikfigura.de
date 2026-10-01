import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Bangers, Comic_Neue } from 'next/font/google'

const display = Bangers({ subsets: ['latin'], weight: '400', variable: '--font-comic-display' })
const body = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comic-body',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${display.variable} ${body.variable} comic-fonts bg-[var(--color-bg)] text-[var(--color-fg)] min-h-screen`}
    >
      <Component {...pageProps} />
    </div>
  )
}
