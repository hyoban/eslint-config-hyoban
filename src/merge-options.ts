import defu from 'defu'
import { isPackageExists } from 'local-pkg'

import type { Options } from './index'

export function mergeOptions(options?: Options): Options {
  const defaultOptions = {
    typescript: {
      overrides: {
        'ts/consistent-type-definitions': ['error', 'type'],
        'ts/no-explicit-any': 'warn',
      },
    },
    react: isPackageExists('react') || !!options?.react
      ? {
          overrides: {
            'react/no-context-provider': 'off',
            'react/no-forward-ref': 'off',
            'react/no-use-context': 'off',

            'react-hooks/set-state-in-effect': 'off',
            'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
          },
        }
      : undefined,
    pnpm: false,
    stylistic: { experimental: true },
  } satisfies Options

  const overriddenKeys = Object.keys(defaultOptions) as (keyof typeof defaultOptions)[]

  if (!options)
    return defaultOptions

  for (const key of overriddenKeys) {
    const userValue = options[key]
    const defaultValue = defaultOptions[key]

    if (typeof defaultValue === 'boolean') {
      if (userValue === undefined) {
        (options as any)[key] = defaultValue
      }
    }
    else if (userValue === true) {
      (options as any)[key] = defaultValue
    }
    else if (typeof userValue === 'object' && userValue !== null && defaultValue) {
      (options as any)[key] = defu(userValue, defaultValue)
    }
    else if (userValue === undefined) {
      (options as any)[key] = defaultValue
    }
  }

  return options
}
