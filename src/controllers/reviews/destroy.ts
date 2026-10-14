import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Review } from 'orm/entities/freelance/Review';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(Review).delete({ id });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Review '${id}' not found.`, ['Review not found.']));
    }
    res.customSuccess(200, 'Review successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
