import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await getRepository(Skill).find({
      relations: [],
      order: { name: 'ASC' },
    });
    res.customSuccess(200, 'List of skills.', skills);
  } catch (err) {
    return next(toCustomError(err));
  }
};
