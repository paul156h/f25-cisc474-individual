export interface CreateGradeDto {
  submission_id: string;
  score: number;
  feedback: string;
  grader_id: string;
  student_id: string;
}

export interface UpdateGradeDto {
  score?: number;
  feedback?: string;
}

export interface DeleteGradeDto {
  id: string;
}
