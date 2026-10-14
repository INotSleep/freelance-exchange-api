import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Message } from 'orm/entities/freelance/Message';
import { pickFields } from 'utils/pickFields';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['chatId', 'senderProfileLogin', 'messageText'];

const relations = ['chat', 'senderProfile'];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(Message);
  try {
    const message = repository.create(pickFields(req.body, fields));

    await repository.save(message);
    const created = await repository.findOne({ where: { id: message.id }, relations });
    res.customSuccess(201, 'Message successfully created.', created);
  } catch (err) {
    return next(toCustomError(err));
  }
};
