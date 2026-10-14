import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Profile } from 'orm/entities/freelance/Profile';
import { Skill } from 'orm/entities/freelance/Skill';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['userLogin', 'altName', 'name', 'type', 'description', 'country', 'status'];

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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Profile);
  try {
    const profile = repository.create(pickFields(req.body, fields));
    if (Array.isArray(req.body.skills)) {
      profile.skills = req.body.skills.map((name: string) => ({ name } as Skill));
    }

    const existing = await repository.findOne({ where: { userLogin: profile.userLogin } });
    if (existing) {
      return next(new CustomError(409, 'General', 'Profile already exists.', ['Profile already exists.']));
    }

    await repository.save(profile);
    const created = await repository.findOne({ where: { userLogin: profile.userLogin }, relations });
    res.customSuccess(201, 'Profile successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
