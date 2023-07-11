import { database } from './src/lib/data/database.js'
import { writeFile } from 'node:fs/promises'

const users = await database.user.findMany()

await writeFile(
  './exported-users.json',
  JSON.stringify(users),
  'utf8'
)

const babies = await database.baby.findMany()

await writeFile(
  './exported-babies.json',
  JSON.stringify(babies),
  'utf8'
)

const measurements = await database.measurement.findMany()

await writeFile(
  './exported-measurement.json',
  JSON.stringify(measurements),
  'utf8'
)

const sleeps = await database.sleep.findMany({
  include: { recordedBy: true }
})

await writeFile(
  './exported-sleeps.json',
  JSON.stringify(sleeps),
  'utf8'
)

const feedings = await database.feeding.findMany({
  include: { recordedBy: true }
})

await writeFile(
  './exported-feedings.json',
  JSON.stringify(feedings),
  'utf8'
)

const diapers = await database.diaper.findMany()

await writeFile(
  './exported-diapers.json',
  JSON.stringify(diapers),
  'utf8'
)
