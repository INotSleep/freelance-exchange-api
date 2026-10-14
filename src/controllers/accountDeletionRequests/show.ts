import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountDeletionRequest } from 'orm/entities/freelance/AccountDeletionRequest';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['account', 'reviewedBy'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const accountDeletionRequest = await getRepository(AccountDeletionRequest).findOne({ where: { id }, relations });

    if (!accountDeletionRequest) {
      return next(
        new CustomError(404, 'General', `Account deletion request '${id}' not found.`, [
          'Account deletion request not found.',
        ]),
      );
    }
    res.customSuccess(200, 'Account deletion request found.', accountDeletionRequest);
  } catch (err) {
    return next(toCustomError(err));
  }
};
