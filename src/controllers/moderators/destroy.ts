import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Moderator } from 'orm/entities/freelance/Moderator';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const result = await getRepository(Moderator).delete({ login });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Moderator '${login}' not found.`, ['Moderator not found.']));
    }
    res.customSuccess(200, 'Moderator successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
