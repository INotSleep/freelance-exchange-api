import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { WithdrawalRequest } from 'orm/entities/freelance/WithdrawalRequest';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(WithdrawalRequest).delete({ id });

    if (!result.affected) {
      return next(
        new CustomError(404, 'General', `Withdrawal request '${id}' not found.`, ['Withdrawal request not found.']),
      );
    }
    res.customSuccess(200, 'Withdrawal request successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
