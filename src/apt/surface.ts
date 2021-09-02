const surfaceMapping: Record<string, Surface> = {
  '1': 'asphalt',
  '2': 'concrete',
  '3': 'grass',
  '4': 'dirt',
  '5': 'gravel',
  '12': 'dry_lakebed',
  '13': 'water',
  '14': 'snow_ice',
  '15': 'transparent',
}
export type Surface =
  | 'asphalt'
  | 'concrete'
  | 'grass'
  | 'dirt'
  | 'gravel'
  | 'dry_lakebed'
  | 'water'
  | 'snow_ice'
  | 'transparent'
export const toSurface = (code: string): Surface => surfaceMapping[code]
