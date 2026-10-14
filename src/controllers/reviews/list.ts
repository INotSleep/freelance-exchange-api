import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Review } from 'orm/entities/freelance/Review';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await getRepository(Review).find({
      relations: ['task', 'authorProfile', 'recipientProfile'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of reviews.', reviews);
  } catch (err) {
    return next(toCustomError(err));
  }
};
