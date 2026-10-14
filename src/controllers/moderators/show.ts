import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Moderator } from 'orm/entities/freelance/Moderator';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['reviewedVerificationRequests', 'reviewedDeletionRequests', 'suspensions'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const moderator = await getRepository(Moderator).findOne({ where: { login }, relations });

    if (!moderator) {
      return next(new CustomError(404, 'General', `Moderator '${login}' not found.`, ['Moderator not found.']));
    }
    res.customSuccess(200, 'Moderator found.', moderator);
  } catch (err) {
    return next(toCustomError(err));
  }
};
