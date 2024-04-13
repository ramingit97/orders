import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1713015836988 implements MigrationInterface {
    name = 'Order1713015836988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
    }

}
