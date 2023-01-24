export const Measurement = {
  baby: (root, _, { prisma }) =>
    prisma.measurement.findUnique({ where: { id: root.id } }).baby(),
}
