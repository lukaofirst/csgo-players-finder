export interface SuccessResponse<T> {
    body: T;
    statusCode: number;
    message?: string;
}
