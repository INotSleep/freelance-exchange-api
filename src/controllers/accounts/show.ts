import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Account } from 'orm/entities/freelance/Account';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['profile', 'topUpRequests', 'withdrawalRequests', 'deletionRequests', 'suspensions'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const account = await getRepository(Account).findOne({ where: { login }, relations });

    if (!account) {
      return next(new CustomError(404, 'General', `Account '${login}' not found.`, ['Account not found.']));
    }
    res.customSuccess(200, 'Account found.', account);
  } catch (err) {
    return next(toCustomError(err));
  }
};
