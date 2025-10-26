import { AssignmentType, prisma, Role } from "./client";

import users from "./seed-data/users.json";
import courses from "./seed-data/courses.json";
import enrollments from "./seed-data/enrollments.json";
import feedbacks from "./seed-data/feedbacks.json";
import grades from "./seed-data/grades.json";
import submissions from "./seed-data/submissions.json";
import assignments from "./seed-data/assignments.json";

const assignmentToCourseLinks = [
  { courseId: "9a3c5f10-2b7e-4c8d-8f1a-6d3b2e9c5a7f", assignmentId: "1f3a6b10-4c7e-4d9f-8a1b-3e5c2d7f6a8b" },
  { courseId: "2d6b1e20-5c3a-4f9b-9d2e-1f7c4a6b8d9e", assignmentId: "2e5c7d20-1f3b-4a8e-9c6d-0b2f4a7e1d3c" },
  { courseId: "7f2a4c30-1d5b-4e8a-8c3f-6b1d2e7a5c9f", assignmentId: "7c1a8f30-5d2b-4e9b-8f3a-6b4c1d7e2a5f" },
  { courseId: "4c1e7d40-3a2b-4f9c-9b5e-2d6a1f8c3e7b", assignmentId: "4b2d6e40-8a1c-4f9d-9b3e-5c7a2d1f6e8b" },
  { courseId: "0b5f9a50-2c1d-4e7f-8a3b-5d6e2c1f9b4a", assignmentId: "0d3f9b50-2c6a-4e7f-8b1d-3a5e7c2f4b9d" },
  { courseId: "6a3d1e60-5f2b-4d8c-9e1a-7c4b3f2d5a8e", assignmentId: "6e1c2a60-4b7f-4d9c-9a3e-5f2d7b1c8a4e" },
  { courseId: "1c7b4f70-3e2a-4f9b-8d6c-0a5e2b1d7f3c", assignmentId: "1f4b7d70-3c2a-4e9f-8d6b-0a5c1e7f2b8d" },
  { courseId: "8f2e1c80-4b7a-4e9d-9a3b-6d5f1c2e7a4b", assignmentId: "8a5e1c80-2d3b-4f9a-9c6e-7b1d2f3a4e5c" },
  { courseId: "3b1d6a90-5c2f-4f8c-8d1e-7a4b3c2e5f9d", assignmentId: "3c2f8b90-1a6d-4e7c-8f2b-5d9a3c1e6b4f" },
  { courseId: "5e3a7c00-2b1d-4d9b-9f6c-1e5a3b7d2c4f", assignmentId: "5b1d6a00-4f3e-4d9b-9c1a-2e7f5b3d6c8a" },
];

(async () => {
  try {
    await Promise.all(
      users.map(user =>
        prisma.user.upsert({
          where: { id: user.id },
          update: {
            name: user.name,
            email: user.email,
            role: user.role as Role,
          },
          create: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Role,
            created_at: new Date(user.created_at ?? Date.now()),
          },
        })
      )
    );

    await Promise.all(
      courses.map(course =>
        prisma.course.upsert({
          where: { id: course.id },
          update: {
            name: course.name,
            description: course.description,
            owner_id: course.owner_id,
          },
          create: {
            id: course.id,
            name: course.name,
            description: course.description,
            owner_id: course.owner_id,
            created_at: new Date(course.created_at ?? Date.now()),
          },
        })
      )
    );

    await Promise.all(
      enrollments.map(enrollment =>
        prisma.enrollment.upsert({
          where: { id: enrollment.id },
          update: {
            user_id: enrollment.user_id,
            course_id: enrollment.course_id,
            user_role: enrollment.user_role as Role,
          },
          create: {
            id: enrollment.id,
            user_id: enrollment.user_id,
            course_id: enrollment.course_id,
            user_role: enrollment.user_role as Role,
            enrolled_at: new Date(enrollment.enrolled_at ?? Date.now()),
          },
        })
      )
    );

    await Promise.all(
  assignments.map(assignment => {
    // Find the course ID that matches this assignment (from your link list)
    const link = assignmentToCourseLinks.find(l => l.assignmentId === assignment.id);

    if (!link) {
      console.warn(`⚠️ No course link found for assignment ${assignment.id}`);
      return null;
    }

    return prisma.assignment.upsert({
      where: { id: assignment.id },
      update: {
        title: assignment.title,
        due_by: new Date(assignment.due_by),
        instructions: assignment.instructions,
        type: assignment.type as AssignmentType,
      },
      create: {
        id: assignment.id,
        title: assignment.title,
        due_by: new Date(assignment.due_by),
        instructions: assignment.instructions,
        type: assignment.type as AssignmentType,
        created_at: new Date(assignment.created_at ?? Date.now()),
        course: { connect: { id: link.courseId } }, // 👈 REQUIRED FIX
      },
    });
  })
);

    await Promise.all(
      submissions.map(submission =>
        prisma.submission.upsert({
          where: { id: submission.id },
          update: {
            submitted_at: new Date(submission.submitted_at ?? Date.now()),
            assignment_id: submission.assignment_id,
            content: submission.content,
            type: submission.type as AssignmentType,
          },
          create: {
            id: submission.id,
            submitted_at: new Date(submission.submitted_at ?? Date.now()),
            assignment_id: submission.assignment_id,
            content: submission.content,
            type: submission.type as AssignmentType,
            owner_id: submission.owner_id,
          },
        })
      )
    );

    await Promise.all(
      feedbacks.map(feedback =>
        prisma.feedback.upsert({
          where: { id: feedback.id },
          update: { ...feedback },
          create: { ...feedback },
        })
      )
    );

    await Promise.all(
      grades.map(grade =>
        prisma.grade.upsert({
          where: { id: grade.id },
          update: { ...grade },
          create: { ...grade },
        })
      )
    );

    await Promise.all(
  assignmentToCourseLinks.map(link =>
    prisma.course.update({
      where: { id: link.courseId },
      data: {
        assignments: {
          connect: { id: link.assignmentId },
        },
      },
    })
  )
);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
