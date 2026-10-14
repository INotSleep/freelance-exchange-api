import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { WithdrawalRequest } from 'orm/entities/freelance/WithdrawalRequest';
import { pickFields } from 'utils/pickFields';
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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(WithdrawalRequest);
  try {
    const withdrawalRequest = repository.create(pickFields(req.body, fields));

    await repository.save(withdrawalRequest);
    const created = await repository.findOne({ where: { id: withdrawalRequest.id }, relations });
    res.customSuccess(201, 'Withdrawal request successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
