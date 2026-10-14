import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['description'];

const relations = ['profiles', 'tasks'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  const repository = getRepository(Skill);
  try {
    const skill = await repository.findOne({ where: { name } });

    if (!skill) {
      return next(new CustomError(404, 'General', `Skill '${name}' not found.`, ['Skill not found.']));
    }

    repository.merge(skill, pickFields(req.body, fields));
    await repository.save(skill);

    const updated = await repository.findOne({ where: { name }, relations });
    res.customSuccess(200, 'Skill successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
