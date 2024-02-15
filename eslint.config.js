// @ts-check
// eslint-disable-next-line antfu/no-import-dist
import hyoban from './dist/index.js'

export default hyoban({
	react: true,
	next: true,
	typescript: {
		strict: true,
		typeChecked: true,
	},
})
