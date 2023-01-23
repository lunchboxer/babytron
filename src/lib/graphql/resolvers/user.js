export const User = {
  fatherTo: (root, _, { prisma }) =>
    prisma.user
      .findUnique({
        where: { id: root.id },
      })
      .fatherTo(),

  motherTo: (root, _, { prisma }) =>
    prisma.user
      .findUnique({
        where: { id: root.id },
      })
      .motherTo(),
}
