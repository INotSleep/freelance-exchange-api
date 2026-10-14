import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TaskBid } from 'orm/entities/freelance/TaskBid';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['proposalText', 'proposedAmount', 'status', 'decidedAt'];

const relations = ['task', 'task.customerProfile', 'executorProfile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId, executorProfileLogin } = req.params;

  const repository = getRepository(TaskBid);
  try {
    const taskBid = await repository.findOne({ where: { taskId, executorProfileLogin } });

    if (!taskBid) {
      return next(
        new CustomError(404, 'General', `Task bid '${taskId}/${executorProfileLogin}' not found.`, [
          'Task bid not found.',
        ]),
      );
    }

    repository.merge(taskBid, pickFields(req.body, fields));
    await repository.save(taskBid);

    const updated = await repository.findOne({ where: { taskId, executorProfileLogin }, relations });
    res.customSuccess(200, 'Task bid successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
