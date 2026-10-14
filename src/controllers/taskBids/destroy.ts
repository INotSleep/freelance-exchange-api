import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TaskBid } from 'orm/entities/freelance/TaskBid';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId, executorProfileLogin } = req.params;

  try {
    const result = await getRepository(TaskBid).delete({ taskId, executorProfileLogin });

    if (!result.affected) {
      return next(
        new CustomError(404, 'General', `Task bid '${taskId}/${executorProfileLogin}' not found.`, [
          'Task bid not found.',
        ]),
      );
    }
    res.customSuccess(200, 'Task bid successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
