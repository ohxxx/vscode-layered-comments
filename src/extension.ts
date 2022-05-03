import { commands, window } from 'vscode'
import type { ExtensionContext } from 'vscode'
import Comments from './comments'
import { getSelectedText } from './config'
import type { ILang } from './types'

export function activate(context: ExtensionContext) {
  /**
   * 第一版：完成最小维度的闭环
   *
   * TODO：
   *    1、支持多行注释
   *    2、支持多语言 [done]
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
  const create = () => {
    const editor = window.activeTextEditor
    const { text, selection } = getSelectedText(editor!)

    const languageId = editor?.document.languageId ?? 'typescript'
    const commentsText = new Comments(text, languageId as ILang).generate()

    editor?.edit((builder) => {
      builder.replace(selection, commentsText)
    })
  }

  context.subscriptions.push(commands.registerCommand('layered-comments.create', create))
}

export function deactivate() { }
