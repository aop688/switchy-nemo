import { deepClone } from '@/utils/misc';

export const getProp = (obj: AnyLiteral, path: string) => {
  const keys = path.split('.');

  let current = obj;

  for (const key of keys) {
    if (current && key in current) {
      current = current[key];
    } else {
      return undefined; // Property not found
    }
  }

  return current;
};

export const setProp = (obj: AnyLiteral, path: string, value: AnyValue) => {
  const keys = path.split('.');
  const newObj = deepClone(obj);
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  return newObj;
};
