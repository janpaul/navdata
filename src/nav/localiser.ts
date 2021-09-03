import { NavCommon, parseCommon } from './common'
import { nameToString, toHeading } from '../utils'
import { NavType } from './index'

type LocaliserName =
  | 'ILS-cat-I'
  | 'ILS-cat-II'
  | 'ILS-cat-III'
  | 'LOC'
  | 'LDA'
  | 'SDF'
export type Localiser = NavCommon & {
  bearing: number
  identifier: string
  icao: string
  name: LocaliserName
  runway: string
}

export const parseLocaliser =
  (code: '4' | '5') =>
  (data: string[]): Localiser => {
    const [bearing, identifier, icao, , runway, ...name] = data.slice(5)
    return {
      ...parseCommon((code === '4' ? 'ils-localiser' : 'localiser') as NavType)(
        data
      ),
      bearing: toHeading(bearing),
      identifier,
      icao,
      runway,
      name: nameToString(name) as LocaliserName,
    }
  }
