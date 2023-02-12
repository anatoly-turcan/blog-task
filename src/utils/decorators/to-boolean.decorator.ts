import { Transform } from 'class-transformer';

import { DEFAULT_TRUE_VALUES } from '../constants';

export const ToBoolean = (...trueValues: any[]) =>
  Transform((params) =>
    (trueValues.length ? trueValues : DEFAULT_TRUE_VALUES).includes(
      params.obj[params.key],
    ),
  );
