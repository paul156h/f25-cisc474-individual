export interface CreateEnrollmentDto {
  user_id: string;
  course_id: string;
  user_role: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
}

export interface UpdateEnrollmentDto {
  user_role?: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
}

export interface DeleteEnrollmentDto {
  id: string;
}
