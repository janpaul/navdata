import { NavCommon, parseCommon } from './common'
import { nameToString } from '../utils'
import { NavType } from './index'

export type Vor = NavCommon & {
  slavedVariation: number
  identifier: string
  name: string
}

export const parseVor = (data: string[]): Vor => {
  const [slavedVariation, identifier, ...name] = data.slice(5)
  return {
    ...parseCommon('vor' as NavType)(data),
    slavedVariation: Number(slavedVariation),
    identifier,
    name: nameToString(name),
  }
}
