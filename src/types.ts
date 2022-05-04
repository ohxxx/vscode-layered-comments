import type { CLOSED_SYM, LANGUAGE_SYM } from './constants'

export interface ILangSymbol {
  start: string
  end: string
}

export type IStartSym = keyof typeof LANGUAGE_SYM

export type IEndSym = typeof CLOSED_SYM[keyof typeof CLOSED_SYM]

export type ILangTuple = typeof LANGUAGE_SYM[keyof typeof LANGUAGE_SYM]

export type ILang = ILangTuple[number]

export interface IConfigStyle {
  width?: number
  fillSym?: string
}
