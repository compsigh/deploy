/*
  Warnings:

  - You are about to drop the column `role` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Judge" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Judge_email_key" ON "Judge"("email");
