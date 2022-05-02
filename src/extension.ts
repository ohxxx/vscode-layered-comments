import { commands, window } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { generateComments } from './generate'
import { getSelectedText } from './config'

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
