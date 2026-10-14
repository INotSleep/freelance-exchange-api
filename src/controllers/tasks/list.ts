import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Task } from 'orm/entities/freelance/Task';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getRepository(Task).find({
      relations: ['customerProfile', 'skills'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of tasks.', tasks);
  } catch (err) {
    return next(toCustomError(err));
  }
};
