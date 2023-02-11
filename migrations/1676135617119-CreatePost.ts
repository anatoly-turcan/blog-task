import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePost1676135617119 implements MigrationInterface {
  private table = new Table({
    name: 'post',
    columns: [
      {
        name: 'id',
        type: 'int',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'user_id',
        type: 'int',
      },
      {
        name: 'text',
        type: 'text',
      },
      {
        name: 'is_hidden',
        type: 'boolean',
        default: false,
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
    foreignKeys: [
      {
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
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
