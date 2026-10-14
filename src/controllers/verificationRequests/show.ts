import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VerificationRequest } from 'orm/entities/freelance/VerificationRequest';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['profile', 'reviewedBy'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const verificationRequest = await getRepository(VerificationRequest).findOne({ where: { id }, relations });

    if (!verificationRequest) {
      return next(
        new CustomError(404, 'General', `Verification request '${id}' not found.`, ['Verification request not found.']),
      );
    }
    res.customSuccess(200, 'Verification request found.', verificationRequest);
  } catch (err) {
    return next(toCustomError(err));
  }
};
