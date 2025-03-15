import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

export const prisma = globalForPrisma.prisma;