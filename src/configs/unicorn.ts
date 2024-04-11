/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Linter } from 'eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'

export default function unicornConfig(): Linter.FlatConfig {
	const config = pluginUnicorn.configs['flat/recommended']
	const customConfig: Linter.FlatConfig = {
		...config,
		rules: {
			...config.rules,
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/catch-error-name': 'off',
			// https://github.com/sindresorhus/meta/discussions/7
			'unicorn/no-null': 'off',
			// https://github.com/orgs/web-infra-dev/discussions/10
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/no-negated-condition': 'off',
			'unicorn/no-await-expression-member': 'off',

			// conflicts with prettier
			'unicorn/template-indent': 'off',
			'unicorn/empty-brace-spaces': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/number-literal-case': 'off',
		},
	}

	const allRuleKeys = Object.keys(customConfig.rules as Record<string, unknown>)
	for (const ruleKey of allRuleKeys) {
		if (customConfig.rules?.[ruleKey] === 'off') {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete customConfig.rules[ruleKey]
		}
	}

	return customConfig
}
