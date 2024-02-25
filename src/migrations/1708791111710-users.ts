import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1708791111710 implements MigrationInterface {
    name = 'Users1708791111710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    }

}
