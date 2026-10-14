import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { BalanceTopUpRequest } from 'orm/entities/freelance/BalanceTopUpRequest';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
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

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(BalanceTopUpRequest);
  try {
    const balanceTopUpRequest = await repository.findOne({ where: { id } });

    if (!balanceTopUpRequest) {
      return next(
        new CustomError(404, 'General', `Balance top-up request '${id}' not found.`, [
          'Balance top-up request not found.',
        ]),
      );
    }

    repository.merge(balanceTopUpRequest, pickFields(req.body, fields));
    await repository.save(balanceTopUpRequest);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Balance top-up request successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
