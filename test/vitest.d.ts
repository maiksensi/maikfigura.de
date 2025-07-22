import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, Assertion<T>> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers {}
}
