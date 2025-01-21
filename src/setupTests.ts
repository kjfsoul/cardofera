/// <reference types="vitest" />
import { expect } from 'vitest'
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  }
}

afterEach(() => {
  cleanup()
})