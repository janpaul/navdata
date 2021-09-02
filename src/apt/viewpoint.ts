import { nameToString, toDegrees, toLength } from '../utils'

export type Viewpoint = {
  lat: number
  lon: number
  height: number
  name?: string
}

export const parseViewPoint = (data: string[]): Viewpoint => {
  const [lat, lon, height, , ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    height: toLength(height),
    name: nameToString(name),
  }
}
