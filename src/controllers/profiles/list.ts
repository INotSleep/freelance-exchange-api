import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Profile } from 'orm/entities/freelance/Profile';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await getRepository(Profile).find({
      relations: ['account', 'skills'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of profiles.', profiles);
  } catch (err) {
    return next(toCustomError(err));
  }
};
