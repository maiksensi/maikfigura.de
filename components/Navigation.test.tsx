import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Navigation from '@/components/Navigation'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...props }: any) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault() // Prevent navigation in tests
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </a>
  ),
}))

// Mock Next.js useRouter hook
vi.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/about', // Mock current path as /about for testing
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset document body overflow style
    document.body.style.overflow = ''
  })

  it('renders navigation links', () => {
    render(<Navigation />)

    // Check that all navigation pages are rendered (use getAllByRole for duplicates)
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    const appearanceLinks = screen.getAllByRole('link', { name: /appearances/i })
    const contactLinks = screen.getAllByRole('link', { name: /contact/i })
    const workLinks = screen.getAllByRole('link', { name: /work/i })
    const privacyLinks = screen.getAllByRole('link', { name: /privacy/i })

    expect(aboutLinks).toHaveLength(2) // Desktop and mobile
    expect(appearanceLinks).toHaveLength(2)
    expect(contactLinks).toHaveLength(2)
    expect(workLinks).toHaveLength(2)
    expect(privacyLinks).toHaveLength(2)
  })

  it('renders correct href attributes', () => {
    render(<Navigation />)

    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    const contactLinks = screen.getAllByRole('link', { name: /contact/i })
    const workLinks = screen.getAllByRole('link', { name: /work/i })

    // Check both desktop and mobile versions have correct hrefs
    aboutLinks.forEach((link) => expect(link).toHaveAttribute('href', '/about'))
    contactLinks.forEach((link) => expect(link).toHaveAttribute('href', '/contact'))
    workLinks.forEach((link) => expect(link).toHaveAttribute('href', '/work'))
  })

  it('has burger button for mobile navigation', () => {
    render(<Navigation />)

    const burgerButton = screen.getByRole('button')
    expect(burgerButton).toBeInTheDocument()
    expect(burgerButton).toHaveAttribute('aria-label', 'Open navigation')
  })

  it('opens mobile navigation when burger button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    const burgerButton = screen.getByRole('button', { name: /open navigation/i })
    await user.click(burgerButton)

    // Check that mobile overlay is visible (has transform translate-x-0)
    const overlay = screen.getByRole('dialog')
    expect(overlay).toHaveClass('transform', 'translate-x-0')

    // Check aria-label changes
    expect(burgerButton).toHaveAttribute('aria-label', 'Close navigation')
  })

  it('closes mobile navigation when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    // Open navigation
    const burgerButton = screen.getByRole('button', { name: /open navigation/i })
    await user.click(burgerButton)

    // Close navigation
    const closeButton = screen.getByRole('button', { name: /close navigation/i })
    await user.click(closeButton)

    // Check that overlay is hidden (has transform translate-x-full)
    const overlay = screen.getByRole('dialog')
    expect(overlay).toHaveClass('transform', 'translate-x-full')

    // Check aria-label changes back
    expect(burgerButton).toHaveAttribute('aria-label', 'Open navigation')
  })

  it('prevents body scrolling when mobile navigation is open', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    const burgerButton = screen.getByRole('button', { name: /open navigation/i })

    // Initially body should allow scrolling
    expect(document.body.style.overflow).toBe('')

    // Open navigation
    await user.click(burgerButton)
    expect(document.body.style.overflow).toBe('hidden')

    // Close navigation
    const closeButton = screen.getByRole('button', { name: /close navigation/i })
    await user.click(closeButton)
    expect(document.body.style.overflow).toBe('')
  })

  it('closes mobile navigation when a navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    // Open navigation
    const burgerButton = screen.getByRole('button', { name: /open navigation/i })
    await user.click(burgerButton)

    // Click a navigation link in the mobile menu
    const mobileLinks = screen.getAllByRole('link', { name: /contact/i })
    const mobileContactLink = mobileLinks.find((link) => link.closest('[role="dialog"]'))

    await user.click(mobileContactLink!)

    // Check that overlay is hidden
    const overlay = screen.getByRole('dialog')
    expect(overlay).toHaveClass('transform', 'translate-x-full')
  })

  it('has proper accessibility attributes', () => {
    render(<Navigation />)

    const overlay = screen.getByRole('dialog')
    expect(overlay).toHaveAttribute('aria-modal', 'true')
    expect(overlay).toHaveAttribute('aria-label', 'Mobile navigation menu')

    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav).toBeInTheDocument()
  })
})
