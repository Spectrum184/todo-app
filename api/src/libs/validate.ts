import { ICat, SexEnum } from 'interfaces/cat';

export const catValidate = (cat: ICat): Array<string> => {
  const error = [];

  if (!cat.name) error.push('Cat name is not exist');

  if (!Object.values(SexEnum).includes(cat.sex)) error.push("Can't get sex");

  if (cat.name && Number(cat.name) === NaN) error.push('Age must be integer');

  return error;
};
