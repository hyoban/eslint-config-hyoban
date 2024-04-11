// @ts-check
import typegen from 'eslint-typegen'

import hyoban from './dist/index.js'

export default typegen(
	hyoban({
		ignores: ['eslint-typegen.d.ts'],
		react: true,
		strict: true,
		typeChecked: true,
	}),
)
