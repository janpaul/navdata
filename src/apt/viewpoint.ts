import { Location } from '../types'
import { nameToString, toDegrees, toLength, toLocation } from '../utils'

export type Viewpoint = {
  location: Location
  height: number
  name?: string
}

export const parseViewPoint = (data: string[]): Viewpoint => {
  const [lat, lon, height, , ...name] = data
  return {
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    height: toLength(height),
    name: nameToString(name),
  }
}
