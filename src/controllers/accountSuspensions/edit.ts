import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AccountSuspension } from 'orm/entities/freelance/AccountSuspension';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['userLogin', 'moderatorLogin', 'reason', 'startAt', 'endAt'];

const relations = ['account', 'moderator'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(AccountSuspension);
  try {
    const accountSuspension = await repository.findOne({ where: { id } });

    if (!accountSuspension) {
      return next(
        new CustomError(404, 'General', `Account suspension '${id}' not found.`, ['Account suspension not found.']),
      );
    }

    repository.merge(accountSuspension, pickFields(req.body, fields));
    await repository.save(accountSuspension);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Account suspension successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
