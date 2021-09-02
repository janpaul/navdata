export type CenterLights = 'yes' | 'none'
export type EdgeLights = 'medium_intensity' | 'none'

export const toCenterLights = (code: string): CenterLights =>
  code === '0' ? 'none' : 'yes'
export const toEdgeLights = (code: string): EdgeLights =>
  code === '0' ? 'none' : 'medium_intensity'
