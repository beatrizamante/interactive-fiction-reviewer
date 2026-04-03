import type { PrismaClient } from '@prisma/client';

export async function cleanDb(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE reviews, authors, fictions, users RESTART IDENTITY CASCADE`,
  );
}
