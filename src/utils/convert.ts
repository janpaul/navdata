import { Location } from '../types'

export const toDegrees = (degrees: string): number => Number(degrees)
export const toLength = (length: string): number => Number(length)
export const toHeading = (heading: string): number => Number(heading)
export const nameToString = (data: string[]): string | undefined =>
  data.length > 0 ? data.join(' ') : undefined
export const toLocation =
  (lat: number) =>
  (lon: number): Location => ({ lat, lon })
export const fitInCircle = (deg: number) => (deg + 360.0) % 360.0
