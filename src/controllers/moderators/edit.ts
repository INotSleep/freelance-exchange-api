import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Moderator } from 'orm/entities/freelance/Moderator';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['name'];

const relations = ['reviewedVerificationRequests', 'reviewedDeletionRequests', 'suspensions'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  const repository = getRepository(Moderator);
  try {
    const moderator = await repository.findOne({ where: { login } });

    if (!moderator) {
      return next(new CustomError(404, 'General', `Moderator '${login}' not found.`, ['Moderator not found.']));
    }

    repository.merge(moderator, pickFields(req.body, fields));
    await repository.save(moderator);

    const updated = await repository.findOne({ where: { login }, relations });
    res.customSuccess(200, 'Moderator successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
