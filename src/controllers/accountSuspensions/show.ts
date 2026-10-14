import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountSuspension } from 'orm/entities/freelance/AccountSuspension';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['account', 'moderator'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const accountSuspension = await getRepository(AccountSuspension).findOne({ where: { id }, relations });

    if (!accountSuspension) {
      return next(
        new CustomError(404, 'General', `Account suspension '${id}' not found.`, ['Account suspension not found.']),
      );
    }
    res.customSuccess(200, 'Account suspension found.', accountSuspension);
  } catch (err) {
    return next(toCustomError(err));
  }
};
