import {
  splitShizzle,
  toDegrees,
  toLength,
  toHeading,
  nameToString,
} from '../utils'

describe('utils', () => {
  test('splitShizzle', () => {
    expect(splitShizzle('a b c d')).toEqual(['a', 'b', 'c', 'd'])
  })
  test('toDegrees', () => {
    expect(toDegrees('3.14159')).toBeCloseTo(3.14159)
  })
  test('toLength', () => {
    expect(toLength('3.14159')).toBeCloseTo(3.14159)
  })
  test('toHeading', () => {
    expect(toHeading('3.14159')).toBeCloseTo(3.14159)
  })
  describe('nametoString', () => {
    test('concatenates the items', () =>
      expect(nameToString(['jan', 'paul', 'rules'])).toBe('jan paul rules'))
    test('returns undefined when the array is empty', () =>
      expect(nameToString([])).toBeUndefined())
  })
})
