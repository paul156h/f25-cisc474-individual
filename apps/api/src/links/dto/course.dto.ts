export interface CreateCourseDto {
    title: string;
    description: string;
}

export interface UpdateCourseDto {
    title?: string;
    description?: string;
}

export interface DeleteCourseDto {
    id: string;
}
