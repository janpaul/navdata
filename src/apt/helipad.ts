import { Surface, toSurface } from './surface'
import { Shoulder, toShoulder } from './shoulder'
import { toDegrees, toLength, toHeading } from '../utils'

export type Helipad = {
  designator: string
  lat: number
  lon: number
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
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    orientation: toHeading(orientation),
    length: toLength(length),
    width: toLength(width),
    surface: toSurface(surface),
    shoulder: toShoulder(shoulder),
  }
}
