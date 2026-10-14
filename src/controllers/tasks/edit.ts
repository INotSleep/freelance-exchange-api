import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { Task } from 'orm/entities/freelance/Task';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['customerProfileLogin', 'title', 'description', 'budget', 'deadline', 'status', 'completedAt'];

const relations = ['customerProfile', 'skills', 'bids', 'bids.executorProfile', 'reviews', 'reviews.authorProfile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(Task);
  try {
    const task = await repository.findOne({ where: { id } });

    if (!task) {
      return next(new CustomError(404, 'General', `Task '${id}' not found.`, ['Task not found.']));
    }

    repository.merge(task, pickFields(req.body, fields));
    if (Array.isArray(req.body.skills)) {
      task.skills = req.body.skills.map((name: string) => ({ name } as Skill));
    }
    await repository.save(task);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Task successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
