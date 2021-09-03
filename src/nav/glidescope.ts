import { NavCommon, parseCommon } from './common'
import { nameToString, toHeading } from '../utils'
import { NavType } from './index'

type GlidescopeName = 'GS'
export type Glidescope = NavCommon & {
  bearing: number
  identifier: string
  icao: string
  runway: string
  name: GlidescopeName
}

export const parseGlidescope = (data: string[]): Glidescope => {
  const [bearing, identifier, icao, , runway, ...name] = data.slice(5)
  return {
    ...parseCommon('ndb' as NavType)(data),
    bearing: toHeading(bearing),
    identifier,
    icao,
    runway,
    name: nameToString(name) as GlidescopeName,
  }
}
