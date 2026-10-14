import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Message } from 'orm/entities/freelance/Message';
import { pickFields } from 'utils/pickFields';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { toCustomError } from 'utils/response/custom-error/toCustomError';

const fields = ['chatId', 'senderProfileLogin', 'messageText'];

const relations = ['chat', 'senderProfile'];

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const repository = getRepository(Message);
  try {
    const message = await repository.findOne({ where: { id } });

    if (!message) {
      return next(new CustomError(404, 'General', `Message '${id}' not found.`, ['Message not found.']));
    }

    repository.merge(message, pickFields(req.body, fields));
    await repository.save(message);

    const updated = await repository.findOne({ where: { id }, relations });
    res.customSuccess(200, 'Message successfully updated.', updated);
  } catch (err) {
    return next(toCustomError(err));
  }
};
