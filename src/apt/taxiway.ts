import { Surface, toSurface } from './surface'
import { BezierNode, Node } from './node'
import { nameToString } from '../utils'

export type Taxiway = {
  surface: Surface
  description?: string
  nodes: (Node | BezierNode)[]
}

export const parseTaxiway = (data: string[]): Taxiway => {
  const [surface, , , ...description] = data
  return {
    surface: toSurface(surface),
    description: nameToString(description),
    nodes: [],
  }
}
