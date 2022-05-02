import { Selection } from 'vscode'
import type { TextEditor } from 'vscode'

/**
 * 获取当前选中的文本
 */
export const getSelectedText = (editor: TextEditor) => {
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
