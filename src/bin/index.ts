#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { ensurePackages } from '../utils'
// @ts-expect-error no types
import settings from './settings.txt'

try {
  // check if git status is clean
  execSync('git diff-index --quiet HEAD --')
  ensurePackages([
    'lint-staged',
    'simple-git-hooks',
  ]).then(() => {
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
  }).catch((err: Error) => {
    console.error(err.message)
  })
}
catch {
  console.error('Please commit all changes before running this script')
  process.exit(1)
}
