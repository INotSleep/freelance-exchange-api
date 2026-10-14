import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Chat } from 'orm/entities/freelance/Chat';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const relations = ['firstProfile', 'secondProfile', 'messages', 'messages.senderProfile'];

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const chat = await getRepository(Chat).findOne({ where: { id }, relations });

    if (!chat) {
      return next(new CustomError(404, 'General', `Chat '${id}' not found.`, ['Chat not found.']));
    }
    res.customSuccess(200, 'Chat found.', chat);
  } catch (err) {
    return next(toCustomError(err));
  }
};
