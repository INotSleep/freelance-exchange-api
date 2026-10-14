import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Chat } from 'orm/entities/freelance/Chat';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['firstProfileLogin', 'secondProfileLogin'];

const relations = ['firstProfile', 'secondProfile', 'messages', 'messages.senderProfile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(Chat);
  try {
    const chat = await repository.findOne({ where: { id } });

    if (!chat) {
      return next(new CustomError(404, 'General', `Chat '${id}' not found.`, ['Chat not found.']));
    }

    repository.merge(chat, pickFields(req.body, fields));
    await repository.save(chat);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Chat successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
