import { toDegrees, nameToString } from '../utils'

export type Windsock = {
  lat: number
  lon: number
  name?: string
}

export const parseWindsock = (data: string[]): Windsock => {
  const [lat, lon, , ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    name: nameToString(name),
  }
}
