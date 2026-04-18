// Prisma client initialization
// Note: Prisma client must be generated before runtime
// Run: npx prisma generate

let prisma: any;

try {
  const { PrismaClient } = require('@prisma/client');
  
  const globalForPrisma = global as unknown as { prisma: any };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ['warn', 'error'],
    });
  }

  prisma = globalForPrisma.prisma;
} catch (error) {
  console.warn('Prisma client not available - using mock implementation');
  // Mock implementation for development
  prisma = {
    deal: {
      findMany: async () => [],
      findUnique: async () => null,
      create: async (data: any) => ({ id: '1', ...data.data }),
      update: async (data: any) => data.data,
    },
  };
}

export { prisma };
