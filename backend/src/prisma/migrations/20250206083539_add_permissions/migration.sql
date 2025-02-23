-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_RECIPES', 'ALL');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
