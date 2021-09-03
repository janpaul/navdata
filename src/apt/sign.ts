import { toDegrees, nameToString, toHeading } from '../utils'
import { Shoulder } from './shoulder'

type SignSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'large-distance-remaining'
  | 'small-distance-remaining'
export type Sign = {
  lat: number
  lon: number
  orientation: number
  size: SignSize
  name?: string
}
const signSizeMapping: Record<string, SignSize> = {
  '1': 'small',
  '2': 'medium',
  '3': 'large',
  '4': 'large-distance-remaining',
  '5': 'small-distance-remaining',
}

export const parseSign = (data: string[]): Sign => {
  const [lat, lon, orientation, , size, ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    orientation: toHeading(orientation),
    size: signSizeMapping[size],
    name: nameToString(name),
  }
}
