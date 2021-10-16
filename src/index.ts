import { join } from 'path'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { createParser as createAirportParser } from './apt'
import { createParser as createNavParser, Nav } from './nav'
import { Airport } from './apt/airport'
import config from './config'

const { writeJsonFile } = config

const outDir = join(process.cwd(), 'output')
const dataDir = join(process.cwd(), 'data')
const navigationData = []
const airportReader = createInterface({
  input: createReadStream(join(dataDir, 'apt.dat')),
  output: process.stdout,
  terminal: false,
})
const navReader = createInterface({
  input: createReadStream(join(dataDir, 'earth_nav.dat')),
  output: process.stdout,
  terminal: false,
})
const callback =
  (type: 'airport' | 'nav' | 'nav-close') =>
  (data: Airport | Nav | undefined) => {
    switch (type) {
      case 'airport': {
        const { icao } = data as Airport
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
      case 'nav': {
        navigationData.push(data)
        break
      }
      case 'nav-close': {
        if (writeJsonFile) {
          writeFile(
            join(outDir, `nav-data.json`),
            JSON.stringify(navigationData, null, 2)
          ).then(() => {
            console.log(`navigation data written`)
          })
        }
        break
      }
    }
  }

createAirportParser(airportReader)(callback)
createNavParser(navReader)(callback)
