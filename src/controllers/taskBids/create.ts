import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TaskBid } from 'orm/entities/freelance/TaskBid';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['taskId', 'executorProfileLogin', 'proposalText', 'proposedAmount', 'status', 'decidedAt'];

const relations = ['task', 'task.customerProfile', 'executorProfile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(TaskBid);
  try {
    const taskBid = repository.create(pickFields(req.body, fields));

    const existing = await repository.findOne({
      where: { taskId: taskBid.taskId, executorProfileLogin: taskBid.executorProfileLogin },
    });
    if (existing) {
      return next(new CustomError(409, 'General', 'Task bid already exists.', ['Task bid already exists.']));
    }

    await repository.save(taskBid);
    const created = await repository.findOne({
      where: { taskId: taskBid.taskId, executorProfileLogin: taskBid.executorProfileLogin },
      relations,
    });
    res.customSuccess(201, 'Task bid successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
