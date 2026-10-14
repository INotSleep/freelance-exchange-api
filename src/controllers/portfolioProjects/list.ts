import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PortfolioProject } from 'orm/entities/freelance/PortfolioProject';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const portfolioProjects = await getRepository(PortfolioProject).find({
      relations: ['profile'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of portfolio projects.', portfolioProjects);
  } catch (err) {
    return next(toCustomError(err));
  }
};
