import { Surface, toSurface } from './surface'
import { Shoulder, toShoulder } from './shoulder'
import { toDegrees, toLength, toHeading, toLocation } from '../utils'
import { Location } from '../types'

export type Helipad = {
  designator: string
  location: Location
  orientation: number
  length: number
  width: number
  surface: Surface
  shoulder: Shoulder
}
export const parseHelipad = (data: string[]): Helipad => {
  const [
    designator,
    lat,
    lon,
    orientation,
    length,
    width,
    surface,
    ,
    shoulder,
  ] = data
  return {
    designator,
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    orientation: toHeading(orientation),
    length: toLength(length),
    width: toLength(width),
    surface: toSurface(surface),
    shoulder: toShoulder(shoulder),
  }
}
