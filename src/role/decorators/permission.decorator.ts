import { SetMetadata } from '@nestjs/common';

import { PERMISSION_METADATA_KEY, Permissions } from '../constants';

export const Permission = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSION_METADATA_KEY, permissions);
