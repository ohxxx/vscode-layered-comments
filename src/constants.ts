/**
 * 最大宽度
 */
export const MAX_WIDTH = 40

/**
 * 默认填充符号
 */
export const DEFAULT_FILL_SYM = '*'

/**
 * 语言注释符号
 */
export const LANGUAGE_SYM = {
  '/*': [
    'c', 'cpp',
    'csharp', 'go',
    'groovy', 'java',
    'kotlin', 'objective-c',
    'swift', 'php',
    'jsonc', 'scala',
    'sql', 'css',
    'less', 'sass',
    'stylus', 'vue',
    'javascript', 'javascriptreact',
    'typescript', 'typescriptreact',
    'rust',
  ],
  '#': [
    'bash', 'dockerfile',
    'coffeescript', 'ignore',
    'julia', 'makefile',
    'perl', 'perl6',
    'powershell', 'properties',
    'python', 'r',
    'ruby', 'shell',
    'shellscript', 'yaml',
    'yml', 'home-assistant',
    'plaintext',
  ],
  '<!--': [
    'html', 'markdown',
    'plist', 'xaml',
    'xml', 'xsl',
  ],
  ';': [
    'clojure', 'lisp',
    'scheme', 'ini',
    'rainmeter',
  ],
  '--': [
    'elm', 'haskell',
    'lua',
  ],
  '%': [
    'erlang', 'latex',
    'matlab',
  ],
  '//-': [
    'jade', 'pug',
  ],
  '(*': [
    'fsharp',
  ],
  '@REM': [
    'bat',
  ],
  '\'': [
    'vb',
  ],
} as const

/**
 * 闭合符号
 */
export const CLOSED_SYM = {
  '/*': '*/',
  '#': '#',
  '<!--': '-->',
  ';': ';',
  '--': '--',
  '%': '%',
  '//-': '-//',
  '(*': '*)',
  '@REM': '@REM',
  '\'': '\'',
} as const
