import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Profile } from 'orm/entities/freelance/Profile';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const result = await getRepository(Profile).delete({ userLogin: login });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Profile '${login}' not found.`, ['Profile not found.']));
    }
    res.customSuccess(200, 'Profile successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
