import { CLOSED_SYM, LANGUAGE_SYM } from './constants'
import { includes } from './helpers'
import type { IEndSym, ILang, ILangSymbol, IStartSym } from './types'

class LanguageSym {
  #lang: ILang = 'typescript'

  constructor(lang?: ILang) {
    this.#lang = lang ?? 'typescript'
  }

  #getLangIndex() {
    const index = Object
      .values(LANGUAGE_SYM)
      .findIndex(v => includes(v, this.#lang))

    return index > -1 ? index : 0
  }

  #getLangSymbol() {
    return Object.keys(LANGUAGE_SYM)[this.#getLangIndex()] as IStartSym
  }

  get commentsSymbol(): ILangSymbol {
    const result = this.#getLangSymbol()

    return {
      start: result,
      end: CLOSED_SYM[result] as IEndSym,
    }
  }
}

export default LanguageSym
