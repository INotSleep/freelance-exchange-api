import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PortfolioProject } from 'orm/entities/freelance/PortfolioProject';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['profileLogin', 'name', 'description', 'projectUrl'];

const relations = ['profile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(PortfolioProject);
  try {
    const portfolioProject = repository.create(pickFields(req.body, fields));

    await repository.save(portfolioProject);
    const created = await repository.findOne({ where: { id: portfolioProject.id }, relations });
    res.customSuccess(201, 'Portfolio project successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
