import { nameToString, toHeading } from '../utils'

type BaseTrafficRule = {
  metar: string
}
type WindRule = BaseTrafficRule & {
  minDirection: number
  maxDirection: number
  maxSpeed: number
}
type CeilingRule = BaseTrafficRule & {
  min: number
}
type VisiblityRule = BaseTrafficRule & {
  min: number
}
type TrafficTimeRule = {
  from: string
  to: string
}
type RuleType = 'arrivals' | 'departures'
type AirplaneType = 'heavy' | 'jets' | 'turboprops' | 'props' | 'helos'
type RunwayInUseRule = {
  runway: string
  frequency: string
  ruleType: RuleType[]
  airplaneTypes: AirplaneType[]
}
type VfrRuleDirection = 'left' | 'right'
type VfrRule = {
  runway: string
  direction: VfrRuleDirection
}
export type TrafficFlow = {
  name: string
  windRules?: WindRule[]
  ceilingRules?: CeilingRule[]
  visibilityRules?: VisiblityRule[]
  trafficTimeRules?: TrafficTimeRule[]
  runwayInUseRules?: RunwayInUseRule[]
  vfrRules?: VfrRule[]
}

export const parseTrafficFlow = (data: string[]): TrafficFlow => {
  return { name: nameToString(data) }
}
export const parseWindRule = (data: string[]): WindRule => {
  const [metar, min, max, speed] = data
  return {
    metar,
    minDirection: toHeading(min),
    maxDirection: toHeading(max),
    maxSpeed: Number(speed),
  }
}
export const parseCeilingRule = (data: string[]): CeilingRule => {
  const [metar, min] = data
  return {
    metar,
    min: Number(min),
  }
}
export const parseVisibilityRule = (data: string[]): VisiblityRule => {
  const [metar, min] = data
  return {
    metar,
    min: Number(min),
  }
}
export const parseTrafficTimeRule = (data: string[]): TrafficTimeRule => {
  const [from, to] = data
  return {
    from,
    to,
  }
}
export const parseRunwayInUse = (data: string[]): RunwayInUseRule => {
  const [runway, frequency, ruleType, airplaneTypes] = data
  return {
    runway,
    frequency,
    ruleType: ruleType.split('|') as RuleType[],
    airplaneTypes: airplaneTypes.split('|') as AirplaneType[],
  }
}
export const parseVfrRule = (data: string[]): VfrRule => {
  const [runway, direction] = data
  return {
    runway,
    direction: direction as VfrRuleDirection,
  }
}
