export interface CreateSubmissionDto {
  assignment_id: string;
  content: string;
  type: 'QUIZ' | 'UPLOAD' | 'PEER';
  owner_id: string;
}

export interface UpdateSubmissionDto {
  content?: string;
  type?: 'QUIZ' | 'UPLOAD' | 'PEER';
}

export interface DeleteSubmissionDto {
  id: string;
}
