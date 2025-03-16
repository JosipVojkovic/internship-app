-- CreateEnum
CREATE TYPE "InterviewQuestionDiscipline" AS ENUM ('All', 'Development', 'Design', 'Multimedia', 'Marketing');

-- CreateEnum
CREATE TYPE "InterviewQuestionType" AS ENUM ('Field', 'Select', 'Radio', 'Grade');

-- CreateEnum
CREATE TYPE "InterviewQuestionStatus" AS ENUM ('Disabled', 'Enabled');

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "InterviewQuestionType" NOT NULL,
    "discipline" "InterviewQuestionDiscipline" NOT NULL,
    "status" "InterviewQuestionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);
