import { nameToString } from '../utils'

type Unit = 'khz' | 'mhz'
type RadioType =
  | 'recorded'
  | 'unicom_ctaf_radio'
  | 'clearance_delivery'
  | 'ground'
  | 'tower'
  | 'approach'
  | 'departure'
export type Radio = {
  radioType: RadioType
  unit: Unit
  frequency: number
  name: string
}

const radioTypes: Record<string, RadioType> = {
  '50': 'recorded',
  '1050': 'recorded',
  '51': 'unicom_ctaf_radio',
  '1051': 'unicom_ctaf_radio',
  '52': 'clearance_delivery',
  '1052': 'clearance_delivery',
  '53': 'ground',
  '1053': 'ground',
  '54': 'tower',
  '1054': 'tower',
  '55': 'approach',
  '1055': 'approach',
  '56': 'departure',
  '1056': 'departure',
}

export const parseRadio =
  (code: string) =>
  (data: string[]): Radio => {
    const [frequency, ...name] = data
    return {
      radioType: radioTypes[code],
      unit: Number(code) > 1000 ? 'khz' : 'mhz',
      frequency: Number(frequency),
      name: nameToString(name),
    }
  }
