import { DEFAULT_FILL_SYM, DEFAULT_WIDTH } from './constants'
import { createRepeatChars, isInteger } from './helpers'
import LanguageSym from './language-sym'
import type { IConfigStyle, ILang, ILangSymbol } from './types'

class Comments {
  #text: string
  #langSymbol: ILangSymbol
  #indent: string
  #style: IConfigStyle

  constructor(text: string, lang: ILang, indent?: string, style?: IConfigStyle) {
    this.#text = text
    this.#langSymbol = new LanguageSym(lang).commentsSymbol
    this.#indent = indent ?? ''
    this.#style = {
      width: DEFAULT_WIDTH,
      fillSym: DEFAULT_FILL_SYM,
      ...style,
    }
  }

  /**
   * 剩余填充宽度
   */
  private otherWidth(othetSym: string, ...args: string[]) {
    const { width } = this.#style
    const symSize = args?.reduce((pre, cur) => pre + cur.length, 0)
    return ((width! - symSize) / othetSym!.length)
  }

  /**
   * 头部插入
   */
  private headInsert(sym: string) {
    const { fillSym } = this.#style
    return `${sym}${createRepeatChars(fillSym!, this.otherWidth(fillSym!, sym))}`
  }

  /**
   * 尾部插入
   */
  private tailInsert(sym: string) {
    const { fillSym } = this.#style
    return `${createRepeatChars(fillSym!, this.otherWidth(fillSym!, sym))}${sym}`
  }

  /**
   * 首尾插入
   */
  private endToEndInsert(startSym: string, endSym: string, fill = this.#style.fillSym!) {
    return `${startSym}${createRepeatChars(fill, this.otherWidth(fill, startSym, endSym))}${endSym}`
  }

  /**
   * 填充字符
   * 用于：注释块中间部分首尾填充字符
   */
  private fillSym(startSym: string, endSym: string) {
    const { fillSym } = this.#style
    const headSym = ['/*', '<!--'].includes(startSym) ? fillSym! : startSym
    const tailSym = headSym === fillSym! ? fillSym! : endSym

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
  private createMiddleTextComments(textArr: string[]) {
    const { start, end } = this.#langSymbol
    const { width } = this.#style
    const { headSym, tailSym } = this.fillSym(start, end)
    const fillWidth = width! - headSym.length - tailSym.length

    if (textArr.length === 1)
      textArr[0] = textArr[0].replace(/^\s*/, '')

    const maxTextWidth = Math.max(...textArr.map(v => v.length))
    if (maxTextWidth > fillWidth)
      return []

    const result = textArr?.map((v) => {
      const bisectWidth = (fillWidth - maxTextWidth) / 2
      const leftWidth = isInteger(bisectWidth) ? Math.floor(bisectWidth) : Math.ceil(bisectWidth)
      const rightWidth = fillWidth - leftWidth - v.length

      return [
        headSym,
        createRepeatChars(' ', leftWidth),
        v,
        createRepeatChars(' ', rightWidth),
        tailSym,
      ].join('')
    })

    return result
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
    return text
      .split(/\n/)
      .filter(v => v.match(/\S/))
      .map(s => s.replace(/\s*$/, ''))
  }

  /**
   * 创建注释
   */
  private createComments() {
    const { start, end } = this.#langSymbol
    const textArr = this.textFormat(this.#text)

    const headComments = this.createHeadComments(start, end)
    const middleSymComments = this.createMiddleSymComments(start, end)
    const middleTextComments = this.createMiddleTextComments(textArr)
    const tailComments = this.createTailComments(start, end)

    const indent = createRepeatChars(' ', this.#indent.length)

    if (!middleTextComments.length)
      return null

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
  public generate() {
    if (!this.#text)
      return null

    return this.createComments()
  }
}

export default Comments
