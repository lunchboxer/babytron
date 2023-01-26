import { GraphQLError } from 'graphql'

const timestampMustBePast = (timestamp) => {
  const now = new Date()
  const dateObject = new Date(timestamp)
  if (dateObject > now) {
    throw new GraphQLError('Timestamp must be past.')
  }
}

export const diaper = {
  createDiaper: async (_, { input }, context) => {
    const { timestamp, babyId, isWet, isDirty, notes } = input
    if (timestamp) timestampMustBePast(timestamp)
    return context.prisma.diaper.create({
      data: {
        isWet,
        isDirty,
        notes,
        timestamp: timestamp || new Date(),
        baby: {
          connect: { id: babyId },
        },
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    })
  },
  deleteDiaper: async (_, { id }, { prisma }) =>
    prisma.diaper.delete({ where: { id } }),
}
