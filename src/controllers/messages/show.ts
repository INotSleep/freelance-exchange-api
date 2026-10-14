import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Message } from 'orm/entities/freelance/Message';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['chat', 'senderProfile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const message = await getRepository(Message).findOne({ where: { id }, relations });

    if (!message) {
      return next(new CustomError(404, 'General', `Message '${id}' not found.`, ['Message not found.']));
    }
    res.customSuccess(200, 'Message found.', message);
  } catch (err) {
    return next(toCustomError(err));
  }
};
