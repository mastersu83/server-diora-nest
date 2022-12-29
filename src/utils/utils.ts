import { IUser } from '../users/entities/user.entity';

export const utils = {
  sanitizeUser(user: IUser) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  },
};
