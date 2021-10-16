import { Location } from '../types'
import { toDegrees, nameToString, toLocation } from '../utils'

type TaxiNodeUsage = 'dest' | 'init' | 'both' | 'junc'
type TaxiDirection = 'twoway' | 'oneway'
type TaxiEdgeType = 'taxiway' | 'runway' | 'taxiway_F'
type ActiveZoneClassification = 'arrival' | 'departure' | 'ils'
type TaxiNode = {
  location: Location
  usage: TaxiNodeUsage
  identifier: number
  name: string
}
type TaxiEdge = {
  startNode: number
  endNode: number
  direction: TaxiDirection
  edgeType: TaxiEdgeType
  name: string
}
type EdgeActiveZone = {
  classification: ActiveZoneClassification
  runways: string[]
}
export type TaxiRouting = {
  nodes: TaxiNode[]
  edges: TaxiEdge[]
  edgeActiveZones: EdgeActiveZone[]
}

export const parseTaxiNode = (data: string[]): TaxiNode => {
  const [lat, lon, usage, identifier, ...name] = data
  return {
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    usage: usage as TaxiNodeUsage,
    identifier: Number(identifier),
    name: nameToString(name),
  }
}
export const parseTaxiEdge = (data: string[]): TaxiEdge => {
  const [startNode, endNode, direction, edgeType, ...name] = data
  return {
    startNode: Number(startNode),
    endNode: Number(endNode),
    direction: direction as TaxiDirection,
    edgeType: edgeType as TaxiEdgeType,
    name: nameToString(name),
  }
}

export const parseTaxiEdgeActiveZone = (data: string[]): EdgeActiveZone => {
  const [classification, ...runways] = data
  return {
    classification: classification as ActiveZoneClassification,
    runways: nameToString(runways).split(','),
  }
}
