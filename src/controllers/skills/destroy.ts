import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Skill } from 'orm/entities/freelance/Skill';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  try {
    const result = await getRepository(Skill).delete({ name });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Skill '${name}' not found.`, ['Skill not found.']));
    }
    res.customSuccess(200, 'Skill successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
