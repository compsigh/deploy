-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "attended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "presented" BOOLEAN NOT NULL DEFAULT false;
