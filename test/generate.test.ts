import { describe, expect, it } from 'vitest'
import { generateComments } from '../src/generate'

describe('【生成注释函数测试】', () => {
  it('单行 - 英文', () => {
    const text = generateComments('xxx')
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *                  xxx                 *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('单行 - 中文', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = generateComments('你好，我是一段注释')
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *               你好，我是一段注释              *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('单行 - 表情符号', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = generateComments('🐼🐼🐼')
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *                🐼🐼🐼                *
      *                                      *
      ***************************************/"
    `)
  })

  it.todo('多行 - 英文', () => {
    /**
     * 功能暂未开发
     * 注释结果不对
     */
    const text = generateComments('Halo, I\'m xxx\nI am a developer')
    expect(text).toMatchInlineSnapshot(`
      "/***************************************
      *                                      *
      *           Halo, I'm xxx           *
      *                                      *
      ***************************************/"
    `)
  })
})
