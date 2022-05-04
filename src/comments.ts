import { DEFAULT_FILL_SYM, MAX_WIDTH } from './constants'
import { createRepeatChars, isInteger } from './helpers'
import LanguageSym from './language-sym'
import type { ILang, ILangSymbol } from './types'

class Comments {
  #text: string
  #langSymbol: ILangSymbol
  #indent: string

  constructor(text: string, lang: ILang, indent?: string) {
    this.#text = text
    this.#langSymbol = new LanguageSym(lang).commentsSymbol
    this.#indent = indent ?? ''
  }

  /**
   * 头部插入
   */
  private headInsert(sym: string) {
    return `${sym}${createRepeatChars(DEFAULT_FILL_SYM, MAX_WIDTH - sym.length)}`
  }

  /**
   * 尾部插入
   */
  private tailInsert(sym: string) {
    return `${createRepeatChars(DEFAULT_FILL_SYM, MAX_WIDTH - sym.length)}${sym}`
  }

  /**
   * 首尾插入
   */
  private endToEndInsert(startSym: string, endSym: string, fill = DEFAULT_FILL_SYM) {
    return `${startSym}${createRepeatChars(fill, MAX_WIDTH - startSym.length - endSym.length)}${endSym}`
  }

  /**
   * 填充字符
   * 用于：注释块中间部分首尾填充字符
   */
  private fillSym(startSym: string, endSym: string) {
    const headSym = ['/*', '<!--'].includes(startSym) ? DEFAULT_FILL_SYM : startSym
    const tailSym = headSym === DEFAULT_FILL_SYM ? DEFAULT_FILL_SYM : endSym

    return { headSym, tailSym }
  }

  /**
   * 创建头部注释
   */
  private createHeadComments(startSym: string, endSym: string) {
    if (['/*', '<!--'].includes(startSym))
      return this.headInsert(startSym)

    else
      return this.endToEndInsert(startSym, endSym)
  }

  /**
   * 填充中间空白区域
   */
  private createMiddleSymComments(startSym: string, endSym: string) {
    const { headSym, tailSym } = this.fillSym(startSym, endSym)
    return this.endToEndInsert(headSym, tailSym, ' ')
  }

  /**
   * 填充中间文本注释
   */
  private createMiddleTextComments(arr: string[]) {
    const { start, end } = this.#langSymbol
    const { headSym, tailSym } = this.fillSym(start, end)

    const text = arr[0]
    const fillWidth = (MAX_WIDTH - text.length - headSym.length - tailSym.length) / 2
    const leftWidth = isInteger(fillWidth) ? Math.floor(fillWidth) : Math.ceil(fillWidth)
    const rightWidth = fillWidth

    return [
      [
        headSym,
        createRepeatChars(' ', leftWidth),
        text,
        createRepeatChars(' ', rightWidth),
        tailSym,
      ].join(''),
    ]
  }

  /**
   * 创建尾部注释
   */
  private createTailComments(startSym: string, endSym: string) {
    if (['*/', '-->'].includes(endSym))
      return this.tailInsert(endSym)

    else
      return this.endToEndInsert(startSym, endSym)
  }

  /**
   * 文本格式化
   */
  private textFormat(text: string) {
    // 目前只支持单行注释
    return text
      .split(/\n/)
      .filter(v => v.match(/\S/))
      .map(s => s.replace(/(^\s*)|(\s*$)/, ''))
  }

  /**
   * 创建注释
   */
  private createComments(): string {
    const { start, end } = this.#langSymbol
    const textArr = this.textFormat(this.#text)

    const headComments = this.createHeadComments(start, end)
    const middleSymComments = this.createMiddleSymComments(start, end)
    const middleTextComments = this.createMiddleTextComments(textArr)
    const tailComments = this.createTailComments(start, end)

    const indent = createRepeatChars(' ', this.#indent.length)

    return [
      `${indent}${headComments}`,
      `${indent}${middleSymComments}`,
      ...middleTextComments.map(v => `${indent}${v}`),
      `${indent}${middleSymComments}`,
      `${indent}${tailComments}`,
    ].join('\n')
  }

  /**
   * 生成最终注释
   */
  public generate(): string {
    if (!this.#text)
      return ''

    return this.createComments()
  }
}

export default Comments
