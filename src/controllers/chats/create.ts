import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Chat } from 'orm/entities/freelance/Chat';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['firstProfileLogin', 'secondProfileLogin'];

const relations = ['firstProfile', 'secondProfile', 'messages', 'messages.senderProfile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Chat);
  try {
    const chat = repository.create(pickFields(req.body, fields));

    await repository.save(chat);
    const created = await repository.findOne({ where: { id: chat.id }, relations });
    res.customSuccess(201, 'Chat successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
