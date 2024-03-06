#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { ensurePackages } from '../utils'
// @ts-expect-error no types
import settings from './settings.txt'

async function main() {
  try {
  // check if git status is clean
    execSync('git diff-index --quiet HEAD --')
    try {
      await ensurePackages([
        'eslint',
        'eslint-config-hyoban',
        'lint-staged',
        'simple-git-hooks',
      ])

      const packageJson = fs.readFileSync('package.json', 'utf8')
      const packageJsonParsed = JSON.parse(packageJson) as Record<string, Record<string, unknown>>

      packageJsonParsed['lint-staged'] = { '*': 'eslint --fix' }
      packageJsonParsed['simple-git-hooks'] = { 'pre-commit': 'pnpm lint-staged' }
      packageJsonParsed.scripts = {
        ...packageJsonParsed.scripts,
        prepare: 'simple-git-hooks',
        lint: 'eslint .',
      }
      fs.writeFileSync('package.json', `${JSON.stringify(packageJsonParsed, null, 2)}\n`)

      if (!fs.existsSync('.vscode'))
        fs.mkdirSync('.vscode')

      fs.writeFileSync('.vscode/settings.json', settings as string)

      const eslintConfig = `import hyoban from 'eslint-config-hyoban'\n\nexport default hyoban()\n`
      fs.writeFileSync('eslint.config.js', eslintConfig)
    }
    catch (err) {
      if (err instanceof Error)
        console.error(err.message)
    }
  }
  catch {
    console.error('Please commit all changes before running this script')
  }
}

void main()
