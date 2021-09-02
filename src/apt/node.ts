import { toDegrees } from '../utils'

export type Node = {
  lat: number
  lon: number
}
export type BezierNode = Node & {}

const bezierNodes = ['112', '114', '116']

export const parseNode =
  (code: string) =>
  (data: string[]): Node | BezierNode => {
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
