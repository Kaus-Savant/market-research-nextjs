// Prisma configuration for SQLite
// This file is used by Prisma CLI for migrations

const config = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
};

export default config;
