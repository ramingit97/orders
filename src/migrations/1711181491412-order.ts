import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1711181491412 implements MigrationInterface {
    name = 'Order1711181491412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
