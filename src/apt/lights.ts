import { Location } from '../types'
import { toDegrees, toHeading, toLocation } from '../utils'

export type CenterLights = 'yes' | 'none'
export type EdgeLights = 'medium_intensity' | 'none'
export type LightingObjectCode =
  | 'VASI'
  | 'PAPI-4L'
  | 'PAPI-4R'
  | 'VASI tri-color'
  | 'WIGWAG'
export type LightingObject = {
  location: Location
  code: LightingObjectCode
  orientation: number
  glidescopeAngle: number
  runway: string
}

export const toCenterLights = (code: string): CenterLights =>
  code === '0' ? 'none' : 'yes'
export const toEdgeLights = (code: string): EdgeLights =>
  code === '0' ? 'none' : 'medium_intensity'

const lightingObjectCodeMapping: Record<string, LightingObjectCode> = {
  '1': 'VASI',
  '2': 'PAPI-4L',
  '3': 'PAPI-4R',
  '4': 'VASI tri-color',
  '5': 'WIGWAG',
}

export const parseLightingObject = (data: string[]): LightingObject => {
  const [lat, lon, code, orientation, glidescopeAngle, runway] = data
  return {
    location: toLocation(toDegrees(lat))(toDegrees(lon)),
    orientation: toHeading(orientation),
    code: lightingObjectCodeMapping[code],
    glidescopeAngle: toHeading(glidescopeAngle),
    runway,
  }
}
