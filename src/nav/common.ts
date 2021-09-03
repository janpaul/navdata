import { NavType } from './index'
import { toDegrees } from '../utils'

export type NavCommon = {
  navType: NavType
  lat: number
  lon: number
  elevation: number
  frequency: number
  range: number
}

export const parseCommon =
  (navType: NavType) =>
  (data: string[]): NavCommon => {
    const [lat, lon, elevation, frequency, range] = data
    return {
      navType,
      lat: toDegrees(lat),
      lon: toDegrees(lon),
      elevation: Number(elevation),
      frequency: Number(frequency),
      range: Number(range),
    }
  }
