import { QueryFailedError } from 'typeorm';

import { CustomError } from './CustomError';

const PG_ERRORS: Record<string, [number, string]> = {
  '23503': [400, 'Related record does not exist.'],
  '23505': [409, 'Record with the same unique value already exists.'],
  '23502': [400, 'Required field is missing.'],
  '22P02': [400, 'Invalid value format.'],
  '22001': [400, 'Value is too long.'],
  '22007': [400, 'Invalid date format.'],
  '22008': [400, 'Date value is out of range.'],
};

export const toCustomError = (err: any) => {
  if (err instanceof QueryFailedError) {
    const { code, detail } = err as any;
    const known = PG_ERRORS[code];
    if (known) {
      return new CustomError(known[0], 'Raw', known[1], [detail || err.message], err);
    }
  }
  return new CustomError(400, 'Raw', 'Error', null, err);
};
