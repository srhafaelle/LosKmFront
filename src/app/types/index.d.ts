export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    roles: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthUser = User & {
    token: string;
};

export type Auth = {
    token: string;
};

export type ErrorMessages = Record<string, string | ((error: any) => string)>;

export type ApiResponse<T> = {
    data: T;
    meta: {
        timestamp: string;
        executionTime: string;
        path: string;
        method: string;
    };
};

export * from './layouts';
export * from './pages';
