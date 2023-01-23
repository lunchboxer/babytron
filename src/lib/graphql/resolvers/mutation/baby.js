import { GraphQLError } from 'graphql'

const birthdateMustBePast = (birthdate) => {
  const now = new Date()
  const birth = new Date(birthdate)
  if (birth > now) throw new GraphQLError('Birthdate must be in past.')
}

export const baby = {
  createBaby: async (_, { input }, context) => {
    if (input.birthdate) birthdateMustBePast(input.birthdate)
    return context.prisma.baby.create({
      data: { ...input },
    })
  },

  updateBaby: async (_, { input }, { prisma }) => {
    if (input.birthdate) birthdateMustBePast(input.birthdate)
    const { id, ...data } = input
    return prisma.baby.update({
      where: { id },
      data,
    })
  },

  deleteBaby: (_, { id }, { prisma }) => prisma.baby.delete({ where: { id } }),

  birth: (_, parameters, { prisma }) => {
    const { id } = parameters
    const birthdate = new Date(parameters.birthdate).toISOString()
    return prisma.baby.update({ where: { id }, data: { birthdate } })
  },
  unbirth: (_, { id }, { prisma }) => {
    return prisma.baby.update({ where: { id }, data: { birthdate: null } })
  },
}
