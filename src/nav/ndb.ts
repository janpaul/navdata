import { NavCommon, parseCommon } from './common'
import { nameToString } from '../utils'
import { NavType } from './index'

export type Ndb = NavCommon & {
  identifier: string
  name: string
}

export const parseNdb = (data: string[]): Ndb => {
  const [identifier, ...name] = data.slice(6)
  return {
    ...parseCommon('ndb' as NavType)(data),
    identifier,
    name: nameToString(name),
  }
}
