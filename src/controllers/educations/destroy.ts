import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Education } from 'orm/entities/freelance/Education';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(Education).delete({ id });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Education '${id}' not found.`, ['Education not found.']));
    }
    res.customSuccess(200, 'Education successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
