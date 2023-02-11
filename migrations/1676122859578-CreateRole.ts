import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRole1676122859578 implements MigrationInterface {
  private table = new Table({
    name: 'role',
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
    ],
  });

  private roles = ['ADMIN', 'BLOGGER'];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(this.table.name, ['name'])
      .values(this.roles.map((name) => ({ name })))
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
