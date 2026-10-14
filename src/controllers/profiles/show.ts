import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Profile } from 'orm/entities/freelance/Profile';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = [
  'account',
  'skills',
  'educations',
  'portfolioProjects',
  'verificationRequests',
  'tasks',
  'bids',
  'bids.task',
  'receivedReviews',
  'receivedReviews.authorProfile',
];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  try {
    const profile = await getRepository(Profile).findOne({ where: { userLogin: login }, relations });

    if (!profile) {
      return next(new CustomError(404, 'General', `Profile '${login}' not found.`, ['Profile not found.']));
    }
    res.customSuccess(200, 'Profile found.', profile);
  } catch (err) {
    return next(toCustomError(err));
  }
};
