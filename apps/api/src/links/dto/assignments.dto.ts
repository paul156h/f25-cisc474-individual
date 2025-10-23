export interface CreateAssignmentDto {
  title: string;
  due_by: string;
  instructions: string;
  type: 'QUIZ' | 'UPLOAD' | 'PEER';
  course_ids?: string[]; 
}

export interface UpdateAssignmentDto {
  title?: string;
  due_by?: string;
  instructions?: string;
  type?: 'QUIZ' | 'UPLOAD' | 'PEER';
  course_ids?: string[];
}

export interface DeleteAssignmentDto {
  id: string;
}
