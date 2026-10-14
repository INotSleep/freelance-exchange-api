import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBio1791201991003 implements MigrationInterface {
  name = 'AddUserBio1791201991003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "bio" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "bio"
        `);
  }
}
