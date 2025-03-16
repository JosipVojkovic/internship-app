/*
  Warnings:

  - The values [Grade] on the enum `InterviewQuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `discipline` on the `InterviewQuestion` table. All the data in the column will be lost.
  - Added the required column `category` to the `InterviewQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InterviewQuestionCategory" AS ENUM ('General', 'Personal', 'Development', 'Design', 'Marketing', 'Multimedia', 'Final');

-- AlterEnum
BEGIN;
CREATE TYPE "InterviewQuestionType_new" AS ENUM ('Field', 'TextArea', 'Select', 'Slider', 'Checkbox', 'Date', 'DateTime', 'Radio', 'Number');
ALTER TABLE "InterviewQuestion" ALTER COLUMN "type" TYPE "InterviewQuestionType_new" USING ("type"::text::"InterviewQuestionType_new");
ALTER TYPE "InterviewQuestionType" RENAME TO "InterviewQuestionType_old";
ALTER TYPE "InterviewQuestionType_new" RENAME TO "InterviewQuestionType";
DROP TYPE "InterviewQuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "InterviewQuestion" DROP COLUMN "discipline",
ADD COLUMN     "category" "InterviewQuestionCategory" NOT NULL;

-- DropEnum
DROP TYPE "InterviewQuestionDiscipline";
