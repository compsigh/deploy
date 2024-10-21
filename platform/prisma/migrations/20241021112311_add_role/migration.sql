/*
  Warnings:

  - Added the required column `role` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORGANIZER', 'PARTICIPANT', 'JUDGE');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "role" "Role" NOT NULL;
