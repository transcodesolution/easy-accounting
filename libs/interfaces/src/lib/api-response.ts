export interface IPaginationState {
    page: number;
    limit: number;
    total: number;
}

export interface IApiResponse<T = object | object[]> {
    status: number;
    message: string;
    data: T;
    error?: {
        message?: string;
        stack?: string;
    };
    state?: IPaginationState;
}