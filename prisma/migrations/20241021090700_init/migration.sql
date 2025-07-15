-- CreateEnum
CREATE TYPE "GraduatingClass" AS ENUM ('CO2028', 'CO2027', 'CO2026', 'CO2025', 'MASTERS');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('MOBILE_APP', 'DESKTOP_APP', 'APPLET', 'GAME', 'WEB_APP', 'WEBSITE', 'OPEN_SOURCE_CONTRIBUTION', 'HARDWARE', 'OTHER');

-- CreateTable
CREATE TABLE "Participant" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "graduatingClass" "GraduatingClass" NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "fromParticipantEmail" TEXT NOT NULL,
    "toParticipantEmail" TEXT NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "link" TEXT NOT NULL,
    "notes" TEXT,
    "song" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_teamId_key" ON "Project"("teamId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
