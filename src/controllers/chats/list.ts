import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Chat } from 'orm/entities/freelance/Chat';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chats = await getRepository(Chat).find({
      relations: ['firstProfile', 'secondProfile'],
      order: { createdAt: 'DESC' },
    });
    res.customSuccess(200, 'List of chats.', chats);
  } catch (err) {
    return next(toCustomError(err));
  }
};
