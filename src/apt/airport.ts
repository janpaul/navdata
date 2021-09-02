import { MetaData } from './meta'
import { Runway, WaterRunway } from './runway'
import { Helipad } from './helipad'
import { Taxiway } from './taxiway'
import { Boundary } from './boundary'
import { Viewpoint } from './viewpoint'
import { StartupLocation } from './startup-location'
import { nameToString } from '../utils'

export type Airport = {
  name: string
  icao: string
  elevation: number
  meta: MetaData
  runways?: Runway[]
  waterRunways?: WaterRunway[]
  helipads?: Helipad[]
  taxiways?: Taxiway[]
  boundaries?: Boundary[]
  viewpoint?: Viewpoint
  startupLocations?: StartupLocation[]
}

export const parseAirport = (data: string[]): Airport => {
  const [elevation, , , icao, ...name] = data
  return {
    elevation: Number(elevation),
    name: nameToString(name)!,
    icao,
    meta: {},
  }
}
