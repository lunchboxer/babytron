export const Feeding = {
  baby: (root, _, { prisma }) =>
    prisma.feeding.findUnique({ where: { id: root.id } }).baby(),
  recordedBy: (root, _, { prisma }) =>
    prisma.feeding.findUnique({ where: { id: root.id } }).recordedBy(),
}
