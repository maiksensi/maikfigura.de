import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, Ref, useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/lib/config'

// Constants for better maintainability
const NAV_HEIGHT = 'h-16'
const NAV_Z_INDEX = 'z-30'
const OVERLAY_Z_INDEX = 'z-15'
const TRANSITION_DURATION = 'duration-300'

interface NavigationLinkProps {
  href: string
  children: ReactNode
  onClick?: () => void
  isActive?: boolean
}

interface BurgerButtonProps {
  isOpen: boolean
  onClick: () => void
  buttonRef: Ref<HTMLButtonElement>
}

const MOBILE_MENU_ID = 'mobile-menu'

const NavigationLink = ({ href, children, onClick, isActive = false }: NavigationLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="nav-link"
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </Link>
)

const BurgerButton = ({ isOpen, onClick, buttonRef }: BurgerButtonProps) => {
  const barBaseClasses = 'w-7 h-1 bg-black transition-all duration-300'

  return (
    <button
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls={MOBILE_MENU_ID}
      ref={buttonRef}
      onClick={onClick}
      className="h-11 w-11 flex flex-col justify-center items-center gap-1 sm:hidden mr-1 z-20 relative border-[3px] border-white bg-white shadow-[3px_3px_0_#6b6b6b]"
    >
      {/* Top bar - rotates to form top part of X */}
      <div
        className={`${barBaseClasses} origin-center ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        aria-hidden="true"
      />
      {/* Middle bar - slides left and fades out */}
      <div
        className={`${barBaseClasses} ${
          isOpen ? 'opacity-0 -translate-x-3' : 'opacity-100 translate-x-0'
        }`}
        aria-hidden="true"
      />
      {/* Bottom bar - rotates to form bottom part of X */}
      <div
        className={`${barBaseClasses} origin-center ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { navPages } = siteConfig
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  // Memoize functions for better performance
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  const isActivePage = useCallback(
    (page: string) => {
      return router.asPath === `/${page}` || router.asPath === `/${page}/`
    },
    [router.asPath]
  )

  // Handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Move focus into the menu when it opens
  useEffect(() => {
    if (isOpen) {
      menuRef.current?.querySelector('a')?.focus()
    }
  }, [isOpen])

  // Close menu on escape key and return focus to the burger button
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
        burgerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeMenu])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Main Navigation Header */}
      <header
        className={`flex justify-end items-center sm:justify-center bg-black border-b-4 border-black ${NAV_HEIGHT} w-full fixed top-0 ${NAV_Z_INDEX}`}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center w-full justify-between sm:justify-center px-4"
        >
          <div className="comic-display sm:hidden text-2xl text-white pl-1 -rotate-2">
            Maik Figura!
          </div>
          {/* Desktop Navigation */}
          <ul className="hidden sm:flex sm:flex-row">
            {navPages.map((page) => (
              <li key={page} className="mx-2 text-2xl">
                <NavigationLink href={`/${page}`} isActive={isActivePage(page)}>
                  {page}
                </NavigationLink>
              </li>
            ))}
          </ul>

          {/* Mobile Burger Button */}
          <BurgerButton isOpen={isOpen} onClick={toggleMenu} buttonRef={burgerRef} />
        </nav>
      </header>

      {/* Mobile Navigation Overlay: inert while closed so its links leave the tab order */}
      <nav
        id={MOBILE_MENU_ID}
        ref={menuRef}
        aria-label="Mobile navigation menu"
        inert={!isOpen}
        className={`
          fixed top-16 left-0 right-0 bottom-0 comic-shell ${OVERLAY_Z_INDEX} sm:hidden
          transition-transform ${TRANSITION_DURATION}
          ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}
        `}
        onClick={closeMenu} // Close on backdrop click
      >
        <ul
          className="relative z-10 flex flex-col justify-center items-center h-full"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking nav content
        >
          {navPages.map((page) => (
            <li key={page} className="text-4xl mb-8">
              <NavigationLink href={`/${page}`} onClick={closeMenu} isActive={isActivePage(page)}>
                {page}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
