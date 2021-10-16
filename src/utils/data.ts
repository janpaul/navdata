export const splitShizzle = (line: string): string[] => {
  return line.split(/\s/).filter(item => !!item)
}
