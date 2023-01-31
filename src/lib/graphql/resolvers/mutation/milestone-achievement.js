export const milestoneAchievement = {
  logMilestoneAchievement: async (_, { babyId, milestoneId }, context) =>
    context.prisma.milestoneAchievement.create({
      data: {
        baby: {
          connect: { id: babyId },
        },
        milestone: {
          connect: { id: milestoneId },
        },
        recordedBy: {
          connect: { id: context.user.id },
        },
      },
    }),
  deleteMilestoneAchievement: (_, { id }, { prisma }) =>
    prisma.milestoneAchievement.delete({ where: { id } }),
}
