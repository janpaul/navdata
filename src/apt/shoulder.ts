export type Shoulder = 'none' | 'asphalt' | 'concrete'

const shoulderMapping: Record<string, Shoulder> = {
  '0': 'none',
  '1': 'asphalt',
  '2': 'concrete',
}
export const toShoulder = (code: string): Shoulder => shoulderMapping[code]
