import { Selection, commands, window } from 'vscode'
import type { ExtensionContext, TextEditor } from 'vscode'

const MAX_WIDTH = 40
const START_SYMBOL = '/'
const END_SYMBOL = '/'
const FILL_SYMBOL = '*'

/**
 * 获取当前选中的文本
 */
const getSelectedText = (editor: TextEditor) => {
  const { selection: { start, end }, document } = editor
  const startLine = start.line
  const endLine = end.line
  const last = document.lineAt(endLine).range.end.character
  const newSelection = new Selection(startLine, 0, endLine, last)

  return ({
    selection: newSelection,
    text: document.getText(newSelection),
  })
}

/**
 * 是否是整数
 */
const isInteger = (num: number) => {
  return num % 1 === 0
}

/**
 * 创建重复字符
 */
const createRepeatChars = (chars: string, num: number): string => {
  return chars.repeat(num)
}

/**
 * 生成注释
 */
const generateComments = (text: string) => {
  if (!text)
    return ''

  const textArr = text
    .split(/\n/)
    .filter(v => v.match(/\S/))
    .map(s => s.replace(/(^\s*)|(\s*$)/, ''))

  const maxLineWidth = textArr.reduce((max, str) => Math.max(max, str.length), 0)
  const fillWidth = (MAX_WIDTH - maxLineWidth - 2) / 2

  const firstLine = `${START_SYMBOL}${createRepeatChars(FILL_SYMBOL, MAX_WIDTH - 1)}`
  const middleLine = `${FILL_SYMBOL}${createRepeatChars(' ', MAX_WIDTH - 2)}${FILL_SYMBOL}`
  const endLine = `${createRepeatChars(FILL_SYMBOL, MAX_WIDTH - 1)}${END_SYMBOL}`
  const leftFilled = isInteger(fillWidth) ? Math.floor(fillWidth) : Math.ceil(fillWidth)
  const rightFilled = fillWidth
  const middleText = `${FILL_SYMBOL}${createRepeatChars(' ', leftFilled)}${textArr[0]}${createRepeatChars(' ', rightFilled)}${FILL_SYMBOL}`

  return `${firstLine}\n${middleLine}\n${middleText}\n${middleLine}\n${endLine}`
}

export function activate(context: ExtensionContext) {
  /**
   * 第一版：完成最小维度的闭环
   *
   * TODO：
   *    1、支持多行注释
   *    2、支持多语言
   *    3、支持自定义配置
   *        a、自定义符号
   *        b、自定义宽度
   *    4、锚点定位???
   *
   * ISSUES：
   *    1、中文注释长度无法确定
   *    2、整体注释缩进问题
   *
   */
  const startWorking = () => {
    const editor = window.activeTextEditor
    const { text, selection } = getSelectedText(editor!)
    const commentsText = generateComments(text)

    editor?.edit((builder) => {
      builder.replace(selection, commentsText)
    })
  }

  context.subscriptions.push(commands.registerCommand('layered-comments.create', startWorking))
}

export function deactivate() { }
