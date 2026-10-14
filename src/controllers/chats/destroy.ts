import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Chat } from 'orm/entities/freelance/Chat';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(Chat).delete({ id });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Chat '${id}' not found.`, ['Chat not found.']));
    }
    res.customSuccess(200, 'Chat successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
