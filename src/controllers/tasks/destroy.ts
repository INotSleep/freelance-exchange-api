import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Task } from 'orm/entities/freelance/Task';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(Task).delete({ id });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Task '${id}' not found.`, ['Task not found.']));
    }
    res.customSuccess(200, 'Task successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
