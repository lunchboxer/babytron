import { user } from './user.js'
import { baby } from './baby.js'
import { measurement } from './measurement.js'

export const Mutation = {
  ...user,
  ...baby,
  ...measurement,
}
