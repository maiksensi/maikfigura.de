// Site configuration that can be used on both client and server
interface SiteConfig {
  navPages: string[]
  headerMetadata: {
    siteUrl: string
    lang: string
    title: string
    description: string
    keywords: string[]
    canonicalUrl: string
  }
}

export const siteConfig: SiteConfig = {
  navPages: ['about', 'appearances', 'contact', 'work', 'privacy'],
  headerMetadata: {
    siteUrl: 'https://maikfigura.de',
    lang: 'en',
    title: 'Maik Figura - System Architect',
    description: 'Personal homepage of Maik Figura, a System Architect at PorscheDigital',
    keywords: ['Software Engineer', 'System Architect', 'Chaos Engineer', 'PorscheDigital'],
    canonicalUrl: 'https://maikfigura.de',
  },
}
