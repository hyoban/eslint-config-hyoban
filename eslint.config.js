// @ts-check
import typegen from 'eslint-typegen'
import JITI from 'jiti'

const jiti = JITI(import.meta.url)
/**
 * @type {import('./src').default}
 */
const hyoban = jiti('./src').default

export default typegen(hyoban(
  {
    ignores: ['eslint-typegen.d.ts'],
    react: true,
    typescript: {
      strict: true,
      typeChecked: true,
    },
  },
))
