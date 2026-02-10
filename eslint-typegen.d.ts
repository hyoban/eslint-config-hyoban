/* eslint-disable */
/* prettier-ignore */
import '@antfu/eslint-config'
import type { Linter } from 'eslint'

declare module '@antfu/eslint-config' {
export interface RuleOptions {
  /**
   * Ensure i18n JSON keys are flat and valid as object paths
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/i18n-flat-key.test.ts
   */
  'hyoban/i18n-flat-key'?: Linter.RuleEntry<[]>
  /**
   * Enforce consistent spacing around JSONC attributes
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/jsonc-inline-spacing.test.ts
   */
  'hyoban/jsonc-inline-spacing'?: Linter.RuleEntry<[]>
  /**
   * Enforce consistent spacing around JSX attributes
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/jsx-attribute-spacing.test.ts
   */
  'hyoban/jsx-attribute-spacing'?: Linter.RuleEntry<[]>
  /**
   * Format GFM markdown tables to aligned columns
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/markdown-consistent-table-width.test.ts
   */
  'hyoban/markdown-consistent-table-width'?: Linter.RuleEntry<[]>
  /**
   * Ensure dependency versions do not use configured prefixes (^ or ~)
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/no-dependency-version-prefix.test.ts
   */
  'hyoban/no-dependency-version-prefix'?: Linter.RuleEntry<HyobanNoDependencyVersionPrefix>
  /**
   * Prefer early return pattern to clean if else statement
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/prefer-early-return.test.ts
   */
  'hyoban/prefer-early-return'?: Linter.RuleEntry<[]>
  /**
   * Prefer Tailwind CSS icon classes over icon library components
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/prefer-tailwind-icons.md
   */
  'hyoban/prefer-tailwind-icons'?: Linter.RuleEntry<HyobanPreferTailwindIcons>
  /**
   * Automatically sort exports.
   * @see https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order
   */
  'import-sort/exports'?: Linter.RuleEntry<[]>
  /**
   * Automatically sort imports.
   * @see https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order
   */
  'import-sort/imports'?: Linter.RuleEntry<ImportSortImports>
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
   * Enforce consistent unordered list style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-unordered-list-style
   */
  'md/consistent-unordered-list-style'?: Linter.RuleEntry<MdConsistentUnorderedListStyle>
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
   * Enforce canonical class names.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md
   */
  'tailwindcss/enforce-canonical-classes'?: Linter.RuleEntry<TailwindcssEnforceCanonicalClasses>
  /**
   * Enforce a consistent order for tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md
   */
  'tailwindcss/enforce-consistent-class-order'?: Linter.RuleEntry<TailwindcssEnforceConsistentClassOrder>
  /**
   * Enforce consistent important position for classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-important-position.md
   */
  'tailwindcss/enforce-consistent-important-position'?: Linter.RuleEntry<TailwindcssEnforceConsistentImportantPosition>
  /**
   * Enforce consistent line wrapping for tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md
   */
  'tailwindcss/enforce-consistent-line-wrapping'?: Linter.RuleEntry<TailwindcssEnforceConsistentLineWrapping>
  /**
   * Enforce consistent syntax for css variables.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-variable-syntax.md
   */
  'tailwindcss/enforce-consistent-variable-syntax'?: Linter.RuleEntry<TailwindcssEnforceConsistentVariableSyntax>
  /**
   * Enforce shorthand class names instead of longhand class names.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-shorthand-classes.md
   */
  'tailwindcss/enforce-shorthand-classes'?: Linter.RuleEntry<TailwindcssEnforceShorthandClasses>
  /**
   * Disallow classes that produce conflicting styles.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-conflicting-classes.md
   */
  'tailwindcss/no-conflicting-classes'?: Linter.RuleEntry<TailwindcssNoConflictingClasses>
  /**
   * Disallow the use of deprecated Tailwind CSS classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-deprecated-classes.md
   */
  'tailwindcss/no-deprecated-classes'?: Linter.RuleEntry<TailwindcssNoDeprecatedClasses>
  /**
   * Disallow duplicate class names in tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-duplicate-classes.md
   */
  'tailwindcss/no-duplicate-classes'?: Linter.RuleEntry<TailwindcssNoDuplicateClasses>
  /**
   * Disallow restricted classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md
   */
  'tailwindcss/no-restricted-classes'?: Linter.RuleEntry<TailwindcssNoRestrictedClasses>
  /**
   * Disallow any css classes that are not registered in tailwindcss.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md
   */
  'tailwindcss/no-unknown-classes'?: Linter.RuleEntry<TailwindcssNoUnknownClasses>
  /**
   * Disallow unnecessary whitespace between Tailwind CSS classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unnecessary-whitespace.md
   */
  'tailwindcss/no-unnecessary-whitespace'?: Linter.RuleEntry<TailwindcssNoUnnecessaryWhitespace>
}
}

/* ======= Declarations ======= */
// ----- hyoban/no-dependency-version-prefix -----
type HyobanNoDependencyVersionPrefix = []|[{
  dependencyKeys?: string[]
  versionPrefixes?: string[]
}]
// ----- hyoban/prefer-tailwind-icons -----
type HyobanPreferTailwindIcons = []|[{
  libraries?: {
    source: string
    name?: string
    prefix?: string
  }[]
  
  prefix?: string
  
  propMappings?: {
    [k: string]: string | undefined
  }
}]
// ----- import-sort/imports -----
type ImportSortImports = []|[{
  groups?: string[][]
}]
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
// ----- md/consistent-unordered-list-style -----
type MdConsistentUnorderedListStyle = []|[{
  style?: ("consistent" | "sublist" | "*" | "+" | "-")
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
// ----- tailwindcss/enforce-canonical-classes -----
type TailwindcssEnforceCanonicalClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  collapse?: boolean
  
  logical?: boolean
}]
// ----- tailwindcss/enforce-consistent-class-order -----
type TailwindcssEnforceConsistentClassOrder = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  componentClassOrder?: ("asc" | "desc" | "preserve")
  
  componentClassPosition?: ("start" | "end")
  
  order?: ("asc" | "desc" | "official" | "strict")
  
  unknownClassOrder?: ("asc" | "desc" | "preserve")
  
  unknownClassPosition?: ("start" | "end")
}]
// ----- tailwindcss/enforce-consistent-important-position -----
type TailwindcssEnforceConsistentImportantPosition = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  position?: ("legacy" | "recommended")
}]
// ----- tailwindcss/enforce-consistent-line-wrapping -----
type TailwindcssEnforceConsistentLineWrapping = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  classesPerLine?: number
  
  group?: ("newLine" | "emptyLine" | "never")
  
  indent?: ("tab" | number)
  
  lineBreakStyle?: ("unix" | "windows")
  
  preferSingleLine?: boolean
  
  printWidth?: number
  
  strictness?: ("strict" | "loose")
}]
// ----- tailwindcss/enforce-consistent-variable-syntax -----
type TailwindcssEnforceConsistentVariableSyntax = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  syntax?: ("shorthand" | "variable")
}]
// ----- tailwindcss/enforce-shorthand-classes -----
type TailwindcssEnforceShorthandClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- tailwindcss/no-conflicting-classes -----
type TailwindcssNoConflictingClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- tailwindcss/no-deprecated-classes -----
type TailwindcssNoDeprecatedClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- tailwindcss/no-duplicate-classes -----
type TailwindcssNoDuplicateClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- tailwindcss/no-restricted-classes -----
type TailwindcssNoRestrictedClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  restrict?: ({
    
    fix?: string
    
    message?: string
    
    pattern: string
  } | string)[]
}]
// ----- tailwindcss/no-unknown-classes -----
type TailwindcssNoUnknownClasses = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  ignore?: string[]
}]
// ----- tailwindcss/no-unnecessary-whitespace -----
type TailwindcssNoUnnecessaryWhitespace = []|[{
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  allowMultiline?: boolean
}]
