import { Location } from '../types'
import { Surface, toSurface } from './surface'
import {
  toDegrees,
  toLength,
  toLocation,
  calculateDistance,
  calculateBearing,
} from '../utils'
import { Shoulder, toShoulder } from './shoulder'

type SingleDirectionRunway = {
  number: string
  location: Location
  treshold: number
  overrun: number
}
export type Runway = {
  width: number
  surface: Surface
  shoulder: Shoulder
  length?: number
  bearing?: number
  midpoint?: Location
} & SingleDirectionRunway
export type WaterRunway = {
  width: number
  name: string
  location: Location
}

const runwayDataToLocation = (data: string[]): Location => {
  const [, lat, lon] = data
  return toLocation(toDegrees(lat))(toDegrees(lon))
}

const toRunwayData = (data: string[]): SingleDirectionRunway => {
  const [number, , , treshold, overrun] = data
  return {
    number,
    location: runwayDataToLocation(data),
    treshold: toLength(treshold),
    overrun: toLength(overrun),
  }
}

export const parseRunway = (data: string[]): [Runway, Runway] => {
  const [width, surface, shoulder] = data
  const adata = [...data].slice(7, 12)
  const bdata = [...data].slice(16, 21)
  const loca = runwayDataToLocation(adata)
  const locb = runwayDataToLocation(bdata)
  const common = {
    width: toLength(width),
    surface: toSurface(surface),
    shoulder: toShoulder(shoulder),
  }
  const length = calculateDistance(loca)(locb)
  const bearing = calculateBearing(loca)(locb)
  const a: Runway = {
    ...common,
    ...toRunwayData(adata),
    length,
    bearing,
  }
  const b: Runway = {
    ...common,
    ...toRunwayData(bdata),
    length,
    bearing: (bearing + 180.0) % 360.0,
  }
  return [a, b]
}

export const parseWaterRunway = (
  data: string[]
): [WaterRunway, WaterRunway] => {
  const [width, , namea, lata, lona, nameb, latb, lonb] = data
  const common = { width: toLength(width) }
  const a: WaterRunway = {
    ...common,
    name: namea,
    location: toLocation(toDegrees(lata))(toDegrees(lona)),
  }
  const b: WaterRunway = {
    ...common,
    name: nameb,
    location: toLocation(toDegrees(latb))(toDegrees(lonb)),
  }
  return [a, b]
}
