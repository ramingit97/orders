import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1712484025455 implements MigrationInterface {
    name = 'Order1712484025455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" "public"."order_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    }

}
