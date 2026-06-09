-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowMessages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowPings" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileVisibility" TEXT NOT NULL DEFAULT 'public';
