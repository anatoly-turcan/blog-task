import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1676122950656 implements MigrationInterface {
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
        name: 'role_id',
        type: 'int',
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
    foreignKeys: [
      {
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
      },
    ],
  });

  private get admin() {
    return {
      email: process.env.ADMIN_EMAIL || 'admin@app.com',
      password:
        process.env.ADMIN_PASSWORD_HASH ||
        '$2b$10$qTtRoUbvyuYRnDodIrAcTOswRjpX14n6qwOVPNo.dQKMqrvgU/l9i',
    };
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    const adminRole = await queryRunner.manager.findOneBy<{
      id: number;
      name: string;
    }>('role', { name: 'ADMIN' });

    await queryRunner.manager.insert(this.table.name, {
      ...this.admin,
      roleId: adminRole.id,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
