import { Selection, workspace } from 'vscode'
import type { TextEditor } from 'vscode'
import type { IConfigStyle } from './types'

/**
 * 获取当前选中的文本
 */
export const getSelectedText = (editor: TextEditor) => {
  const { selection: { start, end }, document } = editor
  const last = document.lineAt(end.line).range.end.character
  const newSelection = new Selection(start.line, 0, end.line, last)

  return ({
    selection: newSelection,
    text: document.getText(newSelection),
  })
}

/**
 * 获取当前文本缩进
 */
export const getTextIndent = (editor: TextEditor) => {
  const { selection: { active }, document } = editor
  const line = document.lineAt(active.line)
  return line.text.split(/\S+/)[0]
}

/**
 * 获取当前用户配置
 */
export const getUserConfig = () => {
  const config = workspace.getConfiguration('layeredComments')
  const style = config.get<IConfigStyle>('style')
  return { style }
}
