/*
  Warnings:

  - A unique constraint covering the columns `[title,due_by]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,owner_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,course_id]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[submission_id,student_id,professor_id]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[submission_id,student_id]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assignment_id,owner_id]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professor_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "professor_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Grade" ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Submission" ADD COLUMN     "owner_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_title_due_by_key" ON "public"."Assignment"("title", "due_by");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_owner_id_key" ON "public"."Course"("name", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_user_id_course_id_key" ON "public"."Enrollment"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_submission_id_student_id_professor_id_key" ON "public"."Feedback"("submission_id", "student_id", "professor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_submission_id_student_id_key" ON "public"."Grade"("submission_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_assignment_id_owner_id_key" ON "public"."Submission"("assignment_id", "owner_id");

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
