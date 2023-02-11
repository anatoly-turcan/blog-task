import { ColumnOptions, CreateDateColumn } from 'typeorm';

export const CreatedAt = (options?: ColumnOptions) =>
  CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    ...options,
  });
