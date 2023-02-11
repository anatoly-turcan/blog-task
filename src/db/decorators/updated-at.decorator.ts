import { ColumnOptions, UpdateDateColumn } from 'typeorm';

export const UpdatedAt = (options?: ColumnOptions) =>
  UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    ...options,
  });
