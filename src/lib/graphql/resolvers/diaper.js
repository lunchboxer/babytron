export const Diaper = {
  baby: (root, _, { prisma }) =>
    prisma.diaper.findUnique({ where: { id: root.id } }).baby(),
  recordedBy: (root, _, { prisma }) =>
    prisma.diaper.findUnique({ where: { id: root.id } }).recordedBy(),
}
