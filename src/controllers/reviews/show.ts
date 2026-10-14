import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Review } from 'orm/entities/freelance/Review';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['task', 'authorProfile', 'recipientProfile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const review = await getRepository(Review).findOne({ where: { id }, relations });

    if (!review) {
      return next(new CustomError(404, 'General', `Review '${id}' not found.`, ['Review not found.']));
    }
    res.customSuccess(200, 'Review found.', review);
  } catch (err) {
    return next(toCustomError(err));
  }
};
