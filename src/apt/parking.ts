import { toDegrees, toHeading, nameToString } from '../utils'

type LocationType = 'gate' | 'hangar' | 'misc' | 'tie_down'
type OperationType =
  | 'none'
  | 'general_aviation'
  | 'airline'
  | 'cargo'
  | 'military'
type AircraftType = 'heavy' | 'jets' | 'turboprops' | 'props' | 'all'
type IcaoWidth = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type ParkingType =
  | 'baggage_loader'
  | 'baggage_train'
  | 'crew_car'
  | 'crew_ferrari'
  | 'crew_limo'
  | 'pushback'
  | 'fuel_liners'
  | 'fuel_jets'
  | 'fuel_props'
  | 'food'
  | 'gpu'
export type StartupLocation = {
  lat: number
  lon: number
  heading: number
  locationType?: LocationType
  aircraftTypes?: AircraftType[]
  name?: string
}
export type RampStart = {
  icaoWidth: IcaoWidth
  operationType: OperationType
  airlines: string[]
}
export type TruckParking = {
  lat: number
  lon: number
  orientation: number
  parkingType: ParkingType
  trainLength?: number
  name: string
}
export const parseStartupLocation = (data: string[]): StartupLocation => {
  const [lat, lon, heading, ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    heading: toHeading(heading),
    name: nameToString(name),
  }
}
export const parseStartupLocationNew = (data: string[]): StartupLocation => {
  const [lat, lon, heading, locationType, aircraftTypes, ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    heading: toHeading(heading),
    locationType: locationType as LocationType,
    aircraftTypes: aircraftTypes.split('|') as AircraftType[],
    name: nameToString(name),
  }
}

export const parseRampStart = (data: string[]): RampStart => {
  const [icaoWidth, operationType, ...airlines] = data
  return {
    icaoWidth: icaoWidth as IcaoWidth,
    operationType: operationType as OperationType,
    airlines,
  }
}

export const parseTruckParking = (data: string[]): TruckParking => {
  const [lat, lon, orientation, parkingType, length, ...name] = data
  return {
    lat: toDegrees(lat),
    lon: toDegrees(lon),
    orientation: toHeading(orientation),
    parkingType: parkingType as ParkingType,
    trainLength: Number(length) > 0 ? Number(length) : undefined,
    name: nameToString(name),
  }
}
