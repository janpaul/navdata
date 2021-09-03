import { join } from 'path'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { createParser as createAirportParser } from './apt/airport-parser'
import { CallbackObjectType } from './types'
import { Airport } from './apt/airport'
import config from './config'

const { writeJsonFile } = config

const outDir = join(process.cwd(), 'output')
const dataDir = join(process.cwd(), 'data')
const airportReader = createInterface({
  input: createReadStream(join(dataDir, 'apt.dat')),
  output: process.stdout,
  terminal: false,
})
const callback = (type: CallbackObjectType) => (data: Airport) => {
  switch (type) {
    case 'airport': {
      const { icao } = data as Airport
      // if (['EHAM', 'KMIA'].includes(icao)) {
      if (writeJsonFile) {
        writeFile(
          join(outDir, `${icao}.json`),
          JSON.stringify(data, null, 2)
        ).then(() => {
          console.log(`written`, icao)
        })
      }
      break
    }
  }
}
createAirportParser(airportReader)(callback)
