import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDB1657977703346 implements MigrationInterface {
    name = 'NewDB1657977703346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(1024) NOT NULL, "image_url" text NOT NULL, "admin" boolean NOT NULL, "password" character varying(1024) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
