import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatus1746007365354 implements MigrationInterface {
    name = 'AddStatus1746007365354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "status"`);
    }

}
