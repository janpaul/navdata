import { NavCommon, parseCommon } from './common'
import { nameToString, toDegrees } from '../utils'
import { NavType } from './index'

export type MarkerType =
  | 'ils-outer-marker'
  | 'ils-middle-marker'
  | 'ils-inner-marker'
export type MarkerName = 'OM' | 'MM' | 'IM'
export type Marker = NavCommon & {
  bearing: number
  icao: string
  runway: string
  name: MarkerName
}

const markerTypeMapping: Record<string, MarkerType> = {
  '7': 'ils-outer-marker',
  '8': 'ils-middle-marker',
  '9': 'ils-inner-marker',
}

export const parseMarker =
  (code: '7' | '8' | '9') =>
  (data: string[]): Marker => {
    const [bearing, , icao, , runway, ...name] = data.slice(5)
    const marker = {
      ...parseCommon(markerTypeMapping[code] as NavType)(data),
      bearing: toDegrees(bearing),
      icao,
      runway,
      name: nameToString(name) as MarkerName,
    }
    delete marker.frequency
    delete marker.range
    return marker
  }
