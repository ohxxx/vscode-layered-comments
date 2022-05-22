import { window } from 'vscode'

export const isInteger = (num: number) => num % 1 === 0

export const createRepeatChars = (chars: string, num: number) => chars.repeat(num)

export const includes = <A extends E, E>(arr: ReadonlyArray<A>, el: E): el is A => {
  return arr.includes(el as A)
}

export const showErrorMsg = (msg: string) =>
  window.showErrorMessage(`[Layered Comments]: ${msg}`)
