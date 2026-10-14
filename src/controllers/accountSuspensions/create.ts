import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountSuspension } from 'orm/entities/freelance/AccountSuspension';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['userLogin', 'moderatorLogin', 'reason', 'startAt', 'endAt'];

const relations = ['account', 'moderator'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(AccountSuspension);
  try {
    const accountSuspension = repository.create(pickFields(req.body, fields));

    await repository.save(accountSuspension);
    const created = await repository.findOne({ where: { id: accountSuspension.id }, relations });
    res.customSuccess(201, 'Account suspension successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
