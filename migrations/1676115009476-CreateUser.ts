import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1676115009476 implements MigrationInterface {
  private table = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'int',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
