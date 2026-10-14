import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountDeletionRequest } from 'orm/entities/freelance/AccountDeletionRequest';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountDeletionRequests = await getRepository(AccountDeletionRequest).find({
      relations: ['account', 'reviewedBy'],
      order: { submittedAt: 'DESC' },
    });
    res.customSuccess(200, 'List of account deletion requests.', accountDeletionRequests);
  } catch (err) {
    return next(toCustomError(err));
  }
};
