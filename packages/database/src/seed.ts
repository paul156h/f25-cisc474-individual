import { prisma } from "./client";

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
          where: { id: user.id! },
          update: { ...user },
          create: { ...user },
        })
      )
    );

    await Promise.all(
      courses.map((course) =>
        prisma.course.upsert({
          where: { id: course.id! },
          update: { ...course },
          create: { ...course },
        })
      )
    );

    await Promise.all(
      enrollments.map((enrollment) =>
        prisma.enrollment.upsert({
          where: { id: enrollment.id! },
          update: { ...enrollment },
          create: { ...enrollment },
        })
      )
    );

    await Promise.all(
      feedbacks.map((feedback) =>
        prisma.feedback.upsert({
          where: { id: feedback.id! },
          update: { ...feedback },
          create: { ...feedback },
        })
      )
    );

    await Promise.all(
      grades.map((grades) =>
        prisma.grades.upsert({
          where: { id: grades.id! },
          update: { ...grades },
          create: { ...grades },
        })
      )
    );
    
    await Promise.all(
      submissions.map((submissions) =>
        prisma.submissions.upsert({
          where: { id: submissions.id! },
          update: { ...submissions },
          create: { ...submissions },
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
