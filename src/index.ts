import { join } from 'path'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { createParser as createAirportParser } from './apt/airport-parser'
import { CallbackObjectType } from './types'
import { Airport } from './apt/airport'

const airportReader = createInterface({
  input: createReadStream(join(process.cwd(), 'data', 'apt.dat')),
  output: process.stdout,
  terminal: false,
})
const airportCallback = (type: CallbackObjectType) => (data: Airport) => {
  if (data.startupLocations) {
    console.log(`received ${type}`, data.startupLocations)
  }
}
createAirportParser(airportReader)(airportCallback)
