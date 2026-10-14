import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFreelanceSchema1791962045394 implements MigrationInterface {
  name = 'CreateFreelanceSchema1791962045394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "account_suspensions" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "user_login" character varying(64) NOT NULL,
                "moderator_login" character varying(64),
                "reason" character varying(1024) NOT NULL,
                "start_at" TIMESTAMP NOT NULL,
                "end_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7d3610fe9d54e8d75688f7ae618" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "educations" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "profile_login" character varying(64) NOT NULL,
                "institution_name" character varying(512) NOT NULL,
                "specialization" character varying(256),
                "start_date" date NOT NULL,
                "finish_date" date,
                "description" character varying(2048),
                CONSTRAINT "PK_09d2f29e7f6f31f5c01d79d2dbf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "portfolio_projects" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "name" character varying(128) NOT NULL,
                "description" character varying(4096),
                "project_url" character varying(512),
                "profile_login" character varying(64) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aafa8e5cadcfcc5746510e8666d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "skills" (
                "name" character varying(64) NOT NULL,
                "description" character varying(512),
                CONSTRAINT "PK_81f05095507fd84aa2769b4a522" PRIMARY KEY ("name")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."bid_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN')
        `);
    await queryRunner.query(`
            CREATE TABLE "task_bids" (
                "task_id" uuid NOT NULL,
                "executor_profile_login" character varying(64) NOT NULL,
                "proposal_text" character varying(4096) NOT NULL,
                "proposed_amount" numeric(12, 2) NOT NULL,
                "submitted_at" TIMESTAMP NOT NULL DEFAULT now(),
                "status" "public"."bid_status" NOT NULL DEFAULT 'PENDING',
                "decided_at" TIMESTAMP,
                CONSTRAINT "PK_e10a2db9adbb3996184a0984fea" PRIMARY KEY ("task_id", "executor_profile_login")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."task_status" AS ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
        `);
    await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "customer_profile_login" character varying(64) NOT NULL,
                "title" character varying(256) NOT NULL,
                "description" character varying(4096) NOT NULL,
                "budget" numeric(12, 2) NOT NULL,
                "deadline" date NOT NULL,
                "status" "public"."task_status" NOT NULL DEFAULT 'OPEN',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "completed_at" TIMESTAMP,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "reviews" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "recipient_profile_login" character varying(64) NOT NULL,
                "author_profile_login" character varying(64) NOT NULL,
                "task_id" uuid NOT NULL,
                "rating" integer NOT NULL,
                "review_text" character varying(4096),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_aa3a26e7ce0d5a8a4e438673cbd" UNIQUE ("task_id", "author_profile_login"),
                CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."profile_type" AS ENUM('COMPANY', 'INDIVIDUAL')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."profile_status" AS ENUM('VERIFIED', 'UNVERIFIED')
        `);
    await queryRunner.query(`
            CREATE TABLE "profiles" (
                "user_login" character varying(64) NOT NULL,
                "alt_name" character varying(256),
                "name" character varying(512) NOT NULL,
                "type" "public"."profile_type" NOT NULL DEFAULT 'INDIVIDUAL',
                "description" character varying(4096),
                "country" character varying(128) NOT NULL,
                "status" "public"."profile_status" NOT NULL DEFAULT 'UNVERIFIED',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_a9ce14ff6fede360965dc1b933" UNIQUE ("user_login"),
                CONSTRAINT "PK_a9ce14ff6fede360965dc1b9333" PRIMARY KEY ("user_login")
            )
        `);
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "UQ_a9ce14ff6fede360965dc1b9333" UNIQUE ("user_login")`,
    );
    await queryRunner.query(`
            CREATE TYPE "public"."verification_kind" AS ENUM('IDENTITY_DOCUMENT', 'COMPANY_REGISTRY')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."verification_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED')
        `);
    await queryRunner.query(`
            CREATE TABLE "verification_requests" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "reviewed_by_login" character varying(64),
                "profile_login" character varying(64) NOT NULL,
                "profile_type" "public"."profile_type" NOT NULL,
                "verification_kind" "public"."verification_kind" NOT NULL,
                "submitted_date" TIMESTAMP NOT NULL DEFAULT now(),
                "reviewed_date" TIMESTAMP,
                "comment" character varying(1024),
                "status" "public"."verification_status" NOT NULL DEFAULT 'PENDING',
                "birth_or_registration_date" date NOT NULL,
                "name" character varying(512) NOT NULL,
                "document_or_registration_number" character varying(64) NOT NULL,
                "country" character varying(128) NOT NULL,
                CONSTRAINT "PK_c5d405ea25e8abd5b0b096a4f6f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "moderators" (
                "login" character varying(64) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(128) NOT NULL,
                CONSTRAINT "PK_6a210eeff608b9aa091e122e596" PRIMARY KEY ("login")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."request_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')
        `);
    await queryRunner.query(`
            CREATE TABLE "account_deletion_requests" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "user_login" character varying(64) NOT NULL,
                "reason" character varying(2048) NOT NULL,
                "status" "public"."request_status" NOT NULL DEFAULT 'PENDING',
                "submitted_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reviewed_at" TIMESTAMP,
                "reviewed_by_login" character varying(64),
                "review_comment" character varying(1024),
                CONSTRAINT "PK_8e4635073e7fe59498285d7dc44" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_method" AS ENUM('CARD', 'CRYPTO')
        `);
    await queryRunner.query(`
            CREATE TABLE "balance_top_up_requests" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "user_login" character varying(64) NOT NULL,
                "amount" numeric(12, 2) NOT NULL,
                "payment_method" "public"."payment_method" NOT NULL,
                "operation_date" TIMESTAMP NOT NULL DEFAULT now(),
                "external_transaction_number" character varying(128),
                "status" "public"."request_status" NOT NULL DEFAULT 'PENDING',
                "submitted_at" TIMESTAMP NOT NULL DEFAULT now(),
                "confirmed_at" TIMESTAMP,
                CONSTRAINT "PK_7bc2df7249b7cfe18e0b3a6e4a8" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "withdrawal_requests" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "user_login" character varying(64) NOT NULL,
                "amount" numeric(12, 2) NOT NULL,
                "payment_method" "public"."payment_method" NOT NULL,
                "payment_details" character varying(1024) NOT NULL,
                "external_transaction_number" character varying(128),
                "status" "public"."request_status" NOT NULL DEFAULT 'PENDING',
                "submitted_at" TIMESTAMP NOT NULL DEFAULT now(),
                "confirmed_at" TIMESTAMP,
                CONSTRAINT "PK_e1b3734a3f3cbd46bf0ad7eedb6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."account_status" AS ENUM(
                'EMAIL_NOT_VERIFIED',
                'KYC_NOT_VERIFIED',
                'ACTIVE',
                'LOGIN_LOCKED',
                'SUSPENDED',
                'DELETED'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "accounts" (
                "login" character varying(64) NOT NULL,
                "email" character varying(128) NOT NULL,
                "status" "public"."account_status" NOT NULL DEFAULT 'EMAIL_NOT_VERIFIED',
                "password_changed_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "balance" numeric(12, 2) NOT NULL DEFAULT '0',
                CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"),
                CONSTRAINT "PK_2b995c673f59534efe164ced42d" PRIMARY KEY ("login")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "chat_id" uuid NOT NULL,
                "sender_profile_login" character varying(64) NOT NULL,
                "message_text" character varying(4096) NOT NULL,
                "sent_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "chats" (
                "id" uuid NOT NULL DEFAULT uuidv7(),
                "first_profile_login" character varying(64) NOT NULL,
                "second_profile_login" character varying(64) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "task_skills" (
                "task_id" uuid NOT NULL,
                "skill_name" character varying(64) NOT NULL,
                CONSTRAINT "PK_3a8aaaaedb93583f50f5428e3d8" PRIMARY KEY ("task_id", "skill_name")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_898f332b047dc0ee6c9fbebf5a" ON "task_skills" ("task_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_28f72c1c40c44da90ec6e9cb35" ON "task_skills" ("skill_name")
        `);
    await queryRunner.query(`
            CREATE TABLE "profiles_skills" (
                "profile_login" character varying(64) NOT NULL,
                "skill_name" character varying(64) NOT NULL,
                CONSTRAINT "PK_a1c5da04efbabb2a2102531f6fd" PRIMARY KEY ("profile_login", "skill_name")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8ed1b5bb6eaec0542c5d71ea2b" ON "profiles_skills" ("profile_login")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_829dccbbd6d8364d730fc2e890" ON "profiles_skills" ("skill_name")
        `);
    await queryRunner.query(`
            ALTER TABLE "account_suspensions"
            ADD CONSTRAINT "FK_97bf8d8856f1913c53571182e09" FOREIGN KEY ("user_login") REFERENCES "accounts"("login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "account_suspensions"
            ADD CONSTRAINT "FK_aec9d9e6a281995dc372b19af86" FOREIGN KEY ("moderator_login") REFERENCES "moderators"("login") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "educations"
            ADD CONSTRAINT "FK_fff17597d5cd273d353e4f5093b" FOREIGN KEY ("profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "portfolio_projects"
            ADD CONSTRAINT "FK_e5d0f72b510abed47881a6c8352" FOREIGN KEY ("profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "task_bids"
            ADD CONSTRAINT "FK_c61744e2f604f0edf5ed556e687" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "task_bids"
            ADD CONSTRAINT "FK_9ceef291ec9bb98027899836b31" FOREIGN KEY ("executor_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_e8bed107b765703c9e29c146f4d" FOREIGN KEY ("customer_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "FK_a1280372d09277c99506aa37e99" FOREIGN KEY ("recipient_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "FK_af9bb6ac537ed31bd03b142c8a6" FOREIGN KEY ("author_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "FK_510ad253ff1b78940cd5565a56e" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_a9ce14ff6fede360965dc1b9333" FOREIGN KEY ("user_login") REFERENCES "accounts"("login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "verification_requests"
            ADD CONSTRAINT "FK_733628d27e5ef7bf10a2c64db87" FOREIGN KEY ("reviewed_by_login") REFERENCES "moderators"("login") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "verification_requests"
            ADD CONSTRAINT "FK_1d0b80858f9946745104979a9bf" FOREIGN KEY ("profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "account_deletion_requests"
            ADD CONSTRAINT "FK_11acb39125b948cce8cc0380d45" FOREIGN KEY ("user_login") REFERENCES "accounts"("login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "account_deletion_requests"
            ADD CONSTRAINT "FK_4521aae79c0dc96179cff450b2e" FOREIGN KEY ("reviewed_by_login") REFERENCES "moderators"("login") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "balance_top_up_requests"
            ADD CONSTRAINT "FK_d84865d60db094a6d5631e76851" FOREIGN KEY ("user_login") REFERENCES "accounts"("login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "withdrawal_requests"
            ADD CONSTRAINT "FK_d447b5941bc8943a99585f36f56" FOREIGN KEY ("user_login") REFERENCES "accounts"("login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_7540635fef1922f0b156b9ef74f" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_03cc8d5d1fcf4f2bf0d6d8fd68d" FOREIGN KEY ("sender_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "chats"
            ADD CONSTRAINT "FK_c3cf2e34beddc7b162c378b157e" FOREIGN KEY ("first_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "chats"
            ADD CONSTRAINT "FK_e9b6df086641ae94db95097a244" FOREIGN KEY ("second_profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "task_skills"
            ADD CONSTRAINT "FK_898f332b047dc0ee6c9fbebf5a4" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "task_skills"
            ADD CONSTRAINT "FK_28f72c1c40c44da90ec6e9cb358" FOREIGN KEY ("skill_name") REFERENCES "skills"("name") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "profiles_skills"
            ADD CONSTRAINT "FK_8ed1b5bb6eaec0542c5d71ea2b7" FOREIGN KEY ("profile_login") REFERENCES "profiles"("user_login") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "profiles_skills"
            ADD CONSTRAINT "FK_829dccbbd6d8364d730fc2e8908" FOREIGN KEY ("skill_name") REFERENCES "skills"("name") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profiles_skills" DROP CONSTRAINT "FK_829dccbbd6d8364d730fc2e8908"
        `);
    await queryRunner.query(`
            ALTER TABLE "profiles_skills" DROP CONSTRAINT "FK_8ed1b5bb6eaec0542c5d71ea2b7"
        `);
    await queryRunner.query(`
            ALTER TABLE "task_skills" DROP CONSTRAINT "FK_28f72c1c40c44da90ec6e9cb358"
        `);
    await queryRunner.query(`
            ALTER TABLE "task_skills" DROP CONSTRAINT "FK_898f332b047dc0ee6c9fbebf5a4"
        `);
    await queryRunner.query(`
            ALTER TABLE "chats" DROP CONSTRAINT "FK_e9b6df086641ae94db95097a244"
        `);
    await queryRunner.query(`
            ALTER TABLE "chats" DROP CONSTRAINT "FK_c3cf2e34beddc7b162c378b157e"
        `);
    await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_03cc8d5d1fcf4f2bf0d6d8fd68d"
        `);
    await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_7540635fef1922f0b156b9ef74f"
        `);
    await queryRunner.query(`
            ALTER TABLE "withdrawal_requests" DROP CONSTRAINT "FK_d447b5941bc8943a99585f36f56"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance_top_up_requests" DROP CONSTRAINT "FK_d84865d60db094a6d5631e76851"
        `);
    await queryRunner.query(`
            ALTER TABLE "account_deletion_requests" DROP CONSTRAINT "FK_4521aae79c0dc96179cff450b2e"
        `);
    await queryRunner.query(`
            ALTER TABLE "account_deletion_requests" DROP CONSTRAINT "FK_11acb39125b948cce8cc0380d45"
        `);
    await queryRunner.query(`
            ALTER TABLE "verification_requests" DROP CONSTRAINT "FK_1d0b80858f9946745104979a9bf"
        `);
    await queryRunner.query(`
            ALTER TABLE "verification_requests" DROP CONSTRAINT "FK_733628d27e5ef7bf10a2c64db87"
        `);
    await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_a9ce14ff6fede360965dc1b9333"
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "FK_510ad253ff1b78940cd5565a56e"
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "FK_af9bb6ac537ed31bd03b142c8a6"
        `);
    await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "FK_a1280372d09277c99506aa37e99"
        `);
    await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_e8bed107b765703c9e29c146f4d"
        `);
    await queryRunner.query(`
            ALTER TABLE "task_bids" DROP CONSTRAINT "FK_9ceef291ec9bb98027899836b31"
        `);
    await queryRunner.query(`
            ALTER TABLE "task_bids" DROP CONSTRAINT "FK_c61744e2f604f0edf5ed556e687"
        `);
    await queryRunner.query(`
            ALTER TABLE "portfolio_projects" DROP CONSTRAINT "FK_e5d0f72b510abed47881a6c8352"
        `);
    await queryRunner.query(`
            ALTER TABLE "educations" DROP CONSTRAINT "FK_fff17597d5cd273d353e4f5093b"
        `);
    await queryRunner.query(`
            ALTER TABLE "account_suspensions" DROP CONSTRAINT "FK_aec9d9e6a281995dc372b19af86"
        `);
    await queryRunner.query(`
            ALTER TABLE "account_suspensions" DROP CONSTRAINT "FK_97bf8d8856f1913c53571182e09"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_829dccbbd6d8364d730fc2e890"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_8ed1b5bb6eaec0542c5d71ea2b"
        `);
    await queryRunner.query(`
            DROP TABLE "profiles_skills"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_28f72c1c40c44da90ec6e9cb35"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_898f332b047dc0ee6c9fbebf5a"
        `);
    await queryRunner.query(`
            DROP TABLE "task_skills"
        `);
    await queryRunner.query(`
            DROP TABLE "chats"
        `);
    await queryRunner.query(`
            DROP TABLE "messages"
        `);
    await queryRunner.query(`
            DROP TABLE "accounts"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."account_status"
        `);
    await queryRunner.query(`
            DROP TABLE "withdrawal_requests"
        `);
    await queryRunner.query(`
            DROP TABLE "balance_top_up_requests"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."payment_method"
        `);
    await queryRunner.query(`
            DROP TABLE "account_deletion_requests"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."request_status"
        `);
    await queryRunner.query(`
            DROP TABLE "moderators"
        `);
    await queryRunner.query(`
            DROP TABLE "verification_requests"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."verification_status"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."verification_kind"
        `);
    await queryRunner.query(`
            DROP TABLE "profiles"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."profile_status"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."profile_type"
        `);
    await queryRunner.query(`
            DROP TABLE "reviews"
        `);
    await queryRunner.query(`
            DROP TABLE "tasks"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."task_status"
        `);
    await queryRunner.query(`
            DROP TABLE "task_bids"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."bid_status"
        `);
    await queryRunner.query(`
            DROP TABLE "skills"
        `);
    await queryRunner.query(`
            DROP TABLE "portfolio_projects"
        `);
    await queryRunner.query(`
            DROP TABLE "educations"
        `);
    await queryRunner.query(`
            DROP TABLE "account_suspensions"
        `);
  }
}
