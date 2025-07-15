-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "participantEmail" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
