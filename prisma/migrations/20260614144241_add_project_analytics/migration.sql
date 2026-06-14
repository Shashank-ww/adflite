-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resumeFileName" TEXT,
ADD COLUMN     "resumeSize" INTEGER,
ADD COLUMN     "resumeUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "resumeUrl" TEXT;
