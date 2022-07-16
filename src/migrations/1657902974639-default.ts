import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657902974639 implements MigrationInterface {
    name = 'default1657902974639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compliments" ("id" SERIAL NOT NULL, "user_sender" integer NOT NULL, "user_receiver" integer NOT NULL, "tag_id" integer NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c54299c9e1656922eb0045c246e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "compliments" ADD CONSTRAINT "FK_cd4e6c54f85a02905a11897e91e" FOREIGN KEY ("user_sender") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compliments" ADD CONSTRAINT "FK_47922731571b285347daed32941" FOREIGN KEY ("user_receiver") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compliments" ADD CONSTRAINT "FK_3e32d250792f1db0b4dde4bc90a" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compliments" DROP CONSTRAINT "FK_3e32d250792f1db0b4dde4bc90a"`);
        await queryRunner.query(`ALTER TABLE "compliments" DROP CONSTRAINT "FK_47922731571b285347daed32941"`);
        await queryRunner.query(`ALTER TABLE "compliments" DROP CONSTRAINT "FK_cd4e6c54f85a02905a11897e91e"`);
        await queryRunner.query(`DROP TABLE "compliments"`);
    }

}
