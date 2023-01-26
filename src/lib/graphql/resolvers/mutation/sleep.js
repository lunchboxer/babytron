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
const onlyOneOpenSleepPerBaby = async (prisma, babyId) => {
  const openSleeps = await prisma.sleep.findFirst({
    where: {
      baby: { id: babyId },
      end: null,
    },
  })
  if (openSleeps) {
    throw new GraphQLError(
      'Another open sleep already exists. Please delete or complete it before creating a new sleep period.',
    )
  }
}

export const sleep = {
  createSleep: async (_, { input }, context) => {
    const { babyId, start, end, wakeReason, notes } = input
    await onlyOneOpenSleepPerBaby(context.prisma, babyId)
    timestampMustBePast(start)
    if (end) {
      timestampMustBePast(end)
      noEndBeforeStart(start, end)
    }
    return context.prisma.sleep.create({
      data: {
        start,
        end,
        notes,
        wakeReason,
        baby: {
          connect: { id: babyId },
        },
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    })
  },
  closeSleep: async (_, { input }, context) => {
    const { end, id, wakeReason, notes } = input
    const openSleep = await context.prisma.sleep.findFirst({ where: { id } })
    if (!openSleep) {
      throw new GraphQLError(
        'The sleep period you are trying to close was not found.',
      )
    }
    timestampMustBePast(end)
    noEndBeforeStart(openSleep.start, end)
    return context.prisma.sleep.update({
      where: { id },
      data: {
        end,
        notes,
        wakeReason,
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    })
  },
  deleteSleep: async (_, { id }, { prisma }) =>
    prisma.sleep.delete({ where: { id } }),
}
