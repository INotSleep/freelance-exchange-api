import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Account } from 'orm/entities/freelance/Account';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['login', 'email', 'status', 'passwordChangedAt', 'balance'];

const relations = ['profile', 'topUpRequests', 'withdrawalRequests', 'deletionRequests', 'suspensions'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Account);
  try {
    const account = repository.create(pickFields(req.body, fields));

    const existing = await repository.findOne({ where: { login: account.login } });
    if (existing) {
      return next(new CustomError(409, 'General', 'Account already exists.', ['Account already exists.']));
    }

    await repository.save(account);
    const created = await repository.findOne({ where: { login: account.login }, relations });
    res.customSuccess(201, 'Account successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
