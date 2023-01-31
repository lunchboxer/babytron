export const Milestone = {
  milestoneAchievements: (root, _, { prisma }) =>
    prisma.milestone
      .findUnique({ where: { id: root.id } })
      .milestoneAchievements(),
}
