import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Message } from 'orm/entities/freelance/Message';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await getRepository(Message).find({
      relations: ['chat', 'senderProfile'],
      order: { sentAt: 'DESC' },
    });
    res.customSuccess(200, 'List of messages.', messages);
  } catch (err) {
    return next(toCustomError(err));
  }
};
