import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { BalanceTopUpRequest } from 'orm/entities/freelance/BalanceTopUpRequest';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = [
  'userLogin',
  'amount',
  'paymentMethod',
  'operationDate',
  'externalTransactionNumber',
  'status',
  'confirmedAt',
];

const relations = ['account'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(BalanceTopUpRequest);
  try {
    const balanceTopUpRequest = repository.create(pickFields(req.body, fields));

    await repository.save(balanceTopUpRequest);
    const created = await repository.findOne({ where: { id: balanceTopUpRequest.id }, relations });
    res.customSuccess(201, 'Balance top-up request successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
