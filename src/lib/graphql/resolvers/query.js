import { GraphQLError } from 'graphql'

export const Query = {
  me: async (_, parameters, context) => {
    const { user } = context
    if (!user) {
      throw new GraphQLError("Requested authenticated user doesn't exists.")
    }
    return user
  },

  user: async (_, { id }, context) => {
    const foundUser = await context.prisma.user.findUnique({
      where: { id },
    })
    if (!foundUser) throw new GraphQLError('User not found.')
    return foundUser
  },

  users: (_, parameters, context) => {
    return context.prisma.user.findMany()
  },

  userCount: async (_, parameters, { prisma }) => {
    const count = await prisma.user.aggregate({ _count: { id: true } })
    return count._count.id
  },

  baby: async (_, { id }, context) => {
    const foundBaby = await context.prisma.baby.findUnique({
      where: { id },
    })
    if (!foundBaby) throw new GraphQLError('Baby not found.')
    return foundBaby
  },

  babies: (_, parameters, context) => {
    return context.prisma.baby.findMany()
  },
  openSleep: (_, { babyId }, { prisma }) =>
    prisma.sleep.findFirst({
      where: {
        baby: { id: babyId },
        end: null,
      },
    }),
  openFeeding: (_, { babyId }, { prisma }) =>
    prisma.feeding.findFirst({
      where: {
        baby: { id: babyId },
        end: null,
      },
    }),
  recentFeedings: async (_, { babyId, limit = 100 }, { prisma }) => {
    const where = babyId && { baby: { id: babyId } }
    return await prisma.feeding.findMany({
      take: limit,
      orderBy: { start: 'desc' },
      where,
    })
  },
  recentSleeps: async (_, { babyId, limit = 100 }, { prisma }) => {
    const where = babyId && { baby: { id: babyId } }
    return await prisma.sleep.findMany({
      take: limit,
      orderBy: { start: 'desc' },
      where,
    })
  },
  recentDiapers: async (_, { babyId, limit = 100 }, { prisma }) => {
    const where = babyId && { baby: { id: babyId } }
    return await prisma.diaper.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
      where,
    })
  },
  weight: async (_, { babyId }, { prisma }) => {
    const heights = await prisma.measurement.findMany({
      take: 1,
      where: {
        baby: { id: babyId },
        type: 'weightInGrams',
      },
      orderBy: { timestamp: 'desc' },
    })
    return heights[0]
  },
  length: async (_, { babyId }, { prisma }) => {
    const lengths = await prisma.measurement.findMany({
      take: 1,
      where: {
        baby: { id: babyId },
        type: 'lengthInMillimeters',
      },
      orderBy: { timestamp: 'desc' },
    })
    return lengths[0]
  },
  milestoneAchievements: (_, { babyId }, { prisma }) =>
    prisma.milestoneAchievement.findMany({
      where: { baby: { id: babyId } },
    }),
  milestones: async (_, { input }, { prisma }) => {
    const { category, monthsAge } = input
    return prisma.milestone.findMany({
      where: {
        category,
        monthsAge,
      },
    })
  },
}
