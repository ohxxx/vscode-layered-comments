/**
 * 是否是整数
 */
export const isInteger = (num: number) => num % 1 === 0

/**
 * 创建重复字符
 */
export const createRepeatChars = (chars: string, num: number) => chars.repeat(num)

/**
 * 用于类型收窄
 */
export const includes = <A extends E, E>(arr: ReadonlyArray<A>, el: E): el is A => {
  return arr.includes(el as A)
}
