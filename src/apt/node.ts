import { Location } from '../types'
import { toDegrees } from '../utils'

export type BezierNode = Location & {}

const bezierNodes = ['112', '114', '116']

export const parseNode =
  (code: string) =>
  (data: string[]): Location | BezierNode => {
    const [lat, lon, latctrl, lonctrl] = data
    const common = {
      lat: toDegrees(lat),
      lon: toDegrees(lon),
    }
    return {
      ...common,
      ...(bezierNodes.includes(code)
        ? { latctrl: toDegrees(latctrl), lonctrl: toDegrees(lonctrl) }
        : {}),
    }
  }
