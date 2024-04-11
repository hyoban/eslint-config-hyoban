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
		lint: 'eslint . && prettier --check .',
		'lint:fix': 'eslint . --fix && prettier --write .',
	}
	fs.writeFileSync(
		'package.json',
		`${JSON.stringify(packageJsonParsed, null, 2)}\n`,
	)

	if (!fs.existsSync('.vscode')) {
		fs.mkdirSync('.vscode')
	}

	const isVscodeSettingsExist = fs.existsSync('.vscode/settings.json')
	if (isVscodeSettingsExist) {
		const settingsJson = fs.readFileSync('.vscode/settings.json', 'utf8')
		const settingsParsed = JSON.parse(settingsJson) as Record<string, unknown>
		const recommendedSettingsParsed = JSON.parse(settings as string) as Record<
			string,
			unknown
		>
		fs.writeFileSync(
			'.vscode/settings.json',
			`${JSON.stringify(
				{
					...recommendedSettingsParsed,
					...settingsParsed,
				},
				null,
				2,
			)}\n`,
		)
	} else {
		fs.writeFileSync('.vscode/settings.json', settings as string)
	}

	if (!fs.existsSync('.github')) {
		fs.mkdirSync('.github')
	}

	if (!fs.existsSync('.github/workflows')) {
		fs.mkdirSync('.github/workflows')
	}

	fs.writeFileSync('.github/workflows/format.yml', formatAction as string)

	const eslintConfig =
		"// @ts-check\nimport hyoban from 'eslint-config-hyoban'\n\nexport default hyoban()\n"
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
