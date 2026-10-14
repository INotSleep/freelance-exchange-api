import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Message } from 'orm/entities/freelance/Message';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await getRepository(Message).delete({ id });

    if (!result.affected) {
      return next(new CustomError(404, 'General', `Message '${id}' not found.`, ['Message not found.']));
    }
    res.customSuccess(200, 'Message successfully deleted.');
  } catch (err) {
    return next(toCustomError(err));
  }
};
