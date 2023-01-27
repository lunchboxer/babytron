import { GraphQLError } from 'graphql'

const timestampMustBePast = (timestamp) => {
  const now = new Date()
  const dateObject = new Date(timestamp)
  if (dateObject > now) {
    throw new GraphQLError('Timestamp must be past.')
  }
}

const noEndBeforeStart = (start, end) => {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  if (startTime >= endTime) {
    throw new GraphQLError('Start must precede end.')
  }
}
const onlyOneOpenFeedingPerBaby = async (prisma, babyId) => {
  const openFeeding = await prisma.feeding.findFirst({
    where: {
      baby: { id: babyId },
      end: null,
    },
  })
  if (openFeeding) {
    throw new GraphQLError(
      'Another active feeding session already exists. Please delete or complete it before creating a new one.',
    )
  }
}

export const feeding = {
  createFeeding: async (_, { input }, context) => {
    const { babyId, start, end, ...rest } = input
    await onlyOneOpenFeedingPerBaby(context.prisma, babyId)
    timestampMustBePast(start)
    if (end) {
      timestampMustBePast(end)
      noEndBeforeStart(start, end)
    }
    return context.prisma.feeding.create({
      data: {
        start,
        end,
        ...rest,
        baby: {
          connect: { id: babyId },
        },
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    })
  },
  updateFeeding: async (_, { input }, context) => {
    const { end, id, ...rest } = input
    const feeding = await context.prisma.feeding.findFirst({ where: { id } })
    if (!feeding) {
      throw new GraphQLError(
        'The feeding session you are trying to update was not found.',
      )
    }
    timestampMustBePast(end)
    if (rest.start) {
      timestampMustBePast(rest.start)
      noEndBeforeStart(rest.start, end)
    } else {
      noEndBeforeStart(feeding.start, end)
    }
    return context.prisma.feeding.update({
      where: { id },
      data: {
        end,
        ...rest,
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    })
  },
  deleteFeeding: async (_, { id }, { prisma }) =>
    prisma.feeding.delete({ where: { id } }),
}
