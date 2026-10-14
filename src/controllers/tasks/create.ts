import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { Task } from 'orm/entities/freelance/Task';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['customerProfileLogin', 'title', 'description', 'budget', 'deadline', 'status', 'completedAt'];

const relations = ['customerProfile', 'skills', 'bids', 'bids.executorProfile', 'reviews', 'reviews.authorProfile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Task);
  try {
    const task = repository.create(pickFields(req.body, fields));
    if (Array.isArray(req.body.skills)) {
      task.skills = req.body.skills.map((name: string) => ({ name } as Skill));
    }

    await repository.save(task);
    const created = await repository.findOne({ where: { id: task.id }, relations });
    res.customSuccess(201, 'Task successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
