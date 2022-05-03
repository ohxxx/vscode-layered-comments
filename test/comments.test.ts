import { describe, expect, it } from 'vitest'
import Comments from '../src/comments'

describe('【生成注释函数】- 格式', () => {
  it('单行 - 英文', () => {
    const text = new Comments('xxx', 'typescript').generate()
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *                  xxx                 *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('单行 - 中文', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = new Comments('你好，我是一段注释', 'typescript').generate()
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *               你好，我是一段注释              *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('单行 - 表情符号', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = new Comments('🐼🐼🐼', 'typescript').generate()
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *                🐼🐼🐼                *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('多行 - 英文', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = new Comments('Halo, I\'m xxx\nI am a developer', 'typescript').generate()
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *           Halo, I'm xxx           *
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
      'rust',
    ]
    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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
    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
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

    for (const lang of languageSet)
      expect(new Comments('xxx', lang).generate()).toBe(comments)
  })
})
