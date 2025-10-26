export interface CreateAssignmentDto {
  title: string;
  due_by: string;
  instructions: string;
  type: 'QUIZ' | 'UPLOAD' | 'PEER';
  course_id: string; // single course instead of array
}

export interface UpdateAssignmentDto {
  title?: string;
  due_by?: string;
  instructions?: string;
  type?: 'QUIZ' | 'UPLOAD' | 'PEER';
  course_id?: string; // single optional course_id
}

export interface DeleteAssignmentDto {
  id: string;
}
