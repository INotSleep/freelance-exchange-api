import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { BalanceTopUpRequest } from 'orm/entities/freelance/BalanceTopUpRequest';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const balanceTopUpRequests = await getRepository(BalanceTopUpRequest).find({
      relations: ['account'],
      order: { submittedAt: 'DESC' },
    });
    res.customSuccess(200, 'List of balance top-up requests.', balanceTopUpRequests);
  } catch (err) {
    return next(toCustomError(err));
  }
};
