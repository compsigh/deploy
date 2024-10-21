import { PrismaClient } from "@prisma/client"

// ======================================================================
// Prevent Prisma from being instantiated multiple times
function prismaClientSingleton() {
  return new PrismaClient()
}

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production')
  globalThis.prismaGlobal = prisma
// ======================================================================