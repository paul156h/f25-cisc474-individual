import { AssignmentType, prisma, Role } from "./client";

import users from "./seed-data/users.json";
import courses from "./seed-data/courses.json";
import enrollments from "./seed-data/enrollments.json";
import feedbacks from "./seed-data/feedbacks.json";
import grades from "./seed-data/grades.json";
import submissions from "./seed-data/submissions.json";
import assignments from "./seed-data/assignments.json";


(async () => {
  try {
    await Promise.all(
      users.map((user) =>
        prisma.user.upsert({
          where: { email: user.email! },
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
      courses.map((course) =>
        prisma.course.upsert({
          where: { 
            name_description: {
              name: course.name!,
              description: course.description!,
            }
           },
          update: { 
            name: course.name,
            description: course.description,
            owner_id: course.owner_id,
           },
          create: {
            id: course.id,
            created_at: new Date(course.created_at ?? Date.now()),
            name: course.name,
            description: course.description,
            owner_id: course.owner_id,
          },
        })
      )
    );

    await Promise.all(
      enrollments.map((enrollment) =>
        prisma.enrollment.upsert({
          where: { 
            user_id_course_id: {
              user_id: enrollment.user_id,
              course_id: enrollment.course_id,
            } },
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
      assignments.map(assignment =>
        prisma.assignment.upsert({
          where: {
            title_due_by: {
            title: assignment.title,
            due_by: new Date(assignment.due_by),
          },
      },
      update: {
        instructions: assignment.instructions,
        type: assignment.type as AssignmentType,
        created_at: new Date(assignment.created_at ?? Date.now()),
      },
      create: {
        id: assignment.id,
        title: assignment.title,
        due_by: new Date(assignment.due_by),
        instructions: assignment.instructions,
        type: assignment.type as AssignmentType,
        created_at: new Date(assignment.created_at ?? Date.now()),
      },
    })
  )
);

    await Promise.all(
    submissions.map((submission) =>
      prisma.submission.upsert({
        where: { 
          assignment_id_owner_id: {
            assignment_id: submission.assignment_id,
            owner_id: submission.owner_id,
          }
        },
        update: {
          submitted_at: submission.submitted_at,
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
      feedbacks.map((feedback) =>
        prisma.feedback.upsert({
          where: { 
            submission_id_professor_id: {
              submission_id: feedback.submission_id,
              professor_id: feedback.professor_id,
            }
          },
          update: { ...feedback },
          create: { ...feedback },
        })
      )
    );

    await Promise.all(
      grades.map((grade) =>
        prisma.grade.upsert({
          where: { 
            submission_id_student_id: {
              submission_id: grade.submission_id,
              student_id: grade.student_id,
            }
          },
          update: { ...grade },
          create: { ...grade },
        })
      )
    );
    
  


    console.log("✅ Database seeded with users and courses");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
