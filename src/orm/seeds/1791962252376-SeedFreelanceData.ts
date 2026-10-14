import fs from 'fs';
import path from 'path';

import { MigrationInterface, QueryRunner } from 'typeorm';

const SQL_FILES = ['01-initial-data.sql', '02-task-skills.sql', '03-demo-data.sql'];

export class SeedFreelanceData1791962252376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const file of SQL_FILES) {
      await queryRunner.query(fs.readFileSync(path.join(__dirname, 'sql', file), 'utf8'));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE accounts, moderators, skills CASCADE');
  }
}
