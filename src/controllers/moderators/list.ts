import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Moderator } from 'orm/entities/freelance/Moderator';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const moderators = await getRepository(Moderator).find({
      relations: [],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of moderators.', moderators);
  } catch (err) {
    return next(toCustomError(err));
  }
};
