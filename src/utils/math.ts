import { Location } from '../types'
import { toLocation } from '.'

const R = 6371e3 // metres

// many thanks to http://www.movable-type.co.uk/scripts/latlong.html

export const calculateDistance =
  (a: Location) =>
  (b: Location): number => {
    const lat1 = (a.lat * Math.PI) / 180 // lat, lon in radians
    const lat2 = (b.lat * Math.PI) / 180
    const dlat = ((b.lat - a.lat) * Math.PI) / 180
    const dlon = ((b.lon - a.lon) * Math.PI) / 180
    const x =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2)
    const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
    const d = R * y // in meters
    return Math.floor(d)
  }

export const calculateBearing =
  (a: Location) =>
  (b: Location): number => {
    const { lat: lat1, lon: lon1 } = a
    const { lat: lat2, lon: lon2 } = b
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2)
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    const angle = Math.atan2(y, x)
    return ((angle * 180) / Math.PI + 360) % 360 // in degrees
  }

export const calculateMidpoint = (a: Location, b: Location): Location => {
  const { lat: lat1, lon: lon1 } = a
  const { lat: lat2, lon: lon2 } = b
  const Bx = Math.cos(lat2) * Math.cos(lon2 - lon1)
  const By = Math.cos(lat2) * Math.sin(lon2 - lon1)
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
  )
  const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx)
  return toLocation(lat3)(lon3)
}

export const calculateLocationFromLocation = (
  a: Location,
  bearing: number,
  distance: number
): Location => {
  const { lat: lat1, lon: lon1 } = a
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / R) +
      Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing)
  )
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat1),
      Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2)
    )
  return toLocation(lat2)(lon2)
}
