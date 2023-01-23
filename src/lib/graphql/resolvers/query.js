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
}
