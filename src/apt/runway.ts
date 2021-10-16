import { Surface, toSurface } from './surface'
import { toDegrees, toLength, toLocation, haversineDistance } from '../utils'
import { Shoulder, toShoulder } from './shoulder'

type SingleDirectionRunway = {
  number: string
  lat: number
  lon: number
  treshold: number
  overrun: number
}
export type Runway = {
  width: number
  surface: Surface
  shoulder: Shoulder
  length?: number
} & SingleDirectionRunway
export type WaterRunway = {
  width: number
  name: string
  lat: number
  lon: number
}

const toRunwayData = (data: string[]): SingleDirectionRunway => {
  const [number, lat, lon, treshold, overrun] = data
  return {
    number,
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    treshold: toLength(treshold),
    overrun: toLength(overrun),
  }
}

const calculateRunwayLength = (adata: string[], bdata: string[]): number => {
  const [, slata, slona] = adata
  const [, slatb, slonb] = bdata
  const lata = Number(slata)
  const lona = Number(slona)
  const latb = Number(slatb)
  const lonb = Number(slonb)
  return haversineDistance(toLocation(lata, lona), toLocation(latb, lonb))
}

export const parseRunway = (data: string[]): [Runway, Runway] => {
  const [width, surface, shoulder] = data
  const adata = [...data].slice(7, 12)
  const bdata = [...data].slice(16, 21)
  const common = {
    width: toLength(width),
    surface: toSurface(surface),
    shoulder: toShoulder(shoulder),
  }
  const length = calculateRunwayLength(adata, bdata)
  const a: Runway = { ...common, ...toRunwayData(adata), length }
  const b: Runway = { ...common, ...toRunwayData(bdata), length }
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
    lat: toDegrees(lata),
    lon: toDegrees(lona),
  }
  const b: WaterRunway = {
    ...common,
    name: nameb,
    lat: toDegrees(latb),
    lon: toDegrees(lonb),
  }
  return [a, b]
}
