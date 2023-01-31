export const MilestoneAchievement = {
  baby: (root, _, { prisma }) =>
    prisma.milestoneAchievement.findUnique({ where: { id: root.id } }).baby(),
  milestone: (root, _, { prisma }) =>
    prisma.milestoneAchievement
      .findUnique({ where: { id: root.id } })
      .milestone(),
}
