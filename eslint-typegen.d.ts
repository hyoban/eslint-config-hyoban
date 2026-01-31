/* eslint-disable */
/* prettier-ignore */
import '@antfu/eslint-config'
import type { Linter } from 'eslint'

declare module '@antfu/eslint-config' {
export interface RuleOptions {
  /**
   * Enforce the use of allowed or disallowed URLs for images
   * @see https://eslint-markdown.lumir.page/docs/rules/allow-image-url
   */
  'md/allow-image-url'?: Linter.RuleEntry<MdAllowImageUrl>
  /**
   * Enforce the use of allowed or disallowed URLs for links
   * @see https://eslint-markdown.lumir.page/docs/rules/allow-link-url
   */
  'md/allow-link-url'?: Linter.RuleEntry<MdAllowLinkUrl>
  /**
   * Enforce the use of shorthand for code block language identifiers
   * @see https://eslint-markdown.lumir.page/docs/rules/code-lang-shorthand
   */
  'md/code-lang-shorthand'?: Linter.RuleEntry<MdCodeLangShorthand>
  /**
   * Enforce consistent delete style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-delete-style
   */
  'md/consistent-delete-style'?: Linter.RuleEntry<MdConsistentDeleteStyle>
  /**
   * Enforce consistent emphasis style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-emphasis-style
   */
  'md/consistent-emphasis-style'?: Linter.RuleEntry<MdConsistentEmphasisStyle>
  /**
   * Enforce consistent strong style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-strong-style
   */
  'md/consistent-strong-style'?: Linter.RuleEntry<MdConsistentStrongStyle>
  /**
   * Enforce consistent thematic break style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-thematic-break-style
   */
  'md/consistent-thematic-break-style'?: Linter.RuleEntry<MdConsistentThematicBreakStyle>
  /**
   * Disallow control character
   * @see https://eslint-markdown.lumir.page/docs/rules/no-control-character
   */
  'md/no-control-character'?: Linter.RuleEntry<MdNoControlCharacter>
  /**
   * Disallow curly quotes(`“`, `”`, `‘` or `’`) in text
   * @see https://eslint-markdown.lumir.page/docs/rules/no-curly-quote
   */
  'md/no-curly-quote'?: Linter.RuleEntry<MdNoCurlyQuote>
  /**
   * Disallow double or multiple consecutive spaces in text, except for leading and trailing spaces
   * @see https://eslint-markdown.lumir.page/docs/rules/no-double-space
   */
  'md/no-double-space'?: Linter.RuleEntry<MdNoDoubleSpace>
  /**
   * Disallow emojis in text
   * @see https://eslint-markdown.lumir.page/docs/rules/no-emoji
   */
  'md/no-emoji'?: Linter.RuleEntry<[]>
  /**
   * Disallow git conflict markers
   * @see https://eslint-markdown.lumir.page/docs/rules/no-git-conflict-marker
   */
  'md/no-git-conflict-marker'?: Linter.RuleEntry<MdNoGitConflictMarker>
  /**
   * Disallow irregular dash
   * @see https://eslint-markdown.lumir.page/docs/rules/no-irregular-dash
   */
  'md/no-irregular-dash'?: Linter.RuleEntry<MdNoIrregularDash>
  /**
   * Disallow irregular whitespace
   * @see https://eslint-markdown.lumir.page/docs/rules/no-irregular-whitespace
   */
  'md/no-irregular-whitespace'?: Linter.RuleEntry<MdNoIrregularWhitespace>
  /**
   * Disallow tab characters
   * @see https://eslint-markdown.lumir.page/docs/rules/no-tab
   */
  'md/no-tab'?: Linter.RuleEntry<MdNoTab>
  /**
   * Disallow URL trailing slash
   * @see https://eslint-markdown.lumir.page/docs/rules/no-url-trailing-slash
   */
  'md/no-url-trailing-slash'?: Linter.RuleEntry<[]>
  /**
   * Enforce the use of title attribute for images
   * @see https://eslint-markdown.lumir.page/docs/rules/require-image-title
   */
  'md/require-image-title'?: Linter.RuleEntry<MdRequireImageTitle>
  /**
   * Enforce the use of title attribute for links
   * @see https://eslint-markdown.lumir.page/docs/rules/require-link-title
   */
  'md/require-link-title'?: Linter.RuleEntry<MdRequireLinkTitle>
  /**
   * Automatically sort exports.
   * @see https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order
   */
  'simple-import-sort/exports'?: Linter.RuleEntry<[]>
  /**
   * Automatically sort imports.
   * @see https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order
   */
  'simple-import-sort/imports'?: Linter.RuleEntry<SimpleImportSortImports>
}
}

/* ======= Declarations ======= */
// ----- md/allow-image-url -----
type MdAllowImageUrl = []|[{
  allowUrls?: {
    [k: string]: unknown | undefined
  }[]
  disallowUrls?: {
    [k: string]: unknown | undefined
  }[]
  allowDefinitions?: string[]
}]
// ----- md/allow-link-url -----
type MdAllowLinkUrl = []|[{
  allowUrls?: {
    [k: string]: unknown | undefined
  }[]
  disallowUrls?: {
    [k: string]: unknown | undefined
  }[]
  allowDefinitions?: string[]
}]
// ----- md/code-lang-shorthand -----
type MdCodeLangShorthand = []|[{
  allow?: string[]
  override?: {
    [k: string]: string | undefined
  }
}]
// ----- md/consistent-delete-style -----
type MdConsistentDeleteStyle = []|[{
  style?: ("consistent" | "~" | "~~")
}]
// ----- md/consistent-emphasis-style -----
type MdConsistentEmphasisStyle = []|[{
  style?: ("consistent" | "*" | "_")
}]
// ----- md/consistent-strong-style -----
type MdConsistentStrongStyle = []|[{
  style?: ("consistent" | "*" | "_")
}]
// ----- md/consistent-thematic-break-style -----
type MdConsistentThematicBreakStyle = []|[{
  style?: string
}]
// ----- md/no-control-character -----
type MdNoControlCharacter = []|[{
  allow?: string[]
  skipCode?: (boolean | string[])
  skipInlineCode?: boolean
}]
// ----- md/no-curly-quote -----
type MdNoCurlyQuote = []|[{
  checkLeftDoubleQuotationMark?: boolean
  checkRightDoubleQuotationMark?: boolean
  checkLeftSingleQuotationMark?: boolean
  checkRightSingleQuotationMark?: boolean
}]
// ----- md/no-double-space -----
type MdNoDoubleSpace = []|[{
  checkMultipleSpace?: boolean
}]
// ----- md/no-git-conflict-marker -----
type MdNoGitConflictMarker = []|[{
  skipCode?: (boolean | string[])
}]
// ----- md/no-irregular-dash -----
type MdNoIrregularDash = []|[{
  allow?: string[]
  skipCode?: (boolean | string[])
  skipInlineCode?: boolean
}]
// ----- md/no-irregular-whitespace -----
type MdNoIrregularWhitespace = []|[{
  allow?: string[]
  skipCode?: (boolean | string[])
  skipInlineCode?: boolean
}]
// ----- md/no-tab -----
type MdNoTab = []|[{
  skipCode?: (boolean | string[])
  skipInlineCode?: boolean
  tabWidth?: number
}]
// ----- md/require-image-title -----
type MdRequireImageTitle = []|[{
  allowDefinitions?: string[]
}]
// ----- md/require-link-title -----
type MdRequireLinkTitle = []|[{
  allowDefinitions?: string[]
}]
// ----- simple-import-sort/imports -----
type SimpleImportSortImports = []|[{
  groups?: string[][]
}]
