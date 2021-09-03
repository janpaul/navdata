import { Airport } from './airport'
import { parseAirport } from './airport'
import { parseMetadata } from './meta'
import { splitShizzle } from '../utils'
import * as codes from './codes'
import { parseRunway, parseWaterRunway } from './runway'
import { parseHelipad } from './helipad'
import { parseTaxiWay, parseBoundaryWay, parseLinearFeature, Way } from './way'
import { parseNode } from './node'
import { parseViewPoint } from './viewpoint'
import { parseStartupLocation } from './startup-location'
import { parseWindsock } from './windsock'
import { parseSign } from './sign'
import config from '../config'
import { parseLightingObject } from './lights'
import {
  parseCeilingRule,
  parseRunwayInUse,
  parseTrafficFlow,
  parseTrafficTimeRule,
  parseVfrRule,
  parseVisibilityRule,
  parseWindRule,
  TrafficFlow,
} from './traffic'
import { CallbackObjectType } from '../types'
import {
  parseTaxiEdge,
  parseTaxiEdgeActiveZone,
  parseTaxiNode,
} from './taxi-routing'

const { insertWays, trafficFlowEnabled, taxiRoutingEnabled } = config

type Callback = (CallbackObjectType) => (Airport) => void
export const createParser = (reader: any) => (callback: Callback) => {
  let airport: Airport | undefined
  let way: Way | undefined
  let trafficFlow: TrafficFlow | undefined
  const schiphol = () => airport && airport.icao === 'EHAM'
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
      case codes.LINEAR_FEATURE:
      case codes.TAXIWAY:
      case codes.BOUNDARY: {
        if (insertWays) {
          if (way) {
            const _ways = airport.ways || []
            airport.ways = [..._ways, way]
          }
          let _parser
          switch (code) {
            case codes.TAXIWAY:
              _parser = parseTaxiWay
              break
            case codes.BOUNDARY:
              _parser = parseBoundaryWay
              break
            case codes.LINEAR_FEATURE:
              _parser = parseLinearFeature
              break
          }
          way = _parser(data)
        }
        break
      }
      case codes.NODE_PLAIN:
      case codes.NODE_CLOSE_LOOP:
      case codes.NODE_END:
      case codes.NODE_BEZIER:
      case codes.NODE_BEZIER_CLOSE_LOOP:
      case codes.NODE_BEZIER_END: {
        if (insertWays) {
          const node = parseNode(code)(data)
          const _nodes = way.nodes || []
          way.nodes = [..._nodes, node]
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
      case codes.WINDSOCK: {
        const _windsocks = airport.windsocks || []
        airport.windsocks = [..._windsocks, parseWindsock(data)]
        break
      }
      case codes.SIGN: {
        const _signs = airport.signs || []
        airport.signs = [..._signs, parseSign(data)]
        break
      }
      case codes.LIGHTING_OBJECT: {
        const _lights = airport.lights || []
        airport.lights = [..._lights, parseLightingObject(data)]
        break
      }
      case codes.TRAFFIC_FLOW: {
        if (trafficFlowEnabled) {
          if (trafficFlow) {
            const _trafficFlows = airport.trafficFlow || []
            airport.trafficFlow = [..._trafficFlows, trafficFlow]
          }
          trafficFlow = parseTrafficFlow(data)
        }
        break
      }
      case codes.TRAFFIC_FLOW_WIND_RULE: {
        if (trafficFlowEnabled) {
          const _windRules = trafficFlow.windRules || []
          trafficFlow.windRules = [..._windRules, parseWindRule(data)]
        }
        break
      }
      case codes.TRAFFIC_FLOW_CEILING_RULE: {
        if (trafficFlowEnabled) {
          const _ceilingRules = trafficFlow.ceilingRules || []
          trafficFlow.ceilingRules = [..._ceilingRules, parseCeilingRule(data)]
        }
        break
      }
      case codes.TRAFFIC_FLOW_VISIBILITY_RULE: {
        if (trafficFlowEnabled) {
          const _visibilityRules = trafficFlow.visibilityRules || []
          trafficFlow.visibilityRules = [
            ..._visibilityRules,
            parseVisibilityRule(data),
          ]
        }
        break
      }
      case codes.TRAFFIC_FLOW_TRAFFIC_TIME_RULE: {
        if (trafficFlowEnabled) {
          const _trafficTimeRules = trafficFlow.trafficTimeRules || []
          trafficFlow.trafficTimeRules = [
            ..._trafficTimeRules,
            parseTrafficTimeRule(data),
          ]
        }
        break
      }
      case codes.TRAFFIC_FLOW_RUNWAY_IN_USE_RULE_A:
      case codes.TRAFFIC_FLOW_RUNWAY_IN_USE_RULE_B: {
        if (trafficFlowEnabled && !!trafficFlow) {
          const _runwayInUseRules = trafficFlow.runwayInUseRules || []
          trafficFlow.runwayInUseRules = [
            ..._runwayInUseRules,
            parseRunwayInUse(data),
          ]
        }
        break
      }
      case codes.TRAFFIC_FLOW_VFR_PATTERN_RULE: {
        if (trafficFlowEnabled) {
          const _vfrRules = trafficFlow.vfrRules || []
          trafficFlow.vfrRules = [..._vfrRules, parseVfrRule(data)]
        }
        break
      }
      case codes.TAXI_ROUTING: {
        // for readability only, ignore
        break
      }
      case codes.TAXI_ROUTING_NODE: {
        if (taxiRoutingEnabled) {
          const _nodes = airport.taxiRouting.nodes
          airport.taxiRouting.nodes = [..._nodes, parseTaxiNode(data)]
        }
        break
      }
      case codes.TAXI_ROUTING_EDGE: {
        if (taxiRoutingEnabled) {
          const _edges = airport.taxiRouting.edges
          airport.taxiRouting.edges = [..._edges, parseTaxiEdge(data)]
        }
        break
      }
      case codes.TAXI_ROUTING_EDGE_ACTIVE_ZONES: {
        if (taxiRoutingEnabled) {
          const _edgeActiveZones = airport.taxiRouting.edgeActiveZones
          airport.taxiRouting.edgeActiveZones = [
            ..._edgeActiveZones,
            parseTaxiEdgeActiveZone(data),
          ]
        }
        break
      }
    }
  }
  reader.on('line', parseLine)
  reader.on('close', () => console.log('close'))
}
