import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VerificationRequest } from 'orm/entities/freelance/VerificationRequest';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verificationRequests = await getRepository(VerificationRequest).find({
      relations: ['profile', 'reviewedBy'],
      order: { submittedDate: 'DESC' },
    });
    res.customSuccess(200, 'List of verification requests.', verificationRequests);
  } catch (err) {
    return next(toCustomError(err));
  }
};
