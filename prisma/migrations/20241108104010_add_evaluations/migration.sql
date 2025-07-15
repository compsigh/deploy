-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "judgeEmail" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "criterion1" INTEGER NOT NULL,
    "criterion2" INTEGER NOT NULL,
    "criterion3" INTEGER NOT NULL,
    "criterion4" INTEGER NOT NULL,
    "criterion5" INTEGER NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_judgeEmail_fkey" FOREIGN KEY ("judgeEmail") REFERENCES "Judge"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
