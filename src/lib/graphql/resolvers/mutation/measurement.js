import { GraphQLError } from 'graphql'

const timestampMustBePast = (timestamp) => {
  const now = new Date()
  const dateObject = new Date(timestamp)
  if (dateObject > now) {
    throw new GraphQLError('Timestamp for measurement must be past.')
  }
}

export const measurement = {
  createMeasurement: async (_, { input }, context) => {
    const { type, value, timestamp, babyId } = input
    if (timestamp) timestampMustBePast(timestamp)
    return context.prisma.measurement.create({
      data: {
        type,
        value,
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

  deleteMeasurement: (_, { id }, { prisma }) =>
    prisma.measurement.delete({ where: { id } }),
}
