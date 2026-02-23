import { describe, expect, it } from 'vitest'

import { mergeOptions } from './merge-options'

describe('mergeOptions', () => {
  it('should return defaultOptions when options is undefined', () => {
    const result = mergeOptions(undefined)
    expect(result.typescript).toBeDefined()
    expect(result.pnpm).toBe(false)
  })

  it('should use default value when user passes true', () => {
    const result = mergeOptions({
      typescript: true,
    })
    expect(result.typescript).toEqual({
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'ts/no-explicit-any': 'warn',
      },
    })
  })

  it('should merge user object with default value using defu', () => {
    const result = mergeOptions({
      typescript: {
        overrides: {
          'ts/no-explicit-any': 'error',
          'ts/custom-rule': 'warn',
        },
      },
    })
    expect(result.typescript).toEqual({
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'ts/no-explicit-any': 'error',
        'ts/custom-rule': 'warn',
      },
    })
  })

  it('should use default value when user does not pass the key', () => {
    const result = mergeOptions({})
    expect(result.typescript).toBeDefined()
    expect(result.pnpm).toBe(false)
  })

  it('should keep user value when user passes false', () => {
    const result = mergeOptions({
      typescript: false,
    })
    expect(result.typescript).toBe(false)
  })

  it('should use user value when default is boolean', () => {
    const result = mergeOptions({
      pnpm: true,
    })
    // pnpm default is false, but user passes true, user value should override
    expect(result.pnpm).toBe(true)
  })

  it('should handle multiple keys correctly', () => {
    const result = mergeOptions({
      typescript: true,
      react: false,
      pnpm: true,
    })
    expect(result.typescript).toEqual({
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'ts/no-explicit-any': 'warn',
      },
    })
    expect(result.react).toBe(false)
    expect(result.pnpm).toBe(true)
  })

  it('should preserve other user options not in defaultOptions', () => {
    const result = mergeOptions({
      vue: true,
      jsonc: false,
    })
    expect(result.vue).toBe(true)
    expect(result.jsonc).toBe(false)
  })

  it('should override the pre configured rules', () => {
    const result = mergeOptions({
      typescript: {
        overrides: {
          'ts/consistent-type-definitions': 'off',
        },
      },
    })
    expect(result.typescript).toEqual({
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'ts/no-explicit-any': 'warn',
      },
    })
  })
})
