import { Location } from '.'

export const haversineDistance = (a: Location, b: Location) => {
  const R = 6371e3 // metres
  const φ1 = (a.lat * Math.PI) / 180 // φ, λ in radians
  const φ2 = (b.lat * Math.PI) / 180
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180
  const Δλ = ((b.lon - a.lon) * Math.PI) / 180
  const x =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  const d = R * y // in metres
  return Math.floor(d)
}
