// @ts-check
import typegen from 'eslint-typegen'

// eslint-disable-next-line antfu/no-import-dist
import hyoban from './dist/index.js'

export default typegen(hyoban(
  {
    ignores: ['eslint-typegen.d.ts'],
    react: true,
    next: true,
    typescript: {
      strict: true,
      typeChecked: true,
    },
  },
))
