export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    roles: Array<string>;
    createdAt: Date;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthUser = User & {
    token: string;
};

export type ErrorMessages = Record<string, string | ((error: any) => string)>;

export * from './layouts';
export * from './pages';
