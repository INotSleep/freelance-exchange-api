import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PortfolioProject } from 'orm/entities/freelance/PortfolioProject';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(PortfolioProject).delete({ id });

    if (!result.affected) {
      return next(
        new CustomError(404, 'General', `Portfolio project '${id}' not found.`, ['Portfolio project not found.']),
      );
    }
    res.customSuccess(200, 'Portfolio project successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
