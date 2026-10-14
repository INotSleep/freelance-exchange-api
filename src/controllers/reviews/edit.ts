import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Review } from 'orm/entities/freelance/Review';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['recipientProfileLogin', 'authorProfileLogin', 'taskId', 'rating', 'reviewText'];

const relations = ['task', 'authorProfile', 'recipientProfile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(Review);
  try {
    const review = await repository.findOne({ where: { id } });

    if (!review) {
      return next(new CustomError(404, 'General', `Review '${id}' not found.`, ['Review not found.']));
    }

    repository.merge(review, pickFields(req.body, fields));
    await repository.save(review);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Review successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
