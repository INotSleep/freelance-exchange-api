import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VerificationRequest } from 'orm/entities/freelance/VerificationRequest';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
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

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(VerificationRequest);
  try {
    const verificationRequest = await repository.findOne({ where: { id } });

    if (!verificationRequest) {
      return next(
        new CustomError(404, 'General', `Verification request '${id}' not found.`, ['Verification request not found.']),
      );
    }

    repository.merge(verificationRequest, pickFields(req.body, fields));
    await repository.save(verificationRequest);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Verification request successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
