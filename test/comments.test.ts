import { describe, expect, it } from 'vitest'
import Comments from '../src/comments'
import type { ILang } from '../src/types'

describe('【生成注释函数】- 格式', () => {
  it('单行 - 英文', () => {
    const text = new Comments('xxx', 'typescript').generate
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *                  xxx                 *
      *                                      *
      ***************************************/"
    `)
  })

  it('多行 - 英文', () => {
    const text = new Comments('Halo, I\'m xxx\nI am a developer', 'typescript').generate
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *           Halo, I'm xxx              *
      *           I am a developer           *
      *                                      *
      ***************************************/"
    `)
  })
})

describe('【生成注释函数】- 语言', () => {
  it('/* 注释', () => {
    const comments
= `/***************************************
*                                      *
*                  xxx                 *
*                                      *
***************************************/`

    const languageSet = [
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
    ]
    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang as ILang).generate).toBe(comments) }
  })

  it(' # 注释', () => {
    const comments
= `#**************************************#
#                                      #
#                  xxx                 #
#                                      #
#**************************************#`

    const languageSet = [
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
    ]
    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' <!-- 注释', () => {
    const comments
= `<!--************************************
*                                      *
*                  xxx                 *
*                                      *
*************************************-->`

    const languageSet = [
      'html', 'markdown',
      'plist', 'xaml',
      'xml', 'xsl',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' ; 注释', () => {
    const comments
= `;**************************************;
;                                      ;
;                  xxx                 ;
;                                      ;
;**************************************;`

    const languageSet = [
      'clojure', 'lisp',
      'scheme', 'ini',
      'rainmeter',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' -- 注释', () => {
    const comments
= `--************************************--
--                                    --
--                 xxx                --
--                                    --
--************************************--`

    const languageSet = [
      'elm', 'haskell',
      'lua',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' % 注释', () => {
    const comments
= `%**************************************%
%                                      %
%                  xxx                 %
%                                      %
%**************************************%`

    const languageSet = [
      'erlang', 'latex',
      'matlab',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' //- 注释', () => {
    const comments
= `//-**********************************-//
//-                                  -//
//-                xxx               -//
//-                                  -//
//-**********************************-//`

    const languageSet = [
      'jade', 'pug',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' (* 注释', () => {
    const comments
= `(**************************************)
(*                                    *)
(*                 xxx                *)
(*                                    *)
(**************************************)`

    const languageSet = [
      'fsharp',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' @REM 注释', () => {
    const comments
= `@REM********************************@REM
@REM                                @REM
@REM               xxx              @REM
@REM                                @REM
@REM********************************@REM`

    const languageSet = [
      'bat',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })

  it(' \' 注释', () => {
    const comments
= `'**************************************'
'                                      '
'                  xxx                 '
'                                      '
'**************************************'`

    const languageSet = [
      'vb',
    ]

    for (const lang of languageSet) { expect(new Comments('xxx', lang as ILang).generate).toBe(comments) }
  })
})
