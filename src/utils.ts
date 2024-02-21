import process from 'node:process'

import { isPackageExists } from 'local-pkg'

export type Awaitable<T> = T | Promise<T>

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  return (resolved as any).default || resolved
}

export async function ensurePackages(packages: string[]) {
  if (process.env.CI ?? !process.stdout.isTTY)
    return

  const nonExistingPackages = packages.filter(i => !isPackageExists(i))
  if (nonExistingPackages.length === 0)
    return

  const { default: prompts } = await import('prompts')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { result } = await prompts([
    {
      message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
      name: 'result',
      type: 'confirm',
    },
  ])
  if (!result)
    throw new Error('You have to install required packages')

  await import('@antfu/install-pkg').then(i => i.installPackage(nonExistingPackages, { dev: true }))
}
