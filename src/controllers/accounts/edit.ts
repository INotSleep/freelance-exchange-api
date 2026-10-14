import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Account } from 'orm/entities/freelance/Account';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['email', 'status', 'passwordChangedAt', 'balance'];

const relations = ['profile', 'topUpRequests', 'withdrawalRequests', 'deletionRequests', 'suspensions'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  const repository = getRepository(Account);
  try {
    const account = await repository.findOne({ where: { login } });

    if (!account) {
      return next(new CustomError(404, 'General', `Account '${login}' not found.`, ['Account not found.']));
    }

    repository.merge(account, pickFields(req.body, fields));
    await repository.save(account);

    const updated = await repository.findOne({ where: { login }, relations });
    res.customSuccess(200, 'Account successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
