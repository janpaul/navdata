import { toDegrees, toHeading, nameToString } from '../utils'

export type StartupLocation = {
  lat: number
  lon: number
  heading: number
  name?: string
}

export const parseStartupLocation = (data: string[]): StartupLocation => {
  const [lat, lon, heading, ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    heading: toHeading(heading),
    name: nameToString(name),
  }
}
