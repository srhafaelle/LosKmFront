import { User } from '..';

export type UserPayload = Omit<User, 'id'> & {
    password: string;
};
