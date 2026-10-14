import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Account } from 'orm/entities/freelance/Account';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const result = await getRepository(Account).delete({ login });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Account '${login}' not found.`, ['Account not found.']));
    }
    res.customSuccess(200, 'Account successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
