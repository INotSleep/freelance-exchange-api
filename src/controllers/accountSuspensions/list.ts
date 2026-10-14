import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountSuspension } from 'orm/entities/freelance/AccountSuspension';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountSuspensions = await getRepository(AccountSuspension).find({
      relations: ['account', 'moderator'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of account suspensions.', accountSuspensions);
  } catch (err) {
    return next(toCustomError(err));
  }
};
