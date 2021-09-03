import { splitShizzle, toDegrees } from '../utils'
import { Ndb, parseNdb } from './ndb'
import { parseVor } from './vor'
import { parseLocaliser } from './localiser'
import { parseGlidescope } from './glidescope'
import { MarkerType, parseMarker } from './marker'
import { parseDme } from './dme'

export type NavType = MarkerType &
  (
    | 'ndb'
    | 'vor'
    | 'ils-localiser'
    | 'localiser'
    | 'ils-glidescope'
    | 'dme'
    | 'dme-standalone'
  )
export type Nav = Ndb

type Callback = (CallbackObjectType) => (Nav?) => void

export const createParser = (reader: any) => (callback: Callback) => {
  const parseLine = (line: string) => {
    const [code, ...data] = splitShizzle(line)
    switch (code) {
      case '2': {
        callback('nav')(parseNdb(data))
        break
      }
      case '3': {
        callback('nav')(parseVor(data))
        break
      }
      case '4':
      case '5': {
        callback('nav')(parseLocaliser(code)(data))
        break
      }
      case '6': {
        callback('nav')(parseGlidescope(data))
        break
      }
      case '7':
      case '8':
      case '9': {
        callback('nav')(parseMarker(code)(data))
        break
      }
      case '12':
      case '13': {
        callback('nav')(parseDme(code)(data))
        break
      }
    }
  }
  reader.on('line', parseLine)
  reader.on('close', () => callback('nav-close')())
}
