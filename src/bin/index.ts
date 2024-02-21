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
    }
    fs.writeFileSync('package.json', JSON.stringify(packageJsonParsed, null, 2))

    if (!fs.existsSync('.vscode')) {
      fs.mkdirSync('.vscode')
    }

    if (!fs.existsSync('.vscode/settings.json')) {
      fs.writeFileSync('.vscode/settings.json', settings as string)
    }
    else {
      const existingSettings = JSON.parse(fs.readFileSync('.vscode/settings.json', 'utf8')) as Record<string, unknown>
      fs.writeFileSync('.vscode/settings.json', JSON.stringify({ ...existingSettings, ...JSON.parse(settings as string) as Record<string, unknown> }, null, 2))
    }
  }).catch(() => {
    console.error('Failed to install required packages')
  })
}
catch {
  console.error('Please commit all changes before running this script')
  process.exit(1)
}
