import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationSchema1746003975788 implements MigrationInterface {
    name = 'CreateNotificationSchema1746003975788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "response" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "notificationId" uuid, CONSTRAINT "PK_f6abd34f351bbbf11c7ae8e7565" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "recipient" character varying NOT NULL, "subject" character varying NOT NULL, "data" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification_attempts" ADD CONSTRAINT "FK_73a92c5a86768b9f5b8835b03a9" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_attempts" DROP CONSTRAINT "FK_73a92c5a86768b9f5b8835b03a9"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "notification_attempts"`);
    }

}
