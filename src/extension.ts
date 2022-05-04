import { commands } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { create } from './commands'

export function activate(context: ExtensionContext) {
  /**
   * 创建分层注释
   */
  context.subscriptions.push(commands.registerCommand('layered-comments.create', create))
}

export function deactivate() { }
