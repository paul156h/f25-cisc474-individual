export interface CreateUserDto {
  name?: string;
  email?: string;
  role: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
}

export interface DeleteUserDto {
  id: string;
}
