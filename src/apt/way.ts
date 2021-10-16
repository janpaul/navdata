import { Location } from '../types'
import { Surface, toSurface } from './surface'
import { BezierNode } from './node'
import { nameToString } from '../utils'

export type WayType = 'taxiway' | 'boundary' | 'linear-feature'
export type Way = {
  wayType: WayType
  surface?: Surface
  description?: string
  nodes: (Location | BezierNode)[]
}

export const parseTaxiWay = (data: string[]): Way => {
  const [surface, , , ...description] = data
  return {
    wayType: 'taxiway',
    surface: toSurface(surface),
    description: nameToString(description),
    nodes: [],
  }
}

export const parseBoundaryWay = (data: string[]): Way => {
  const [...description] = data
  return {
    wayType: 'boundary',
    description: description.length > 0 && description.join(' '),
    nodes: [],
  }
}

export const parseLinearFeature = (data: string[]): Way => {
  const [...description] = data
  return {
    wayType: 'linear-feature',
    description: description.length > 0 && description.join(' '),
    nodes: [],
  }
}
