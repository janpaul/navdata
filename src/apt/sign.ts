import { Location } from '../types'
import { toDegrees, nameToString, toHeading, toLocation } from '../utils'

type SignSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'large-distance-remaining'
  | 'small-distance-remaining'
export type Sign = {
  location: Location
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
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    orientation: toHeading(orientation),
    size: signSizeMapping[size],
    name: nameToString(name),
  }
}
