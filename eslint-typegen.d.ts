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
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/md-consistent-table-width.test.ts
   */
  'hyoban/md-consistent-table-width'?: Linter.RuleEntry<[]>
  /**
   * Wrap markdown paragraphs so each sentence is on its own line
   * @see https://github.com/hyoban/eslint-plugin-hyoban/blob/main/src/md-one-sentence-per-line.test.ts
   */
  'hyoban/md-one-sentence-per-line'?: Linter.RuleEntry<[]>
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
   * enforce consistent use of closing sequence in ATX headings.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/atx-heading-closing-sequence.html
   */
  'markdown-preferences/atx-heading-closing-sequence'?: Linter.RuleEntry<MarkdownPreferencesAtxHeadingClosingSequence>
  /**
   * enforce consistent length for the closing sequence (trailing #s) in ATX headings.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/atx-heading-closing-sequence-length.html
   */
  'markdown-preferences/atx-heading-closing-sequence-length'?: Linter.RuleEntry<MarkdownPreferencesAtxHeadingClosingSequenceLength>
  /**
   * enforce consistent alignment of blockquote markers
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/blockquote-marker-alignment.html
   */
  'markdown-preferences/blockquote-marker-alignment'?: Linter.RuleEntry<[]>
  /**
   * enforce consistent bullet list (unordered list) marker style
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/bullet-list-marker-style.html
   */
  'markdown-preferences/bullet-list-marker-style'?: Linter.RuleEntry<MarkdownPreferencesBulletListMarkerStyle>
  /**
   * enforce canonical language names in code blocks
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/canonical-code-block-language.html
   */
  'markdown-preferences/canonical-code-block-language'?: Linter.RuleEntry<MarkdownPreferencesCanonicalCodeBlockLanguage>
  /**
   * enforce consistent code fence length in fenced code blocks.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/code-fence-length.html
   */
  'markdown-preferences/code-fence-length'?: Linter.RuleEntry<MarkdownPreferencesCodeFenceLength>
  /**
   * require or disallow spacing between opening code fence and language identifier
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/code-fence-spacing.html
   */
  'markdown-preferences/code-fence-spacing'?: Linter.RuleEntry<MarkdownPreferencesCodeFenceSpacing>
  /**
   * enforce a consistent code fence style (backtick or tilde) in Markdown fenced code blocks.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/code-fence-style.html
   */
  'markdown-preferences/code-fence-style'?: Linter.RuleEntry<MarkdownPreferencesCodeFenceStyle>
  /**
   * require or disallow spacing between opening custom container marker and info
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/custom-container-marker-spacing.html
   */
  'markdown-preferences/custom-container-marker-spacing'?: Linter.RuleEntry<MarkdownPreferencesCustomContainerMarkerSpacing>
  /**
   * require link definitions and footnote definitions to be placed at the end of the document
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/definitions-last.html
   */
  'markdown-preferences/definitions-last'?: Linter.RuleEntry<MarkdownPreferencesDefinitionsLast>
  /**
   * enforce consistent emoji notation style in Markdown files.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/emoji-notation.html
   */
  'markdown-preferences/emoji-notation'?: Linter.RuleEntry<MarkdownPreferencesEmojiNotation>
  /**
   * enforce a consistent delimiter style for emphasis and strong emphasis
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/emphasis-delimiters-style.html
   */
  'markdown-preferences/emphasis-delimiters-style'?: Linter.RuleEntry<MarkdownPreferencesEmphasisDelimitersStyle>
  /**
   * enforce consistent hard linebreak style.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/hard-linebreak-style.html
   */
  'markdown-preferences/hard-linebreak-style'?: Linter.RuleEntry<MarkdownPreferencesHardLinebreakStyle>
  /**
   * enforce consistent casing in headings.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/heading-casing.html
   */
  'markdown-preferences/heading-casing'?: Linter.RuleEntry<MarkdownPreferencesHeadingCasing>
  /**
   * enforce consistent indentation in Markdown files
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/indent.html
   */
  'markdown-preferences/indent'?: Linter.RuleEntry<MarkdownPreferencesIndent>
  /**
   * enforce consistent style for level 1 headings
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/level1-heading-style.html
   */
  'markdown-preferences/level1-heading-style'?: Linter.RuleEntry<MarkdownPreferencesLevel1HeadingStyle>
  /**
   * enforce consistent style for level 2 headings
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/level2-heading-style.html
   */
  'markdown-preferences/level2-heading-style'?: Linter.RuleEntry<MarkdownPreferencesLevel2HeadingStyle>
  /**
   * enforce linebreaks after opening and before closing link brackets
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-bracket-newline.html
   */
  'markdown-preferences/link-bracket-newline'?: Linter.RuleEntry<MarkdownPreferencesLinkBracketNewline>
  /**
   * enforce consistent spacing inside link brackets
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-bracket-spacing.html
   */
  'markdown-preferences/link-bracket-spacing'?: Linter.RuleEntry<MarkdownPreferencesLinkBracketSpacing>
  /**
   * enforce a consistent style for link destinations
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-destination-style.html
   */
  'markdown-preferences/link-destination-style'?: Linter.RuleEntry<MarkdownPreferencesLinkDestinationStyle>
  /**
   * enforce linebreaks after opening and before closing link parentheses
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-paren-newline.html
   */
  'markdown-preferences/link-paren-newline'?: Linter.RuleEntry<MarkdownPreferencesLinkParenNewline>
  /**
   * enforce consistent spacing inside link parentheses
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-paren-spacing.html
   */
  'markdown-preferences/link-paren-spacing'?: Linter.RuleEntry<MarkdownPreferencesLinkParenSpacing>
  /**
   * enforce a consistent style for link titles
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/link-title-style.html
   */
  'markdown-preferences/link-title-style'?: Linter.RuleEntry<MarkdownPreferencesLinkTitleStyle>
  /**
   * enforce consistent alignment of list markers
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/list-marker-alignment.html
   */
  'markdown-preferences/list-marker-alignment'?: Linter.RuleEntry<MarkdownPreferencesListMarkerAlignment>
  /**
   * enforce maximum length for various Markdown entities
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/max-len.html
   */
  'markdown-preferences/max-len'?: Linter.RuleEntry<MarkdownPreferencesMaxLen>
  /**
   * disallow trailing punctuation in headings.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-heading-trailing-punctuation.html
   */
  'markdown-preferences/no-heading-trailing-punctuation'?: Linter.RuleEntry<MarkdownPreferencesNoHeadingTrailingPunctuation>
  /**
   * disallow implicit block closing for fenced code blocks, math blocks, and custom containers
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-implicit-block-closing.html
   */
  'markdown-preferences/no-implicit-block-closing'?: Linter.RuleEntry<[]>
  /**
   * disallow laziness in blockquotes
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-laziness-blockquotes.html
   */
  'markdown-preferences/no-laziness-blockquotes'?: Linter.RuleEntry<[]>
  /**
   * disallow multiple spaces
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-multi-spaces.html
   */
  'markdown-preferences/no-multi-spaces'?: Linter.RuleEntry<[]>
  /**
   * disallow multiple empty lines in Markdown files.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-multiple-empty-lines.html
   */
  'markdown-preferences/no-multiple-empty-lines'?: Linter.RuleEntry<MarkdownPreferencesNoMultipleEmptyLines>
  /**
   * disallow tab characters in Markdown files.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-tabs.html
   */
  'markdown-preferences/no-tabs'?: Linter.RuleEntry<MarkdownPreferencesNoTabs>
  /**
   * disallow text backslash at the end of a line.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-text-backslash-linebreak.html
   */
  'markdown-preferences/no-text-backslash-linebreak'?: Linter.RuleEntry<[]>
  /**
   * disallow trailing whitespace at the end of lines in Markdown files.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/no-trailing-spaces.html
   */
  'markdown-preferences/no-trailing-spaces'?: Linter.RuleEntry<MarkdownPreferencesNoTrailingSpaces>
  /**
   * enforce consistent ordered list marker numbering (sequential or flat)
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/ordered-list-marker-sequence.html
   */
  'markdown-preferences/ordered-list-marker-sequence'?: Linter.RuleEntry<MarkdownPreferencesOrderedListMarkerSequence>
  /**
   * enforce that ordered list markers start with 1 or 0
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/ordered-list-marker-start.html
   */
  'markdown-preferences/ordered-list-marker-start'?: Linter.RuleEntry<MarkdownPreferencesOrderedListMarkerStart>
  /**
   * enforce consistent ordered list marker style
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/ordered-list-marker-style.html
   */
  'markdown-preferences/ordered-list-marker-style'?: Linter.RuleEntry<MarkdownPreferencesOrderedListMarkerStyle>
  /**
   * disallow or require padding inside custom containers
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/padded-custom-containers.html
   */
  'markdown-preferences/padded-custom-containers'?: Linter.RuleEntry<MarkdownPreferencesPaddedCustomContainers>
  /**
   * require or disallow padding lines between blocks
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/padding-line-between-blocks.html
   */
  'markdown-preferences/padding-line-between-blocks'?: Linter.RuleEntry<MarkdownPreferencesPaddingLineBetweenBlocks>
  /**
   * enforce the use of autolinks for URLs
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/prefer-autolinks.html
   */
  'markdown-preferences/prefer-autolinks'?: Linter.RuleEntry<[]>
  /**
   * enforce the use of fenced code blocks over indented code blocks
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/prefer-fenced-code-blocks.html
   */
  'markdown-preferences/prefer-fenced-code-blocks'?: Linter.RuleEntry<[]>
  /**
   * enforce the use of inline code for specific words.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/prefer-inline-code-words.html
   */
  'markdown-preferences/prefer-inline-code-words'?: Linter.RuleEntry<MarkdownPreferencesPreferInlineCodeWords>
  /**
   * enforce using link reference definitions instead of inline links
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/prefer-link-reference-definitions.html
   */
  'markdown-preferences/prefer-link-reference-definitions'?: Linter.RuleEntry<MarkdownPreferencesPreferLinkReferenceDefinitions>
  /**
   * enforce the specified word to be a link.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/prefer-linked-words.html
   */
  'markdown-preferences/prefer-linked-words'?: Linter.RuleEntry<MarkdownPreferencesPreferLinkedWords>
  /**
   * enforce setext heading underline length
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/setext-heading-underline-length.html
   */
  'markdown-preferences/setext-heading-underline-length'?: Linter.RuleEntry<MarkdownPreferencesSetextHeadingUnderlineLength>
  /**
   * enforce a specific order for link definitions and footnote definitions
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/sort-definitions.html
   */
  'markdown-preferences/sort-definitions'?: Linter.RuleEntry<MarkdownPreferencesSortDefinitions>
  /**
   * enforce a consistent delimiter style for strikethrough
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/strikethrough-delimiters-style.html
   */
  'markdown-preferences/strikethrough-delimiters-style'?: Linter.RuleEntry<MarkdownPreferencesStrikethroughDelimitersStyle>
  /**
   * enforce consistent casing in table header cells.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/table-header-casing.html
   */
  'markdown-preferences/table-header-casing'?: Linter.RuleEntry<MarkdownPreferencesTableHeaderCasing>
  /**
   * enforce consistent use of leading and trailing pipes in tables.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/table-leading-trailing-pipes.html
   */
  'markdown-preferences/table-leading-trailing-pipes'?: Linter.RuleEntry<MarkdownPreferencesTableLeadingTrailingPipes>
  /**
   * enforce consistent alignment of table pipes
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/table-pipe-alignment.html
   */
  'markdown-preferences/table-pipe-alignment'?: Linter.RuleEntry<MarkdownPreferencesTablePipeAlignment>
  /**
   * enforce consistent spacing around table pipes
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/table-pipe-spacing.html
   */
  'markdown-preferences/table-pipe-spacing'?: Linter.RuleEntry<MarkdownPreferencesTablePipeSpacing>
  /**
   * enforce consistent character style for thematic breaks (horizontal rules) in Markdown.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/thematic-break-character-style.html
   */
  'markdown-preferences/thematic-break-character-style'?: Linter.RuleEntry<MarkdownPreferencesThematicBreakCharacterStyle>
  /**
   * enforce consistent length for thematic breaks (horizontal rules) in Markdown.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/thematic-break-length.html
   */
  'markdown-preferences/thematic-break-length'?: Linter.RuleEntry<MarkdownPreferencesThematicBreakLength>
  /**
   * enforce consistent repeating patterns for thematic breaks (horizontal rules) in Markdown.
   * @see https://ota-meshi.github.io/eslint-plugin-markdown-preferences/rules/thematic-break-sequence-pattern.html
   */
  'markdown-preferences/thematic-break-sequence-pattern'?: Linter.RuleEntry<MarkdownPreferencesThematicBreakSequencePattern>
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
   * Enforce consistent code style
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-code-style
   */
  'md/consistent-code-style'?: Linter.RuleEntry<MdConsistentCodeStyle>
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
// ----- markdown-preferences/atx-heading-closing-sequence -----
type MarkdownPreferencesAtxHeadingClosingSequence = []|[{
  closingSequence?: ("always" | "never")
}]
// ----- markdown-preferences/atx-heading-closing-sequence-length -----
type MarkdownPreferencesAtxHeadingClosingSequenceLength = []|[{
  mode?: ("match-opening" | "length" | "consistent" | "consistent-line-length" | "fixed-line-length")
  length?: number
}]
// ----- markdown-preferences/bullet-list-marker-style -----
type MarkdownPreferencesBulletListMarkerStyle = []|[{
  primary?: ("-" | "*" | "+")
  secondary?: ("-" | "*" | "+" | "any")
  overrides?: {
    level?: number
    parentMarker?: ("-" | "*" | "+" | "any" | "ordered")
    primary?: ("-" | "*" | "+")
    secondary?: ("-" | "*" | "+" | "any")
  }[]
}]
// ----- markdown-preferences/canonical-code-block-language -----
type MarkdownPreferencesCanonicalCodeBlockLanguage = []|[{
  languages?: {
    [k: string]: string
  }
}]
// ----- markdown-preferences/code-fence-length -----
type MarkdownPreferencesCodeFenceLength = []|[{
  length?: number
  fallbackLength?: (number | ("minimum" | "as-is"))
  overrides?: {
    lang: string
    length?: number
    fallbackLength?: (number | ("minimum" | "as-is"))
  }[]
}]
// ----- markdown-preferences/code-fence-spacing -----
type MarkdownPreferencesCodeFenceSpacing = []|[{
  space?: ("always" | "never")
}]
// ----- markdown-preferences/code-fence-style -----
type MarkdownPreferencesCodeFenceStyle = []|[{
  style?: ("backtick" | "tilde")
}]
// ----- markdown-preferences/custom-container-marker-spacing -----
type MarkdownPreferencesCustomContainerMarkerSpacing = []|[{
  space?: ("always" | "never")
}]
// ----- markdown-preferences/definitions-last -----
type MarkdownPreferencesDefinitionsLast = []|[{
  linkDefinitionPlacement?: {
    referencedFromSingleSection?: ("document-last" | "section-last")
    referencedFromMultipleSections?: ("document-last" | "first-reference-section-last" | "last-reference-section-last")
  }
  footnoteDefinitionPlacement?: {
    referencedFromSingleSection?: ("document-last" | "section-last")
    referencedFromMultipleSections?: ("document-last" | "first-reference-section-last" | "last-reference-section-last")
  }
}]
// ----- markdown-preferences/emoji-notation -----
type MarkdownPreferencesEmojiNotation = []|[{
  
  prefer?: ("unicode" | "colon")
  
  ignoreUnknown?: boolean
  
  ignoreList?: string[]
}]
// ----- markdown-preferences/emphasis-delimiters-style -----
type MarkdownPreferencesEmphasisDelimitersStyle = []|[{
  emphasis?: ("*" | "_")
  strong?: ("**" | "__")
  strongEmphasis?: (("***" | "___") | {
    outer: "*"
    inner: "__"
  } | {
    outer: "**"
    inner: "_"
  } | {
    outer: "_"
    inner: "**"
  } | {
    outer: "__"
    inner: "*"
  })
}]
// ----- markdown-preferences/hard-linebreak-style -----
type MarkdownPreferencesHardLinebreakStyle = []|[{
  style?: ("backslash" | "spaces")
}]
// ----- markdown-preferences/heading-casing -----
type MarkdownPreferencesHeadingCasing = []|[{
  style?: ("Title Case" | "Sentence case")
  
  preserveWords?: string[]
  
  ignorePatterns?: string[]
  
  minorWords?: string[]
}]
// ----- markdown-preferences/indent -----
type MarkdownPreferencesIndent = []|[{
  listItems?: {
    first?: ("ignore" | number)
    other?: (("first" | "minimum") | number)
    relativeTo?: ("markerStart" | "markerEnd" | "taskListMarkerStart" | "taskListMarkerEnd")
  }
}]
// ----- markdown-preferences/level1-heading-style -----
type MarkdownPreferencesLevel1HeadingStyle = []|[{
  style?: ("atx" | "setext")
  allowMultilineSetext?: boolean
}]
// ----- markdown-preferences/level2-heading-style -----
type MarkdownPreferencesLevel2HeadingStyle = []|[{
  style?: ("atx" | "setext")
  allowMultilineSetext?: boolean
}]
// ----- markdown-preferences/link-bracket-newline -----
type MarkdownPreferencesLinkBracketNewline = []|[{
  newline?: ("always" | "never" | "consistent")
  multiline?: boolean
}]
// ----- markdown-preferences/link-bracket-spacing -----
type MarkdownPreferencesLinkBracketSpacing = []|[{
  space?: ("always" | "never")
  imagesInLinks?: boolean
}]
// ----- markdown-preferences/link-destination-style -----
type MarkdownPreferencesLinkDestinationStyle = []|[{
  style?: ("bare" | "pointy-brackets")
  avoidEscape?: boolean
}]
// ----- markdown-preferences/link-paren-newline -----
type MarkdownPreferencesLinkParenNewline = []|[{
  newline?: ("always" | "never" | "consistent")
  multiline?: boolean
}]
// ----- markdown-preferences/link-paren-spacing -----
type MarkdownPreferencesLinkParenSpacing = []|[{
  space?: ("always" | "never")
}]
// ----- markdown-preferences/link-title-style -----
type MarkdownPreferencesLinkTitleStyle = []|[{
  style?: ("double" | "single" | "parentheses")
  avoidEscape?: boolean
}]
// ----- markdown-preferences/list-marker-alignment -----
type MarkdownPreferencesListMarkerAlignment = []|[{
  align?: ("left" | "right")
}]
// ----- markdown-preferences/max-len -----
type MarkdownPreferencesMaxLen = []|[{
  heading?: (number | "ignore")
  paragraph?: (number | "ignore")
  table?: (number | "ignore")
  html?: (number | "ignore")
  math?: (number | "ignore")
  code?: ((number | "ignore") | {
    [k: string]: (number | "ignore")
  })
  frontmatter?: ((number | "ignore") | {
    [k: string]: (number | "ignore")
  })
  list?: ((number | "ignore") | {
    heading?: (number | "ignore")
    paragraph?: (number | "ignore")
    table?: (number | "ignore")
    html?: (number | "ignore")
    math?: (number | "ignore")
    code?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
    frontmatter?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
  })
  blockquote?: ((number | "ignore") | {
    heading?: (number | "ignore")
    paragraph?: (number | "ignore")
    table?: (number | "ignore")
    html?: (number | "ignore")
    math?: (number | "ignore")
    code?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
    frontmatter?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
  })
  footnoteDefinition?: ((number | "ignore") | {
    heading?: (number | "ignore")
    paragraph?: (number | "ignore")
    table?: (number | "ignore")
    html?: (number | "ignore")
    math?: (number | "ignore")
    code?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
    frontmatter?: ((number | "ignore") | {
      [k: string]: (number | "ignore")
    })
  })
  ignoreUrls?: boolean
}]
// ----- markdown-preferences/no-heading-trailing-punctuation -----
type MarkdownPreferencesNoHeadingTrailingPunctuation = []|[{
  punctuation?: (string | {
    
    "1"?: string
    
    "2"?: string
    
    "3"?: string
    
    "4"?: string
    
    "5"?: string
    
    "6"?: string
    
    default?: string
    
    "1-2"?: string
    
    "1-3"?: string
    
    "1-4"?: string
    
    "1-5"?: string
    
    "1-6"?: string
    
    "2-3"?: string
    
    "2-4"?: string
    
    "2-5"?: string
    
    "2-6"?: string
    
    "3-4"?: string
    
    "3-5"?: string
    
    "3-6"?: string
    
    "4-5"?: string
    
    "4-6"?: string
    
    "5-6"?: string
  })
}]
// ----- markdown-preferences/no-multiple-empty-lines -----
type MarkdownPreferencesNoMultipleEmptyLines = []|[{
  max?: number
  maxEOF?: number
  maxBOF?: number
}]
// ----- markdown-preferences/no-tabs -----
type MarkdownPreferencesNoTabs = []|[{
  checkTarget?: ("all" | "indentation" | "non-indentation")
  ignoreCodeBlocks?: string[]
  codeBlockTabWidth?: number
}]
// ----- markdown-preferences/no-trailing-spaces -----
type MarkdownPreferencesNoTrailingSpaces = []|[{
  skipBlankLines?: boolean
  ignoreComments?: boolean
}]
// ----- markdown-preferences/ordered-list-marker-sequence -----
type MarkdownPreferencesOrderedListMarkerSequence = []|[{
  increment?: ("always" | "never")
}]
// ----- markdown-preferences/ordered-list-marker-start -----
type MarkdownPreferencesOrderedListMarkerStart = []|[{
  start?: (1 | 0)
}]
// ----- markdown-preferences/ordered-list-marker-style -----
type MarkdownPreferencesOrderedListMarkerStyle = []|[{
  prefer?: ("n." | "n)")
  overrides?: {
    level?: number
    parentMarker?: ("n." | "n)" | "any" | "bullet")
    prefer?: ("n." | "n)")
  }[]
}]
// ----- markdown-preferences/padded-custom-containers -----
type MarkdownPreferencesPaddedCustomContainers = []|[{
  padding?: ("always" | "never")
  
  overrides?: [{
    info?: (string | [string, ...(string)[]])
    padding?: ("always" | "never")
  }, ...({
    info?: (string | [string, ...(string)[]])
    padding?: ("always" | "never")
  })[]]
}]
// ----- markdown-preferences/padding-line-between-blocks -----
type MarkdownPreferencesPaddingLineBetweenBlocks = {
  prev: (("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*") | [("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"), ...(("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"))[]] | {
    type: (("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*") | [("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"), ...(("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"))[]])
    in?: ("list" | "blockquote" | "footnote-definition")
  })
  next: (("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*") | [("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"), ...(("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"))[]] | {
    type: (("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*") | [("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"), ...(("blockquote" | "code" | "heading" | "html" | "list" | "paragraph" | "thematic-break" | "table" | "link-definition" | "footnote-definition" | "frontmatter" | "custom-container" | "math" | "import-code-snippet" | "*"))[]])
    in?: ("list" | "blockquote" | "footnote-definition")
  })
  blankLine: ("any" | "never" | "always")
}[]
// ----- markdown-preferences/prefer-inline-code-words -----
type MarkdownPreferencesPreferInlineCodeWords = []|[{
  words: string[]
  ignores?: {
    words?: (string | string[])
    node?: {
      [k: string]: unknown | undefined
    }
  }[]
}]
// ----- markdown-preferences/prefer-link-reference-definitions -----
type MarkdownPreferencesPreferLinkReferenceDefinitions = []|[{
  
  minLinks?: number
}]
// ----- markdown-preferences/prefer-linked-words -----
type MarkdownPreferencesPreferLinkedWords = []|[{
  words: ({
    [k: string]: (string | null)
  } | string[])
  ignores?: {
    words?: (string | string[])
    node?: {
      [k: string]: unknown | undefined
    }
  }[]
}]
// ----- markdown-preferences/setext-heading-underline-length -----
type MarkdownPreferencesSetextHeadingUnderlineLength = []|[{
  mode?: ("exact" | "minimum" | "consistent" | "consistent-line-length")
  align?: ("any" | "exact" | "minimum" | "length")
  length?: number
}]
// ----- markdown-preferences/sort-definitions -----
type MarkdownPreferencesSortDefinitions = []|[{
  order?: (string | [string, ...(string)[]] | {
    match: (string | [string, ...(string)[]])
    sort: ("alphabetical" | "ignore")
  })[]
}]
// ----- markdown-preferences/strikethrough-delimiters-style -----
type MarkdownPreferencesStrikethroughDelimitersStyle = []|[{
  delimiter?: ("~" | "~~")
}]
// ----- markdown-preferences/table-header-casing -----
type MarkdownPreferencesTableHeaderCasing = []|[{
  style?: ("Title Case" | "Sentence case")
  
  preserveWords?: string[]
  
  ignorePatterns?: string[]
  
  minorWords?: string[]
}]
// ----- markdown-preferences/table-leading-trailing-pipes -----
type MarkdownPreferencesTableLeadingTrailingPipes = []|[(("always" | "never") | {
  leading?: ("always" | "never")
  trailing?: ("always" | "never")
})]
// ----- markdown-preferences/table-pipe-alignment -----
type MarkdownPreferencesTablePipeAlignment = []|[{
  column?: ("minimum" | "consistent")
  delimiterMinLength?: ("minimum" | number | {
    defaultDelimiter?: number
    leftAlignmentDelimiter?: number
    centerAlignmentDelimiter?: number
    rightAlignmentDelimiter?: number
  })
}]
// ----- markdown-preferences/table-pipe-spacing -----
type MarkdownPreferencesTablePipeSpacing = []|[{
  space?: (("always" | "never") | {
    leading?: ("always" | "never")
    trailing?: ("always" | "never")
  })
  cellAlign?: (("left" | "center" | "right") | {
    defaultDelimiter?: ("left" | "center" | "right" | "ignore")
    leftAlignmentDelimiter?: ("left" | "center" | "right" | "ignore")
    centerAlignmentDelimiter?: ("left" | "center" | "right" | "ignore")
    rightAlignmentDelimiter?: ("left" | "center" | "right" | "ignore")
  })
}]
// ----- markdown-preferences/thematic-break-character-style -----
type MarkdownPreferencesThematicBreakCharacterStyle = []|[{
  style?: ("-" | "*" | "_")
}]
// ----- markdown-preferences/thematic-break-length -----
type MarkdownPreferencesThematicBreakLength = []|[{
  length?: number
}]
// ----- markdown-preferences/thematic-break-sequence-pattern -----
type MarkdownPreferencesThematicBreakSequencePattern = []|[{
  pattern: (string | string | string)
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
// ----- md/consistent-code-style -----
type MdConsistentCodeStyle = []|[{
  style?: ("consistent" | "indent" | "fence-backtick" | "fence-tilde")
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
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
