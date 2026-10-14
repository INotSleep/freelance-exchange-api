import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountDeletionRequest } from 'orm/entities/freelance/AccountDeletionRequest';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['userLogin', 'reason', 'status', 'reviewedAt', 'reviewedByLogin', 'reviewComment'];

const relations = ['account', 'reviewedBy'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(AccountDeletionRequest);
  try {
    const accountDeletionRequest = repository.create(pickFields(req.body, fields));

    await repository.save(accountDeletionRequest);
    const created = await repository.findOne({ where: { id: accountDeletionRequest.id }, relations });
    res.customSuccess(201, 'Account deletion request successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
