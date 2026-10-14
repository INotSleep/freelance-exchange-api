import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PortfolioProject } from 'orm/entities/freelance/PortfolioProject';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['profileLogin', 'name', 'description', 'projectUrl'];

const relations = ['profile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(PortfolioProject);
  try {
    const portfolioProject = await repository.findOne({ where: { id } });

    if (!portfolioProject) {
      return next(
        new CustomError(404, 'General', `Portfolio project '${id}' not found.`, ['Portfolio project not found.']),
      );
    }

    repository.merge(portfolioProject, pickFields(req.body, fields));
    await repository.save(portfolioProject);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Portfolio project successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
