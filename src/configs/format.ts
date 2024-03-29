import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { UnifiedFlatConfig } from 'eslint-flat-config'
import pluginFormat from 'eslint-plugin-format'

function createFormatter(
  input: { exts: string[], parser: string } | string,
  style?: StylisticCustomizeOptions,
) {
  return {
    name: `prettier:${typeof input === 'string' ? input : input.exts.join('-')}`,
    files:
      typeof input === 'string'
        ? [`**/*.${input}`]
        : input.exts.map(ext => `**/*.${ext}`),
    languageOptions: {
      parser: pluginFormat.parserPlain,
    },
    plugins: {
      format: pluginFormat,
    },
    rules: {
      'format/prettier': [
        'error',
        {
          parser: typeof input === 'string' ? input : input.parser,
          useTabs: style?.indent ? style.indent === 'tab' : false,
          tabWidth: style?.indent ? (style.indent !== 'tab' ? style.indent : 2) : 2,
          singleQuote: style?.quotes ? style.quotes === 'single' : true,
          semi: style?.semi ?? false,
        },
      ],
    },
  } as UnifiedFlatConfig
}

export function format(style?: StylisticCustomizeOptions) {
  return [
    'css',
    {
      exts: ['md'],
      parser: 'markdown',
    },
    'mdx',
    'html',
    {
      parser: 'yaml',
      exts: ['yaml', 'yml'],
    },
  ].map(element => createFormatter(element, style))
}
