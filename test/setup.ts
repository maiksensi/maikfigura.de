import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

// Extend Vitest's expect with Testing Library's custom DOM matchers
expect.extend(matchers)

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup()
})
