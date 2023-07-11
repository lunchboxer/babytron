import { PrismaClient } from '@prisma/client'
import { milestones } from './seed/index.js'

const prisma = new PrismaClient()
async function main() {
  console.log('Seeding database with development milestones from CDC')
  // const existingMilestones = await prisma.milestone.findFirst({})
  // if (existingMilestones) {
  //   throw new Error(
  //     'For consistency and safety, this seed scripts only operates on an empty milestone table.',
  //   )
  // }

  console.log(`Seeding ${milestones.length} milestones`)
  for (const milestone of milestones) {
    await prisma.milestone.create({
      data: milestone,
    })
  }
  // const milestonesInserted = await prisma.milestone.createMany({
  //   data: milestones,
  //   skipDuplicates: true,
  // })
  // console.log(`Inserted ${milestonesInserted.count} new milestones`)
}
try {
  await main()
} catch (error) {
  console.error(error)
} finally {
  await prisma.$disconnect()
}
