import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountDeletionRequest } from 'orm/entities/freelance/AccountDeletionRequest';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['userLogin', 'reason', 'status', 'reviewedAt', 'reviewedByLogin', 'reviewComment'];

const relations = ['account', 'reviewedBy'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(AccountDeletionRequest);
  try {
    const accountDeletionRequest = await repository.findOne({ where: { id } });

    if (!accountDeletionRequest) {
      return next(
        new CustomError(404, 'General', `Account deletion request '${id}' not found.`, [
          'Account deletion request not found.',
        ]),
      );
    }

    repository.merge(accountDeletionRequest, pickFields(req.body, fields));
    await repository.save(accountDeletionRequest);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Account deletion request successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
