import { MetaData } from './meta'
import { Runway, WaterRunway } from './runway'
import { Helipad } from './helipad'
import { Way, WayType } from './way'
import { Viewpoint } from './viewpoint'
import { StartupLocation } from './startup-location'
import { Windsock } from './windsock'
import { Sign } from './sign'
import { LightingObject } from './lights'
import { TrafficFlow } from './traffic'
import { TaxiRouting } from './taxi-routing'
import { nameToString } from '../utils'

export type Airport = {
  name: string
  icao: string
  elevation: number
  meta: MetaData
  runways?: Runway[]
  waterRunways?: WaterRunway[]
  helipads?: Helipad[]
  ways?: Way[]
  viewpoint?: Viewpoint
  startupLocations?: StartupLocation[]
  windsocks?: Windsock[]
  signs?: Sign[]
  lights?: LightingObject[]
  trafficFlow?: TrafficFlow[]
  taxiRouting: TaxiRouting
}

export const parseAirport = (data: string[]): Airport => {
  const [elevation, , , icao, ...name] = data
  return {
    elevation: Number(elevation),
    name: nameToString(name)!,
    icao,
    meta: {},
    taxiRouting: {
      nodes: [],
      edges: [],
      edgeActiveZones: [],
    },
  }
}

const _filterWaytype = (airport: Airport) => (wayType: WayType) =>
  airport.ways.filter(way => way.wayType === wayType)
export const taxiways = (airport: Airport) => _filterWaytype(airport)('taxiway')
export const boundaries = (airport: Airport) =>
  _filterWaytype(airport)('boundary')
