import { createDefu } from 'defu'
import type { Linter } from 'eslint'

import { GLOB_SRC } from './consts'
import type { Options } from './option'

type MaybeArray<T> = T | T[]
type Awaitable<T> = T | Promise<T>

export async function interopDefault<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}

const severities = new Set([0, 1, 2, 'off', 'warn', 'error'])

export const defu = createDefu((obj, key, value) => {
  if (
    Array.isArray(value)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    && severities.has(value[0])
    && Array.isArray(obj[key])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    && severities.has(obj[key][0])
  ) {
    // @ts-expect-error It's fine here
    obj[key] = [...value]
    return true
  }

  // use set to merge arrays
  if (Array.isArray(value) && Array.isArray(obj[key])) {
    // @ts-expect-error It's fine here
    obj[key] = [...new Set([...obj[key], ...value].sort())]
    return true
  }
})

type CreateFlatConfig = () => Awaitable<MaybeArray<Linter.Config> | undefined>

export type ConfigArray = Array<
  | undefined
  | null
  | false
  | MaybeArray<Awaitable<Linter.Config | undefined | null | false>>
  | CreateFlatConfig
>

export async function config(
  options: Required<Options>,
  ...configs: ConfigArray
): Promise<Linter.Config[]> {
  const { ignoreFiles, ignores } = options
  const gitignore = await interopDefault(import('eslint-config-flat-gitignore'))
  const globalIgnores = defu(
    {
      ignores,
    },
    gitignore(
      {
        files: ignoreFiles,
        strict: false,
      },
    ),
  )

  return [
    globalIgnores,
    ...(
      await Promise.all(
        configs.map(async (c) => {
          if (typeof c === 'function') {
            const resolved = await c()

            if (!resolved)
              return

            return mergeConfigs(resolved)
          }

          if (!c)
            return

          return mergeConfigs(c)
        }),
      )
    ).filter(i => !!i),
  ]
}

async function mergeConfigs(
  _c: MaybeArray<Awaitable<Linter.Config | undefined | null | false>>,
): Promise<Linter.Config | undefined> {
  const c = await _c

  if (!c)
    return

  if (Array.isArray(c))
    return withFiles(defu({}, ...c.reverse()))

  return withFiles(c)
}

function withFiles(
  config: Linter.Config,
): Linter.Config {
  return defu<Linter.Config, Linter.Config[]>(
    config,
    'files' in config ? {} : { files: GLOB_SRC },
  )
}
