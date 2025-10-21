export interface CreateCourseDto {
    title: string;
    description: string;
    owner_id: string;
}

export interface UpdateCourseDto {
    id: string;
    title?: string;
    description?: string;
}

export interface DeleteCourseDto {
    id: string;
}
