import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { CourseModule } from './Course/course.module';
import { EnrollmentModule } from './Enrollment/enrollment.module';
import { FeedbackModule } from './Feedback/feedback.module';
import { GradeModule } from './Grade/grade.module';
import { UserModule } from './User/user.module';
import { SubmissionModule } from './Submission/submission.module';
import { AssignmentModule } from './Assignment/assignment.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [LinksModule, CourseModule, EnrollmentModule, FeedbackModule, GradeModule, UserModule, SubmissionModule, AssignmentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
