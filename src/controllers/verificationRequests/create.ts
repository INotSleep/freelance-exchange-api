import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VerificationRequest } from 'orm/entities/freelance/VerificationRequest';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = [
  'profileLogin',
  'reviewedByLogin',
  'profileType',
  'verificationKind',
  'reviewedDate',
  'comment',
  'status',
  'birthOrRegistrationDate',
  'name',
  'documentOrRegistrationNumber',
  'country',
];

const relations = ['profile', 'reviewedBy'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(VerificationRequest);
  try {
    const verificationRequest = repository.create(pickFields(req.body, fields));

    await repository.save(verificationRequest);
    const created = await repository.findOne({ where: { id: verificationRequest.id }, relations });
    res.customSuccess(201, 'Verification request successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
