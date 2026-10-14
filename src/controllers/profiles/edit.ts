import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Profile } from 'orm/entities/freelance/Profile';
import { Skill } from 'orm/entities/freelance/Skill';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['altName', 'name', 'type', 'description', 'country', 'status'];

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

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.params;

  const repository = getRepository(Profile);
  try {
    const profile = await repository.findOne({ where: { userLogin: login } });

    if (!profile) {
      return next(new CustomError(404, 'General', `Profile '${login}' not found.`, ['Profile not found.']));
    }

    repository.merge(profile, pickFields(req.body, fields));
    if (Array.isArray(req.body.skills)) {
      profile.skills = req.body.skills.map((name: string) => ({ name } as Skill));
    }
    await repository.save(profile);

    const updated = await repository.findOne({ where: { userLogin: login }, relations });
    res.customSuccess(200, 'Profile successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
