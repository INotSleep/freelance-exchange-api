import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Education } from 'orm/entities/freelance/Education';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const educations = await getRepository(Education).find({
      relations: ['profile'],
      order: { startDate: 'DESC' },
    });
    res.customSuccess(200, 'List of educations.', educations);
  } catch (err) {
    return next(toCustomError(err));
  }
};
