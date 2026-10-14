import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { BalanceTopUpRequest } from 'orm/entities/freelance/BalanceTopUpRequest';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['account'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const balanceTopUpRequest = await getRepository(BalanceTopUpRequest).findOne({ where: { id }, relations });

    if (!balanceTopUpRequest) {
      return next(
        new CustomError(404, 'General', `Balance top-up request '${id}' not found.`, [
          'Balance top-up request not found.',
        ]),
      );
    }
    res.customSuccess(200, 'Balance top-up request found.', balanceTopUpRequest);
  } catch (err) {
    return next(toCustomError(err));
  }
};
