export const Baby = {
  father: (root, _, { prisma }) =>
    prisma.baby
      .findUnique({
        where: { id: root.id },
      })
      .father(),

  mother: (root, _, { prisma }) =>
    prisma.baby
      .findUnique({
        where: { id: root.id },
      })
      .mother(),
}
