export const pickFields = (source: Record<string, any> = {}, fields: string[]) => {
  const result: Record<string, any> = {};
  for (const field of fields) {
    if (source[field] !== undefined) {
      result[field] = source[field];
    }
  }
  return result;
};
