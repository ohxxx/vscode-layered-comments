import { window } from 'vscode'
import Comments from './comments'
import { getSelectedText, getTextIndent, getUserConfig } from './config'
import { HINT_MSG } from './constants'
import { showErrorMsg } from './helpers'
import type { ILang } from './types'

export const create = () => {
  const editor = window.activeTextEditor
  const { text, selection } = getSelectedText(editor!)

  if (!text) {
    showErrorMsg(HINT_MSG.EMPTY)
    return
  }

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
    showErrorMsg(HINT_MSG.TOO_LONG)
    return
  }

  editor?.edit((builder) => {
    builder.replace(selection, commentsText)
  })
}
