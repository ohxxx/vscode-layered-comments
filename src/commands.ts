import { window } from 'vscode'
import Comments from './comments'
import { getSelectedText, getTextIndent } from './config'
import type { ILang } from './types'

export const create = () => {
  const editor = window.activeTextEditor
  const { text, selection } = getSelectedText(editor!)

  const languageId = editor?.document.languageId ?? 'typescript'
  const indent = getTextIndent(editor!)
  const commentsText = new Comments(text, languageId as ILang, indent).generate()

  editor?.edit((builder) => {
    builder.replace(selection, commentsText)
  })
}
