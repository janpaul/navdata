import { NavCommon, parseCommon } from './common'
import { nameToString } from '../utils'
import { NavType } from './index'

export type Dme = NavCommon & {
  bias: number
  identifier: string
  icao: string
  runway: string
  name: string
}

export const parseDme =
  (code: '12' | '13') =>
  (data: string[]): Dme => {
    const [bias, identifier, icao, runway, ...name] = data.slice(5)
    return {
      ...parseCommon('dme' as NavType)(data),
      bias: Number(bias),
      identifier,
      icao,
      runway,
      name: nameToString(name),
    }
  }
