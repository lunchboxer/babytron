import { database } from './src/lib/data/database.js'
import { readFile } from 'node:fs/promises'


const users = await readFile('./exported-users.json', 'utf8')

if (users) {
  const usersData = JSON.parse(users)
  for (const user of usersData) {
    const found = await database.user.findUnique({
      where: { id: user.id },
    })
    if (found) continue
    await database.user.create({
      data: {
        ...user,
      },
    })
  }
}

const babies = await readFile('./exported-babies.json', 'utf8')

if (babies) {
  const babiesData = JSON.parse(babies)
  for (const baby of babiesData) {
    const found = await database.baby.findUnique({
      where: { id: baby.id },
    })
    if (found) continue
    await database.baby.create({
      data: {
        ...baby,
      },
    })
  }
}

const baby = await database.baby.findFirst()

const feedings = await readFile('./exported-feedings.json', 'utf8')

if (feedings) {
  const feedingsData = JSON.parse(feedings)
  for (const feeding of feedingsData) {
    const found = await database.feeding.findUnique({
      where: { id: feeding.id },
    })
    if (found) continue
    const recordedBy = feeding.userId
    delete feeding.babyId
    delete feeding.userId
    await database.feeding.create({
      data: {
        ...feeding,
        baby: {
          connect: {
            id: baby.id,
          },
        },
        recordedBy: {
          connect: {
            id: recordedBy,
          },
        },
      },
    })
  }
}

const measurements = await readFile('./exported-measurement.json', 'utf8')

if (measurements) {
  const measurementsData = JSON.parse(measurements)
  for (const measurement of measurementsData) {
    const found = await database.measurement.findUnique({
      where: { id: measurement.id },
    })
    if (found) continue
    const recordedBy = measurement.userId
    delete measurement.babyId
    delete measurement.userId
    await database.measurement.create({
      data: {
        ...measurement,
        baby: {
          connect: {
            id: baby.id,
          },
        },
        recordedBy: {
          connect: {
            id: recordedBy,
          },
        },
      },
    })
  }
}
const sleeps = await readFile('./exported-sleeps.json', 'utf8')

if (sleeps) {
  const sleepsData = JSON.parse(sleeps)
  for (const sleep of sleepsData) {
    const found = await database.sleep.findUnique({
      where: { id: sleep.id },
    })
    if (found) continue
    const recordedBy = sleep.userId
    delete sleep.babyId
    delete sleep.userId
    await database.sleep.create({
      data: {
        ...sleep,
        baby: {
          connect: {
            id: baby.id,
          },
        },
        recordedBy: {
          connect: {
            id: recordedBy,
          },
        },
      },
    })
  }
}

const diapers = await readFile('./exported-diapers.json', 'utf8')

if (diapers) {
  const diapersData = JSON.parse(diapers)
  for (const diaper of diapersData) {
    const found = await database.diaper.findUnique({
      where: { id: diaper.id },
    })
    if (found) continue
    const recordedBy = diaper.userId
    delete diaper.babyId
    delete diaper.userId
    await database.diaper.create({
      data: {
        ...diaper,
        baby: {
          connect: {
            id: baby.id,
          },
        },
        recordedBy: {
          connect: {
            id: recordedBy,
          },
        },
      },
    })
  }
}
