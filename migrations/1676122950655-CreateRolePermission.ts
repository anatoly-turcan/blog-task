import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolePermission1676122950655 implements MigrationInterface {
  private table = new Table({
    name: 'role_permission',
    columns: [
      {
        name: 'role_id',
        type: 'int',
      },
      {
        name: 'permission_id',
        type: 'int',
      },
    ],
    foreignKeys: [
      {
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'CASCADE',
      },
      {
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permission',
        onDelete: 'CASCADE',
      },
    ],
    uniques: [{ columnNames: ['role_id', 'permission_id'] }],
    indices: [{ columnNames: ['role_id'] }],
  });

  private rolePermissions = {
    ADMIN: [
      'CREATE_POST',
      'READ_ANY_POST',
      'UPDATE_ANY_POST',
      'UPDATE_ANY_POST_HIDDEN',
      'DELETE_ANY_POST',
    ],
    BLOGGER: [
      'CREATE_POST',
      'READ_PUBLIC_POST',
      'READ_USER_POST',
      'UPDATE_USER_POST',
      'UPDATE_USER_POST_HIDDEN',
      'DELETE_USER_POST',
    ],
  };

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    const roles = await queryRunner.manager.find<{ id: number; name: string }>(
      'role',
    );
    const permissions = await queryRunner.manager.find<{
      id: number;
      name: string;
    }>('permission');

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(this.table.name)
      .values(
        Object.entries(this.rolePermissions)
          .map(([role, rolePermissions]) =>
            rolePermissions.map((rp) => ({
              role_id: roles.find((r) => r.name === role).id,
              permission_id: permissions.find((p) => p.name == rp).id,
            })),
          )
          .flat(),
      )
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
