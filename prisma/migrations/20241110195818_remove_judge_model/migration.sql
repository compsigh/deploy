/*
  Warnings:

  - You are about to drop the `Judge` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `judgeName` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_judgeEmail_fkey";

-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "judgeName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Judge";
