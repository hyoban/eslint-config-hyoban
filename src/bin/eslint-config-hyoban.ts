import fs from 'node:fs'

// @ts-expect-error - bunchee will handle this
import formatAction from './format.txt'
// @ts-expect-error - bunchee will handle this
import settings from './settings.txt'

interface PackageJson {
  scripts: Record<string, string>
  type?: string
}

try {
  const packageJson = fs.readFileSync('package.json', 'utf8')
  const packageJsonParsed = JSON.parse(packageJson) as PackageJson
  packageJsonParsed.scripts = {
    ...packageJsonParsed.scripts,
    lint: 'eslint .',
  }
  fs.writeFileSync(
    'package.json',
    `${JSON.stringify(packageJsonParsed, null, 2)}\n`,
  )

  if (!fs.existsSync('.vscode')) {
    fs.mkdirSync('.vscode')
  }

  fs.writeFileSync('.vscode/settings.json', settings as string)

  if (!fs.existsSync('.github')) {
    fs.mkdirSync('.github')
  }

  if (!fs.existsSync('.github/workflows')) {
    fs.mkdirSync('.github/workflows')
  }

  fs.writeFileSync('.github/workflows/format.yml', formatAction as string)

  const eslintConfig =
    "import hyoban from 'eslint-config-hyoban'\n\nexport default hyoban()\n"
  fs.writeFileSync(
    packageJsonParsed.type === 'module'
      ? 'eslint.config.js'
      : 'eslint.config.mjs',
    eslintConfig,
  )
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message)
  }
}
