import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['profiles', 'tasks'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  try {
    const skill = await getRepository(Skill).findOne({ where: { name }, relations });

    if (!skill) {
      return next(new CustomError(404, 'General', `Skill '${name}' not found.`, ['Skill not found.']));
    }
    res.customSuccess(200, 'Skill found.', skill);
  } catch (err) {
    return next(toCustomError(err));
  }
};
