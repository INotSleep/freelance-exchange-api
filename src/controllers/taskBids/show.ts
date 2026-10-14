import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TaskBid } from 'orm/entities/freelance/TaskBid';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['task', 'task.customerProfile', 'executorProfile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId, executorProfileLogin } = req.params;

  try {
    const taskBid = await getRepository(TaskBid).findOne({ where: { taskId, executorProfileLogin }, relations });

    if (!taskBid) {
      return next(
        new CustomError(404, 'General', `Task bid '${taskId}/${executorProfileLogin}' not found.`, [
          'Task bid not found.',
        ]),
      );
    }
    res.customSuccess(200, 'Task bid found.', taskBid);
  } catch (err) {
    return next(toCustomError(err));
  }
};
