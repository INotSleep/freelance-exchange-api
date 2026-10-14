import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Moderator } from 'orm/entities/freelance/Moderator';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['login', 'name'];

const relations = ['reviewedVerificationRequests', 'reviewedDeletionRequests', 'suspensions'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Moderator);
  try {
    const moderator = repository.create(pickFields(req.body, fields));

    const existing = await repository.findOne({ where: { login: moderator.login } });
    if (existing) {
      return next(new CustomError(409, 'General', 'Moderator already exists.', ['Moderator already exists.']));
    }

    await repository.save(moderator);
    const created = await repository.findOne({ where: { login: moderator.login }, relations });
    res.customSuccess(201, 'Moderator successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
