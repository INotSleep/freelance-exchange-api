import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Account } from 'orm/entities/freelance/Account';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await getRepository(Account).find({
      relations: ['profile'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of accounts.', accounts);
  } catch (err) {
    return next(toCustomError(err));
  }
};
