import { Airport } from './airport'
import { parseAirport } from './airport'
import { parseMetadata } from './meta'
import { splitShizzle } from '../utils'
import * as codes from './codes'
import { parseRunway, parseWaterRunway } from './runway'
import { parseHelipad } from './helipad'
import { parseTaxiway, Taxiway } from './taxiway'
import { CallbackObjectType } from '../types'
import { Boundary, parseBoundary } from './boundary'
import { parseNode } from './node'
import { Viewpoint, parseViewPoint } from './viewpoint'
import { parseStartupLocation } from './startup-location'

type Callback = (CallbackObjectType) => (Airport) => void
export const createParser = (reader: any) => (callback: Callback) => {
  let airport: Airport | undefined
  let taxiway: Taxiway | undefined
  let boundary: Boundary | undefined
  const parseLine = (line: string) => {
    const [code, ...data] = splitShizzle(line)
    switch (code) {
      case codes.AIRPORT: {
        if (!!airport) {
          callback('airport')(airport)
        }
        airport = parseAirport(data)
        break
      }
      case codes.META_DATA: {
        airport.meta = { ...airport.meta, ...parseMetadata(data) }
        break
      }
      case codes.LAND_RUNWAY: {
        const [a, b] = parseRunway(data)
        const _runways = airport.runways || []
        airport.runways = [..._runways, a, b]
        break
      }
      case codes.WATER_RUNWAY: {
        const [a, b] = parseWaterRunway(data)
        const _waterRunways = airport.waterRunways || []
        airport.waterRunways = [..._waterRunways, a, b]
        break
      }
      case codes.HELIPAD: {
        const _helipads = airport.helipads || []
        airport.helipads = [..._helipads, parseHelipad(data)]
        break
      }
      case codes.TAXIWAY: {
        if (!!taxiway) {
          const _taxiways = airport.taxiways || []
          airport.taxiways = [..._taxiways, taxiway]
          taxiway = undefined
        } else {
          taxiway = parseTaxiway(data)
        }
        break
      }
      case codes.BOUNDARY: {
        if (!!boundary) {
          const _boundaries = airport.taxiways || []
          airport.boundaries = [..._boundaries, boundary]
          boundary = undefined
        } else {
          boundary = parseBoundary(data)
        }
        break
      }
      case codes.NODE_PLAIN:
      case codes.NODE_CLOSE_LOOP:
      case codes.NODE_END:
      case codes.NODE_BEZIER:
      case codes.NODE_BEZIER_CLOSE_LOOP:
      case codes.NODE_BEZIER_END: {
        const node = parseNode(code)(data)
        if (!!taxiway) {
          taxiway.nodes = [...taxiway.nodes, node]
        }
        if (!!boundary) {
          boundary.nodes = [...boundary.nodes, node]
        }
        break
      }
      case codes.VIEWPOINT: {
        airport.viewpoint = parseViewPoint(data)
        break
      }
      case codes.STARTUP_LOCATION: {
        const _startupLocations = airport.startupLocations || []
        airport.startupLocations = [
          ..._startupLocations,
          parseStartupLocation(data),
        ]
        break
      }
    }
  }
  reader.on('line', parseLine)
  reader.on('close', () => console.log('close'))
}
