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
  measurements: (root, _, { prisma }) =>
    prisma.baby
      .findUnique({
        where: { id: root.id },
      })
      .measurements(),
  diapers: (root, _, { prisma }) =>
    prisma.baby
      .findUnique({
        where: { id: root.id },
      })
      .diapers(),
}
