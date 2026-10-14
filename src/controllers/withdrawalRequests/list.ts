import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { WithdrawalRequest } from 'orm/entities/freelance/WithdrawalRequest';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdrawalRequests = await getRepository(WithdrawalRequest).find({
      relations: ['account'],
      order: { submittedAt: 'DESC' },
    });
    res.customSuccess(200, 'List of withdrawal requests.', withdrawalRequests);
  } catch (err) {
    return next(toCustomError(err));
  }
};
