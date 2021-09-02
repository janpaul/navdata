import { nameToString } from '../utils'

export type MetaData = Record<string, string>

const validMetaKeys = [
  'faa_code',
  'iata_code',
  'city',
  'country',
  'region_code',
  'state',
]
export const parseMetadata = (data: string[]): MetaData => {
  const [key, ...value] = data
  return validMetaKeys.includes(key) && value.length > 0
    ? { [key]: nameToString(value) }
    : {}
}
