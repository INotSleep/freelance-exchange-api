import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TaskBid } from 'orm/entities/freelance/TaskBid';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskBids = await getRepository(TaskBid).find({
      relations: ['task', 'executorProfile'],
      order: { submittedAt: 'DESC' },
    });
    res.customSuccess(200, 'List of task bids.', taskBids);
  } catch (err) {
    return next(toCustomError(err));
  }
};
