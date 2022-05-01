import { Selection, commands, window } from 'vscode'
import type { ExtensionContext, TextEditor } from 'vscode'

/**
 *
 */
// const getTabSize = () => {
//   return ''
// }

/**
 * 获取当前选中的文本
 */
const getSelectedText = (editor: TextEditor) => {
  const { selection: { start, end }, document } = editor
  const startLine = start.line
  const endLine = end.line
  const last = document.lineAt(endLine).range.end.character
  const newSelection = new Selection(startLine, 0, endLine, last)

  return editor.document.getText(newSelection)
}

/**
 * 获取语言
 */
const getLanguage = (editor: TextEditor) => {
  return editor?.document?.languageId
}

/**
 * 生成注释
 */
const generateComments = (text: string) => {
  const textArr = text
    .split(/\n/)
    .filter(v => v.match(/\S/))
    .map(s => s.replace(/\s*$/, ''))
  // TODO:
  return textArr
}

export function activate(context: ExtensionContext) {
  /**
   * 实现步骤：
   *    1、获取 当前选中的文本
   *    2、获取 当前 语言标识
   *    3、计算 注释长度
   *        a、当前语言支持的注释格式
   *        b、求最合适的长度
   */
  const startWorking = () => {
    const editor = window.activeTextEditor

    const selectedText = getSelectedText(editor!)
    const commentsText = generateComments(selectedText)

    const currentLanguage = getLanguage(editor!)

    console.warn('xxx#selectedText\n', selectedText)
    console.warn('------------------------------------------------\n')
    console.warn('xxx#commentsText\n', commentsText)
    console.warn('xxx#currentLanguage', currentLanguage)
  }

  context.subscriptions.push(commands.registerCommand('layered-comments.xxx', startWorking))
}

export function deactivate() { }
