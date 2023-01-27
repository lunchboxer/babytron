import { user } from './user.js'
import { baby } from './baby.js'
import { measurement } from './measurement.js'
import { diaper } from './diaper.js'
import { sleep } from './sleep.js'
import { feeding } from './feeding.js'

export const Mutation = {
  ...user,
  ...baby,
  ...measurement,
  ...diaper,
  ...sleep,
  ...feeding,
}
