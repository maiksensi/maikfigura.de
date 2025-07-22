import { useState, useEffect, ReactNode, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
}

const NavigationLink = ({ href, children, onClick, isActive = false }: NavigationLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`
      text-gray-700 hover:text-gray-900 hover:underline focus:underline 
      transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900
      ${isActive ? 'underline text-gray-900 font-medium' : ''}
    `}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </Link>
)

const BurgerButton = ({ isOpen, onClick }: BurgerButtonProps) => {
  const barBaseClasses = 'w-6 h-0.5 bg-gray-900 rounded transition-all duration-300'
  
  return (
    <button
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      onClick={onClick}
      className="h-8 w-8 flex flex-col justify-center items-center gap-1 sm:hidden mr-5 z-20 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
    >
      {/* Top bar - rotates to form top part of X */}
      <div
        className={`${barBaseClasses} origin-center ${
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}
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
        className={`${barBaseClasses} origin-center ${
          isOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}
        aria-hidden="true"
      />
    </button>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { navPages } = siteConfig

  // Memoize functions for better performance
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])
  
  const isActivePage = useCallback((page: string) => {
    return router.asPath === `/${page}` || router.asPath === `/${page}/`
  }, [router.asPath])

  // Handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeMenu])

  return (
    <>
      {/* Main Navigation Header */}
      <header 
        className={`flex justify-end items-center sm:justify-center bg-gray-200 ${NAV_HEIGHT} w-full fixed top-0 ${NAV_Z_INDEX}`}
        role="banner"
      >
        <nav aria-label="Main navigation" className="flex items-center w-full justify-end sm:justify-center">
          {/* Desktop Navigation */}
          <ul className="hidden sm:flex sm:flex-row">
            {navPages.map((page) => (
              <li key={page} className="mx-4 text-2xl">
                <NavigationLink href={`/${page}`} isActive={isActivePage(page)}>
                  {page}
                </NavigationLink>
              </li>
            ))}
          </ul>

          {/* Mobile Burger Button */}
          <BurgerButton isOpen={isOpen} onClick={toggleMenu} />
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed top-16 left-0 right-0 bottom-0 bg-gray-200 ${OVERLAY_Z_INDEX} sm:hidden 
          transition-transform ${TRANSITION_DURATION}
          ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onClick={closeMenu} // Close on backdrop click
      >
        <nav 
          className="flex flex-col justify-center items-center h-full" 
          aria-label="Mobile navigation"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking nav content
        >
          {navPages.map((page) => (
            <div key={page} className="text-2xl mb-8">
              <NavigationLink href={`/${page}`} onClick={closeMenu} isActive={isActivePage(page)}>
                {page}
              </NavigationLink>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
