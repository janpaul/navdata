import { Location } from '../types'
import { toDegrees, nameToString, toLocation } from '../utils'

export type Windsock = {
  location: Location
  name?: string
}

export const parseWindsock = (data: string[]): Windsock => {
  const [lat, lon, , ...name] = data
  return {
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    name: nameToString(name),
  }
}
