import { window } from 'vscode'
import Comments from './comments'
import { getSelectedText, getTextIndent, getUserConfig } from './config'
import { showErrorMsg } from './helpers'
import type { ILang } from './types'

export const create = () => {
  const editor = window.activeTextEditor
  const { text, selection } = getSelectedText(editor!)

  const languageId = editor?.document.languageId ?? 'typescript'
  const indent = getTextIndent(editor!)
  const { style } = getUserConfig()
  const commentsText = new Comments(
    text,
    languageId as ILang,
    indent,
    style,
  ).generate()

  if (!commentsText) {
    showErrorMsg('注释文本的长度过长或长度为空，请检查后重试')
    return
  }

  editor?.edit((builder) => {
    builder.replace(selection, commentsText)
  })
}
