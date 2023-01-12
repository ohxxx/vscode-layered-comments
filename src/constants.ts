export const DEFAULT_WIDTH = 40

export const DEFAULT_FILL_SYM = '*'

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
    'wa', 'rust',
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

export const HINT_MSG = {
  EMPTY: '注释文本的长度为空，请检查后重试',
  TOO_LONG: '注释文本的长度过长，请检查后重试',
}
