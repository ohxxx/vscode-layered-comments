import { END_SYM, FILL_SYM, MAX_WIDTH, START_SYM } from './constants'
import { createRepeatChars, isInteger } from './helpers'

/**
 * 生成注释
 */
export const generateComments = (text: string) => {
  if (!text)
    return ''

  const textArr = text
    .split(/\n/)
    .filter(v => v.match(/\S/))
    .map(s => s.replace(/(^\s*)|(\s*$)/, ''))

  /**
   * TODO：代码需要优化重构
   */
  const maxLineWidth = textArr.reduce((max, str) => Math.max(max, str.length), 0)
  const fillWidth = (MAX_WIDTH - maxLineWidth - 2) / 2

  const firstLine = `${START_SYM}${createRepeatChars(FILL_SYM, MAX_WIDTH - 1)}`
  const middleLine = `${FILL_SYM}${createRepeatChars(' ', MAX_WIDTH - 2)}${FILL_SYM}`
  const endLine = `${createRepeatChars(FILL_SYM, MAX_WIDTH - 1)}${END_SYM}`
  const leftFilled = isInteger(fillWidth) ? Math.floor(fillWidth) : Math.ceil(fillWidth)
  const rightFilled = fillWidth
  const middleText = `${FILL_SYM}${createRepeatChars(' ', leftFilled)}${textArr[0]}${createRepeatChars(' ', rightFilled)}${FILL_SYM}`

  return `${firstLine}\n${middleLine}\n${middleText}\n${middleLine}\n${endLine}`
}
