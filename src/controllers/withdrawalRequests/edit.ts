import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { WithdrawalRequest } from 'orm/entities/freelance/WithdrawalRequest';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = [
  'userLogin',
  'amount',
  'paymentMethod',
  'paymentDetails',
  'externalTransactionNumber',
  'status',
  'confirmedAt',
];

const relations = ['account'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(WithdrawalRequest);
  try {
    const withdrawalRequest = await repository.findOne({ where: { id } });

    if (!withdrawalRequest) {
      return next(
        new CustomError(404, 'General', `Withdrawal request '${id}' not found.`, ['Withdrawal request not found.']),
      );
    }

    repository.merge(withdrawalRequest, pickFields(req.body, fields));
    await repository.save(withdrawalRequest);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Withdrawal request successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
