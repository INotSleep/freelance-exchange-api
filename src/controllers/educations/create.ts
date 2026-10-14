import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Education } from 'orm/entities/freelance/Education';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['profileLogin', 'institutionName', 'specialization', 'startDate', 'finishDate', 'description'];

const relations = ['profile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Education);
  try {
    const education = repository.create(pickFields(req.body, fields));

    await repository.save(education);
    const created = await repository.findOne({ where: { id: education.id }, relations });
    res.customSuccess(201, 'Education successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
