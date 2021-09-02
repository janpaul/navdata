import { BezierNode, Node } from './node'

export type Boundary = {
  description?: string
  nodes: (Node | BezierNode)[]
}

export const parseBoundary = (data: string[]): Boundary => {
  const [...description] = data
  return {
    description: description.length > 0 && description.join(' '),
    nodes: [],
  }
}
