import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToAttempt1746008783404 implements MigrationInterface {
    name = 'AddStatusToAttempt1746008783404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_attempts" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_attempts" DROP COLUMN "status"`);
    }

}
