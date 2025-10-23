export interface CreateFeedbackDto {
  submission_id: string;
  content: string;
  professor_id: string;
  student_id: string;
}

export interface UpdateFeedbackDto {
  content?: string;
}

export interface DeleteFeedbackDto {
  id: string;
}
