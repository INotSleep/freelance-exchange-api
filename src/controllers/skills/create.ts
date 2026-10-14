import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['name', 'description'];

const relations = ['profiles', 'tasks'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Skill);
  try {
    const skill = repository.create(pickFields(req.body, fields));

    const existing = await repository.findOne({ where: { name: skill.name } });
    if (existing) {
      return next(new CustomError(409, 'General', 'Skill already exists.', ['Skill already exists.']));
    }

    await repository.save(skill);
    const created = await repository.findOne({ where: { name: skill.name }, relations });
    res.customSuccess(201, 'Skill successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
