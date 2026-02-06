type Name = string

type Matchers = [
  name: string,
  configurations: {
    match: 'objectKeys' | 'objectValues' | 'strings'
    pathPattern?: string
  }[],
][]

export type OptionsTailwindcss = {
  settings?: {
    entryPoint?: string | undefined
    tailwindConfig?: string | undefined
    tsconfig?: string | undefined
    detectComponentClasses?: boolean | undefined
    rootFontSize?: number | undefined
    messageStyle?: 'visual' | 'compact' | 'raw' | undefined
    attributes?: Array<Name | Matchers> | undefined
    callees?: Array<Name | Matchers> | undefined
    variables?: Array<Name | Matchers> | undefined
    tags?: Array<Name | Matchers> | undefined
  }
}
