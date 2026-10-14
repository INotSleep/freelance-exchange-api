import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Review } from 'orm/entities/freelance/Review';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['recipientProfileLogin', 'authorProfileLogin', 'taskId', 'rating', 'reviewText'];

const relations = ['task', 'authorProfile', 'recipientProfile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Review);
  try {
    const review = repository.create(pickFields(req.body, fields));

    await repository.save(review);
    const created = await repository.findOne({ where: { id: review.id }, relations });
    res.customSuccess(201, 'Review successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
