import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VerificationRequest } from 'orm/entities/freelance/VerificationRequest';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(VerificationRequest).delete({ id });

    if (!result.affected) {
      return next(
        new CustomError(404, 'General', `Verification request '${id}' not found.`, ['Verification request not found.']),
      );
    }
    res.customSuccess(200, 'Verification request successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
