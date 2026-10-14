import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Education } from 'orm/entities/freelance/Education';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['profile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const education = await getRepository(Education).findOne({ where: { id }, relations });

    if (!education) {
      return next(new CustomError(404, 'General', `Education '${id}' not found.`, ['Education not found.']));
    }
    res.customSuccess(200, 'Education found.', education);
  } catch (err) {
    return next(toCustomError(err));
  }
};
