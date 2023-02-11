import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermission1676122899076 implements MigrationInterface {
  private table = new Table({
    name: 'permission',
    columns: [
      {
        name: 'id',
        type: 'int',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'description',
        type: 'varchar',
        isNullable: true,
      },
    ],
  });

  private readonly permissions = [
    'CREATE_POST',
    'READ_USER_POST',
    'READ_PUBLIC_POST',
    'READ_ANY_POST',
    'UPDATE_USER_POST',
    'UPDATE_ANY_POST',
    'UPDATE_USER_POST_HIDDEN',
    'UPDATE_ANY_POST_HIDDEN',
    'DELETE_USER_POST',
    'DELETE_ANY_POST',
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(this.table.name, ['name'])
      .values(this.permissions.map((name) => ({ name })))
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
