import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Education } from 'orm/entities/freelance/Education';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['profileLogin', 'institutionName', 'specialization', 'startDate', 'finishDate', 'description'];

const relations = ['profile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(Education);
  try {
    const education = await repository.findOne({ where: { id } });

    if (!education) {
      return next(new CustomError(404, 'General', `Education '${id}' not found.`, ['Education not found.']));
    }

    repository.merge(education, pickFields(req.body, fields));
    await repository.save(education);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Education successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
