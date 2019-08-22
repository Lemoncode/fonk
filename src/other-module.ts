import { User } from './model';

export const formatUser = (user: User): string => `The user name: ${user.name}`;
