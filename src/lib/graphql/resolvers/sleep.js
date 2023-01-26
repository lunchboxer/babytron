export const Sleep = {
  baby: (root, _, { prisma }) =>
    prisma.sleep.findUnique({ where: { id: root.id } }).baby(),
  recordedBy: (root, _, { prisma }) =>
    prisma.sleep.findUnique({ where: { id: root.id } }).recordedBy(),
}
