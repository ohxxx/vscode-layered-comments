import { describe, expect, it } from 'vitest'
import { createRepeatChars, isInteger } from '../src/helpers'

describe('【isInteger】- 是否是整数函数', () => {
  it('是整数', () => {
    const truthy = [10, 1.0, -1.00, -10, 22]

    for (const item of truthy) { expect(isInteger(item)).toBeTruthy() }
  })

  it('不是整数', () => {
    const falsy = [1.01, 3.1, 12.22, -10.1]

    for (const item of falsy) { expect(isInteger(item)).toBeFalsy() }
  })
})

describe('【createRepeatChars】- 创建重复字符', () => {
  it('创建', () => {
    expect(createRepeatChars('*', 0)).toBe('')
    expect(createRepeatChars('*', 6)).toBe('******')
    expect(createRepeatChars(' ', 10)).toBe('          ')
    expect(createRepeatChars('🐼', 6)).toBe('🐼🐼🐼🐼🐼🐼')
  })
})
