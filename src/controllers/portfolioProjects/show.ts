import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PortfolioProject } from 'orm/entities/freelance/PortfolioProject';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['profile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const portfolioProject = await getRepository(PortfolioProject).findOne({ where: { id }, relations });

    if (!portfolioProject) {
      return next(
        new CustomError(404, 'General', `Portfolio project '${id}' not found.`, ['Portfolio project not found.']),
      );
    }
    res.customSuccess(200, 'Portfolio project found.', portfolioProject);
  } catch (err) {
    return next(toCustomError(err));
  }
};
